/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { dateFormatAliases } from '../../../services/format';
// ESLint doesn't realise that we can import Moment directly.
// eslint-disable-next-line import/named
import moment, { Moment, MomentInput } from 'moment';

const utc = moment.utc;

const GRANULARITY_KEY = '__oui_granularity';
const FORMAT_KEY = '__oui_format';

export interface OuiMoment extends Moment {
  __oui_granularity?: GranularityType;
  __oui_format?: string;
}

export type GranularityEsType = 'd' | 'w' | 'M' | 'y';
export type GranularityJsType = 'day' | 'week' | 'month' | 'year';

export interface GranularityType {
  es: GranularityEsType;
  js: GranularityJsType;
  isSame: (d1: Moment, d2: Moment) => boolean;
  start: (date: Moment) => Moment;
  startOfNext: (date: Moment) => Moment;
  iso8601: (date: Moment) => string;
}

interface GranularitiesType {
  DAY: GranularityType;
  WEEK: GranularityType;
  MONTH: GranularityType;
  YEAR: GranularityType;
}

export const Granularity: GranularitiesType = Object.freeze({
  DAY: {
    es: 'd' as GranularityEsType,
    js: 'day' as GranularityJsType,
    isSame: (d1: Moment, d2: Moment) => d1.isSame(d2, 'day'),
    start: (date: Moment) => date.startOf('day'),
    startOfNext: (date: Moment) => date.add(1, 'days').startOf('day'),
    iso8601: (date: Moment) => date.format('YYYY-MM-DD'),
  },
  WEEK: {
    es: 'w' as GranularityEsType,
    js: 'week' as GranularityJsType,
    isSame: (d1: Moment, d2: Moment) => d1.isSame(d2, 'week'),
    start: (date: Moment) => date.startOf('week'),
    startOfNext: (date: Moment) => date.add(1, 'weeks').startOf('week'),
    iso8601: (date: Moment) => date.format('YYYY-MM-DD'),
  },
  MONTH: {
    es: 'M' as GranularityEsType,
    js: 'month' as GranularityJsType,
    isSame: (d1: Moment, d2: Moment) => d1.isSame(d2, 'month'),
    start: (date: Moment) => date.startOf('month'),
    startOfNext: (date: Moment) => date.add(1, 'months').startOf('month'),
    iso8601: (date: Moment) => date.format('YYYY-MM'),
  },
  YEAR: {
    es: 'y' as GranularityEsType,
    js: 'year' as GranularityJsType,
    isSame: (d1: Moment, d2: Moment) => d1.isSame(d2, 'year'),
    start: (date: Moment) => date.startOf('year'),
    startOfNext: (date: Moment) => date.add(1, 'years').startOf('year'),
    iso8601: (date: Moment) => date.format('YYYY'),
  },
});

const parseTime = (value: string) => {
  const parsed: OuiMoment = utc(
    value,
    ['HH:mm', 'H:mm', 'H:mm', 'h:mm a', 'h:mm A', 'hh:mm a', 'hh:mm A'],
    true
  );
  if (parsed.isValid()) {
    parsed[FORMAT_KEY] = parsed.creationData().format as string;
    return parsed;
  }
};

const parseDay = (value: string) => {
  let parsed: OuiMoment;

  switch (value.toLowerCase()) {
    case 'today':
      parsed = utc().startOf('day');
      parsed[GRANULARITY_KEY] = Granularity.DAY;
      parsed[FORMAT_KEY] = value;
      return parsed;

    case 'yesterday':
      parsed = utc().subtract(1, 'days').startOf('day');
      parsed[GRANULARITY_KEY] = Granularity.DAY;
      parsed[FORMAT_KEY] = value;
      return parsed;

    case 'tomorrow':
      parsed = utc().add(1, 'days').startOf('day');
      parsed[GRANULARITY_KEY] = Granularity.DAY;
      parsed[FORMAT_KEY] = value;
      return parsed;

    default:
      parsed = utc(
        value,
        [
          'ddd',
          'dddd',
          'D MMM YY',
          'Do MMM YY',
          'D MMM YYYY',
          'Do MMM YYYY',
          'DD MMM YY',
          'DD MMM YYYY',
          'D MMMM YY',
          'Do MMMM YY',
          'D MMMM YYYY',
          'Do MMMM YYYY',
          'DD MMMM YY',
          'DD MMMM YYYY',
          'YYYY-MM-DD',
        ],
        true
      );
      if (parsed.isValid()) {
        try {
          parsed[GRANULARITY_KEY] = Granularity.DAY;
          parsed[FORMAT_KEY] = parsed.creationData().format as string;
          return parsed;
        } catch (e) {
          console.error(e);
        }
      }
  }
};

const parseWeek = (value: string) => {
  let parsed: OuiMoment;
  switch (value.toLowerCase()) {
    case 'this week':
      parsed = utc();
      break;
    case 'last week':
      parsed = utc().subtract(1, 'weeks');
      break;
    case 'next week':
      parsed = utc().add(1, 'weeks');
      break;
    default:
      const match = value.match(/week (\d+)/i);
      if (match) {
        const weekNr = Number(match[1]);
        parsed = utc().weeks(weekNr);
      } else {
        return;
      }
  }
  if (parsed != null && parsed.isValid()) {
    parsed = parsed.startOf('week');
    parsed[GRANULARITY_KEY] = Granularity.WEEK;
    parsed[FORMAT_KEY] = parsed.creationData().format as string;
    return parsed;
  }
};

const parseMonth = (value: string) => {
  let parsed: OuiMoment;
  switch (value.toLowerCase()) {
    case 'this month':
      parsed = utc();
      break;
    case 'next month':
      parsed = utc().endOf('month').add(2, 'days');
      break;
    case 'last month':
      parsed = utc().startOf('month').subtract(2, 'days');
      break;
    default:
      parsed = utc(value, ['MMM', 'MMMM'], true);
      if (parsed.isValid()) {
        const now = utc();
        parsed.year(now.year());
      } else {
        parsed = utc(
          value,
          [
            'MMM YY',
            'MMMM YY',
            'MMM YYYY',
            'MMMM YYYY',
            'YYYY MMM',
            'YYYY MMMM',
            'YYYY-MM',
          ],
          true
        );
      }
  }
  if (parsed.isValid()) {
    parsed.startOf('month');
    parsed[GRANULARITY_KEY] = Granularity.MONTH;
    parsed[FORMAT_KEY] = parsed.creationData().format as string;
    return parsed;
  }
};

const parseYear = (value: string) => {
  let parsed: OuiMoment;
  switch (value.toLowerCase()) {
    case 'this year':
      parsed = utc().startOf('year');
      parsed[GRANULARITY_KEY] = Granularity.YEAR;
      parsed[FORMAT_KEY] = value;
      return parsed;
    case 'next year':
      parsed = utc().endOf('year').add(2, 'months').startOf('year');
      parsed[GRANULARITY_KEY] = Granularity.YEAR;
      parsed[FORMAT_KEY] = value;
      return parsed;
    case 'last year':
      parsed = utc().startOf('year').subtract(2, 'months').startOf('year');
      parsed[GRANULARITY_KEY] = Granularity.YEAR;
      parsed[FORMAT_KEY] = value;
      return parsed;
    default:
      parsed = utc(value, ['YY', 'YYYY'], true);
      if (parsed.isValid()) {
        parsed[GRANULARITY_KEY] = Granularity.YEAR;
        parsed[FORMAT_KEY] = parsed.creationData().format as string;
        return parsed;
      }
  }
};

const parseDefault = (value: string) => {
  let parsed: OuiMoment = utc(
    value,
    [
      moment.ISO_8601,
      moment.RFC_2822,
      'DD MMM YY HH:mm',
      'DD MMM YY HH:mm:ss',
      'DD MMM YYYY HH:mm',
      'DD MMM YYYY HH:mm:ss',
      'DD MMMM YYYY HH:mm',
      'DD MMMM YYYY HH:mm:ss',
    ],
    true
  );
  if (!parsed.isValid()) {
    const time = Date.parse(value);
    const offset = moment(time).utcOffset();
    parsed = utc(time);
    parsed.add(offset, 'minutes');
  }
  if (parsed.isValid()) {
    parsed[FORMAT_KEY] = parsed.creationData().format as string;
  }
  return parsed;
};

const printDay = (now: Moment, date: Moment, format: string) => {
  if (format.match(/yesterday|tomorrow|today/i)) {
    if (now.isSame(date, 'day')) {
      return 'today';
    }
    if (now.subtract(1, 'day').isSame(date, 'day')) {
      return 'yesterday';
    }
    if (now.add(1, 'day').isSame(date, 'day')) {
      return 'tomorrow';
    }
    if (now.isSame(date, 'week')) {
      return date.format('dddd');
    }
  }
  return date.format(format);
};

const printWeek = (now: Moment, date: Moment, format: string) => {
  if (format.match(/(?:this|next|last) week/i)) {
    if (now.isSame(date, 'week')) {
      return 'This Week';
    }
    if (now.startOf('week').subtract(2, 'days').isSame(date, 'week')) {
      return 'Last Week';
    }
    if (now.endOf('week').add(2, 'days').isSame(date, 'week')) {
      return 'Next Week';
    }
  }
  return date.format(format);
};

const printMonth = (now: Moment, date: Moment, format: string) => {
  if (format.match(/(?:this|next|last) month/i)) {
    if (now.isSame(date, 'month')) {
      return 'This Month';
    }
    if (now.startOf('month').subtract(2, 'days').isSame(date, 'month')) {
      return 'Last Month';
    }
    if (now.endOf('month').add(2, 'days').isSame(date, 'month')) {
      return 'Next Month';
    }
  }
  return date.format(format);
};

const printYear = (now: Moment, date: Moment, format: string) => {
  if (format.match(/(?:this|next|last) year/i)) {
    if (now.isSame(date, 'year')) {
      return 'This Year';
    }
    if (now.startOf('year').subtract(2, 'months').isSame(date, 'year')) {
      return 'Last Year';
    }
    if (now.endOf('year').add(2, 'months').isSame(date, 'year')) {
      return 'Next Year';
    }
  }
  return date.format(format);
};

export const printIso8601 = (value: MomentInput) => {
  return utc(value).format(moment.defaultFormatUtc);
};

export const dateGranularity = (parsedDate: OuiMoment) => {
  return parsedDate[GRANULARITY_KEY]!;
};

export const dateFormat = Object.freeze({
  parse(value: string) {
    const parsed =
      parseDay(value) ||
      parseMonth(value) ||
      parseYear(value) ||
      parseWeek(value) ||
      parseTime(value) ||
      parseDefault(value);
    if (!parsed) {
      throw new Error(`could not parse [${value}] as date`);
    }
    return parsed;
  },

  print(date: OuiMoment | MomentInput, defaultGranularity = undefined) {
    date = moment.isMoment(date) ? date : utc(date);
    const ouiDate: OuiMoment = date as OuiMoment;
    const now = utc();
    const format = ouiDate[FORMAT_KEY];
    if (!format) {
      return date.format(dateFormatAliases.iso8601);
    }
    const granularity = ouiDate[GRANULARITY_KEY] || defaultGranularity;
    switch (granularity) {
      case Granularity.DAY:
        return printDay(now, date, format);
      case Granularity.WEEK:
        return printWeek(now, date, format);
      case Granularity.MONTH:
        return printMonth(now, date, format);
      case Granularity.YEAR:
        return printYear(now, date, format);
      default:
        return date.format(format);
    }
  },
});
