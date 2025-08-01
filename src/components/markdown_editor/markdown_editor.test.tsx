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
import { render, mount, ReactWrapper } from 'enzyme';
import { requiredProps } from '../../test/required_props';
import { OuiMarkdownEditor } from './markdown_editor';
import * as MarkdownTooltip from './plugins/markdown_tooltip';
import MarkdownActions from './markdown_actions';

describe('OuiMarkdownEditor', () => {
  test('is rendered', () => {
    const component = render(
      <OuiMarkdownEditor
        editorId="editorId"
        value=""
        onChange={() => null}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('height', () => {
      test('is rendered with a custom size', () => {
        const component = render(
          <OuiMarkdownEditor
            editorId="editorId"
            height={400}
            value=""
            onChange={() => null}
            {...requiredProps}
          />
        );

        expect(component).toMatchSnapshot();
      });

      test('is rendered in full mode', () => {
        const component = render(
          <OuiMarkdownEditor
            editorId="editorId"
            height="full"
            value=""
            onChange={() => null}
            {...requiredProps}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('maxHeight', () => {
      test('is rendered with a custom size', () => {
        const component = render(
          <OuiMarkdownEditor
            editorId="editorId"
            maxHeight={600}
            value=""
            onChange={() => null}
            {...requiredProps}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('autoExpandPreview', () => {
      test('is rendered with false', () => {
        const component = render(
          <OuiMarkdownEditor
            editorId="editorId"
            autoExpandPreview={false}
            value=""
            onChange={() => null}
            {...requiredProps}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });

  test('is preview rendered', () => {
    const component = mount(
      <OuiMarkdownEditor
        editorId="editorId"
        value="## Hello world"
        onChange={() => null}
        {...requiredProps}
      />
    );
    component.find('OuiButtonEmpty').simulate('click');
    expect(
      component
        .find('.ouiMarkdownFormat')
        .childAt(0)
        .childAt(0)
        .matchesElement(<h2>Hello world</h2>)
    );
    expect(
      component.find('.ouiMarkdownFormat').childAt(0).childAt(0).text()
    ).toBe('Hello world');
  });

  test('fires onChange on text area change', () => {
    const testProps = {
      editorId: 'editorId',
      value: 'Hello',
      onChange: jest.fn(),
    };

    const component = mount(
      <OuiMarkdownEditor {...testProps} {...requiredProps} />
    );

    const event = { target: { value: 'sometext' } };

    component.find('OuiMarkdownEditorTextArea').simulate('change', event);
    expect(testProps.onChange).toHaveBeenCalledTimes(1);
    expect(testProps.onChange).toHaveBeenLastCalledWith(event.target.value);
  });

  describe('render markdown error', () => {
    test('fires onParse with messages if there is an error in markdown', () => {
      const testMessage = [
        {
          message: 'No tooltip text found',
          name: '1:18',
          reason: 'No tooltip text found',
          line: 1,
          column: 18,
          location: { start: expect.any(Object), end: expect.any(Object) },
          source: null,
          ruleId: null,
          fatal: null,
        },
      ];
      const testProps = {
        editorId: 'editorId',
        value: '!{tooltip[hello]()}',
        onChange: jest.fn(),
        onParse: jest.fn(),
      };

      mount(<OuiMarkdownEditor {...testProps} {...requiredProps} />);

      expect(testProps.onParse).toHaveBeenCalledTimes(1);
      expect(testProps.onParse).toBeCalledWith(null, {
        ast: expect.anything(),
        messages: testMessage,
      });
    });

    test('render error if markdown has error', () => {
      const testMessage = [
        {
          message: 'No tooltip text found',
          name: '1:18',
          reason: 'No tooltip text found',
        },
      ];
      const testProps = {
        editorId: 'editorId',
        value: '!{tooltip[hello]()}',
        onChange: jest.fn(),
        errors: testMessage,
      };

      const component = mount(
        <OuiMarkdownEditor {...testProps} {...requiredProps} />
      );

      expect(component.find('button[aria-label="Show errors"]')).toHaveLength(
        1
      );
    });

    test('does not render error if error messages are empty', () => {
      const testProps = {
        editorId: 'editorId',
        value: '!{tooltip[hello](hello)}',
        onChange: jest.fn(),
        errors: [],
      };

      const component = mount(
        <OuiMarkdownEditor {...testProps} {...requiredProps} />
      );
      expect(component.find('button[aria-label="Show errors"]')).toHaveLength(
        0
      );
    });
  });

  describe('markdown actions', () => {
    const toolbarPlugins = [MarkdownTooltip.plugin];
    const markdownActions = new MarkdownActions('editorId', toolbarPlugins);

    it('do calls apply style for a correct plugin with immediate formatting', () => {
      markdownActions.applyStyle = jest.fn();
      markdownActions.do('mdBold');

      expect(markdownActions.applyStyle).toHaveBeenCalledTimes(1);
    });
  });

  describe('toolbar actions', () => {
    const testProps = {
      editorId: 'editorId',
      value: 'Hello',
      onChange: jest.fn(),
    };
    let component: ReactWrapper<
      any,
      Readonly<{}>,
      React.Component<{}, {}, any>
    >;
    let textareaNode: () => Element;
    let container: HTMLDivElement | null;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      component = mount(
        <OuiMarkdownEditor {...testProps} {...requiredProps} />,
        { attachTo: container }
      );
      textareaNode = () =>
        component.find('OuiMarkdownEditorTextArea').getDOMNode();

      const textarea = textareaNode();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      textarea.setSelectionRange(0, 5);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      document.getElementById = jest.fn(() => textarea);
      document.execCommand = jest.fn(() => true);
    });

    afterEach(() => {
      container?.parentNode?.removeChild(container);
      container = null;
    });

    it('bold selected text on bold icon click', () => {
      component.find('button[aria-label="Bold"]').simulate('click');
      expect(document.getElementById).toHaveBeenCalledWith(testProps.editorId);
      expect(document.execCommand).toHaveBeenCalledWith(
        'insertText',
        false,
        `**${testProps.value}**`
      );
    });

    it('italicize selected text on italic icon click', () => {
      component.find('button[aria-label="Italic"]').simulate('click');
      expect(document.getElementById).toHaveBeenCalledWith(testProps.editorId);
      expect(document.execCommand).toHaveBeenCalledWith(
        'insertText',
        false,
        `_${testProps.value}_`
      );
    });

    it('convert selected text to unordered list on unordered list icon click', () => {
      component.find('button[aria-label="Unordered list"]').simulate('click');
      expect(document.getElementById).toHaveBeenCalledWith(testProps.editorId);
      expect(document.execCommand).toHaveBeenCalledWith(
        'insertText',
        false,
        `- ${testProps.value}`
      );
    });

    it('convert selected text to ordered list on ordered list icon click', () => {
      component.find('button[aria-label="Ordered list"]').simulate('click');
      expect(document.getElementById).toHaveBeenCalledWith(testProps.editorId);
      expect(document.execCommand).toHaveBeenCalledWith(
        'insertText',
        false,
        `1. ${testProps.value}`
      );
    });

    it('convert selected text task list on tasklist icon click', () => {
      component.find('button[aria-label="Task list"]').simulate('click');
      expect(document.getElementById).toHaveBeenCalledWith(testProps.editorId);
      expect(document.execCommand).toHaveBeenCalledWith(
        'insertText',
        false,
        `- [ ] ${testProps.value}`
      );
    });

    it('convert selected text to quote on quote icon click', () => {
      component.find('button[aria-label="Quote"]').simulate('click');
      expect(document.getElementById).toHaveBeenCalledWith(testProps.editorId);
      expect(document.execCommand).toHaveBeenCalledWith(
        'insertText',
        false,
        `> ${testProps.value}`
      );
    });

    it('convert selected text to code on code icon click', () => {
      component.find('button[aria-label="Code"]').simulate('click');
      expect(document.getElementById).toHaveBeenCalledWith(testProps.editorId);
      expect(document.execCommand).toHaveBeenCalledWith(
        'insertText',
        false,
        `\`${testProps.value}\``
      );
    });

    it('selected text will have a tooltip on tooltip icon click', () => {
      component.find('button[aria-label="Tooltip"]').simulate('click');
      expect(document.getElementById).toHaveBeenCalledWith(testProps.editorId);
      expect(document.execCommand).toHaveBeenCalledWith(
        'insertText',
        false,
        `!{tooltip[${testProps.value}]()}`
      );
    });
  });
});
