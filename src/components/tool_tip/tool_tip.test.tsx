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

import React from 'react';
import { render, mount } from 'enzyme';
import {
  requiredProps,
  findTestSubject,
  takeMountedSnapshot,
} from '../../test';
import { OuiToolTip } from './tool_tip';

describe('OuiToolTip', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  test('is rendered', () => {
    const component = render(
      <OuiToolTip title="title" id="id" content="content" {...requiredProps}>
        <button>Trigger</button>
      </OuiToolTip>
    );

    expect(component).toMatchSnapshot();
  });

  test('shows tooltip on focus', () => {
    jest.useFakeTimers();
    const component = mount(
      <OuiToolTip title="title" id="id" content="content" {...requiredProps}>
        <button data-test-subj="trigger">Trigger</button>
      </OuiToolTip>,
      { attachTo: container }
    );

    const trigger = findTestSubject(component, 'trigger');
    trigger.simulate('focus');
    jest.advanceTimersByTime(260); // wait for showToolTip setTimeout
    expect(takeMountedSnapshot(component)).toMatchSnapshot();
  });

  test('display prop renders block', () => {
    const component = render(
      <OuiToolTip
        title="title"
        id="id"
        content="content"
        {...requiredProps}
        display="block">
        <button>Trigger</button>
      </OuiToolTip>
    );

    expect(component).toMatchSnapshot();
  });
});
