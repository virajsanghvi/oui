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
import { requiredProps, findTestSubject } from '../../../test';

import { OuiTabbedContent, AUTOFOCUS } from './tabbed_content';

const elasticsearchTab = {
  id: 'es',
  name: 'Elasticsearch',
  content: <p>Elasticsearch content</p>,
};

const kibanaTab = {
  id: 'kibana',
  name: <strong>Kibana</strong>,
  'data-test-subj': 'kibanaTab',
  content: <p>Kibana content</p>,
};

const tabs = [elasticsearchTab, kibanaTab];

describe('OuiTabbedContent', () => {
  test('is rendered with required props and tabs', () => {
    const component = render(
      <OuiTabbedContent {...requiredProps} tabs={tabs} />
    );
    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('onTabClick', () => {
      test('is called when a tab is clicked', () => {
        const onTabClickHandler = jest.fn();
        const component = mount(
          <OuiTabbedContent onTabClick={onTabClickHandler} tabs={tabs} />
        );
        findTestSubject(component, 'kibanaTab').simulate('click');
        expect(onTabClickHandler).toBeCalledTimes(1);
        expect(onTabClickHandler).toBeCalledWith(kibanaTab);
      });
    });

    describe('selectedTab', () => {
      test('renders a selected tab', () => {
        const component = render(
          <OuiTabbedContent selectedTab={kibanaTab} tabs={tabs} />
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('initialSelectedTab', () => {
      test('renders a selected tab', () => {
        const component = render(
          <OuiTabbedContent initialSelectedTab={kibanaTab} tabs={tabs} />
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('size', () => {
      test('can be small', () => {
        const component = render(<OuiTabbedContent size="s" tabs={tabs} />);
        expect(component).toMatchSnapshot();
      });
    });

    describe('display', () => {
      test('can be condensed', () => {
        const component = render(
          <OuiTabbedContent display="condensed" tabs={tabs} />
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('autoFocus', () => {
      AUTOFOCUS.forEach((focusType) => {
        test(`${focusType} is rendered`, () => {
          const component = render(
            <OuiTabbedContent autoFocus={focusType} tabs={tabs} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('cacheContent', () => {
      test('content of tabs that has been selected before should stay in dom', () => {
        const component = mount(
          <OuiTabbedContent preserveTabContent={true} tabs={tabs} />
        );
        expect(component.find('div[role="tabpanel"]').length).toBe(1);

        component.find('OuiTab[id="kibana"] button').first().simulate('click');
        expect(component.find('div[role="tabpanel"]').length).toBe(2);
      });
    });
  });

  describe('behavior', () => {
    test("when selected tab state isn't controlled by the owner, select the first tab by default", () => {
      const component = render(<OuiTabbedContent tabs={tabs} />);
      expect(component).toMatchSnapshot();
    });

    test('when uncontrolled, the selected tab should update if it receives new content', () => {
      const tabs = [
        elasticsearchTab,
        {
          ...kibanaTab,
        },
      ];
      const component = mount(<OuiTabbedContent tabs={tabs} />);

      component.find('OuiTab[id="kibana"] button').first().simulate('click');

      component.setProps({
        tabs: [
          elasticsearchTab,
          {
            ...kibanaTab,
            content: <p>updated Kibana content</p>,
          },
        ],
      });

      expect(component).toMatchSnapshot();
    });
  });
});
