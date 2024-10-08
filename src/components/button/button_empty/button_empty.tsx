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

import React, { FunctionComponent, Ref } from 'react';
import classNames from 'classnames';

import {
  CommonProps,
  ExclusiveUnion,
  PropsForAnchor,
  PropsForButton,
  keysOf,
} from '../../common';
import { getSecureRelForTarget } from '../../../services';
import {
  OuiButtonContent,
  OuiButtonContentProps,
  OuiButtonContentType,
} from '../button_content';
import { validateHref } from '../../../services/security/href_validator';

export type OuiButtonEmptyColor =
  | 'primary'
  | 'danger'
  | 'text'
  | 'ghost'
  | 'success'
  | 'warning';

const colorToClassNameMap: { [color in OuiButtonEmptyColor]: string } = {
  primary: 'ouiButtonEmpty--primary',
  danger: 'ouiButtonEmpty--danger',
  text: 'ouiButtonEmpty--text',
  ghost: 'ouiButtonEmpty--ghost',
  success: 'ouiButtonEmpty--success',
  warning: 'ouiButtonEmpty--warning',
};

export const COLORS = keysOf(colorToClassNameMap);

const sizeToClassNameMap = {
  xs: 'ouiButtonEmpty--xSmall',
  s: 'ouiButtonEmpty--small',
  l: 'ouiButtonEmpty--large',
};

export const SIZES = keysOf(sizeToClassNameMap);

export type OuiButtonEmptySizes = keyof typeof sizeToClassNameMap;

const flushTypeToClassNameMap = {
  left: 'ouiButtonEmpty--flushLeft',
  right: 'ouiButtonEmpty--flushRight',
  both: 'ouiButtonEmpty--flushBoth',
};

export const FLUSH_TYPES = keysOf(flushTypeToClassNameMap);

/**
 * Extends OuiButtonContentProps which provides
 * `iconType`, `iconSide`, `iconGap`, and `textProps`
 */
export interface CommonOuiButtonEmptyProps
  extends OuiButtonContentProps,
    CommonProps {
  /**
   * Any of our named colors
   */
  color?: OuiButtonEmptyColor;
  size?: OuiButtonEmptySizes;
  /**
   * Ensure the text of the button sits flush to the left, right, or both sides of its container
   */
  flush?: keyof typeof flushTypeToClassNameMap;
  /**
   * `disabled` is also allowed
   */
  isDisabled?: boolean;
  /**
   * Force disables the button and changes the icon to a loading spinner
   */
  isLoading?: boolean;
  /**
   * Applies the boolean state as the `aria-pressed` property to create a toggle button.
   * *Only use when the readable text does not change between states.*
   */
  isSelected?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
  buttonRef?: Ref<HTMLButtonElement | HTMLAnchorElement>;
  /**
   * Object of props passed to the <span/> wrapping the button's content
   */
  contentProps?: OuiButtonContentType;
}

type OuiButtonEmptyPropsForAnchor = PropsForAnchor<CommonOuiButtonEmptyProps>;

type OuiButtonEmptyPropsForButton = PropsForButton<CommonOuiButtonEmptyProps>;

export type OuiButtonEmptyProps = ExclusiveUnion<
  OuiButtonEmptyPropsForAnchor,
  OuiButtonEmptyPropsForButton
>;

export const OuiButtonEmpty: FunctionComponent<OuiButtonEmptyProps> = ({
  children,
  className,
  iconType,
  iconGap = 'm',
  iconSide = 'left',
  color = 'primary',
  size,
  flush,
  isDisabled: _isDisabled,
  disabled: _disabled,
  isLoading,
  href,
  target,
  rel,
  type = 'button',
  buttonRef,
  contentProps,
  textProps,
  isSelected,
  ...rest
}) => {
  const isHrefValid = !href || validateHref(href);
  const disabled = _disabled || !isHrefValid;
  const isDisabled = _isDisabled || !isHrefValid;

  // If in the loading state, force disabled to true
  const buttonIsDisabled = isLoading || isDisabled || disabled;

  const classes = classNames(
    'ouiButtonEmpty',
    colorToClassNameMap[color],
    size ? sizeToClassNameMap[size] : null,
    flush ? flushTypeToClassNameMap[flush] : null,
    {
      'ouiButtonEmpty-isDisabled': buttonIsDisabled,
    },
    className
  );

  const contentClassNames = classNames(
    'ouiButtonEmpty__content',
    contentProps && contentProps.className
  );

  const textClassNames = classNames(
    'ouiButtonEmpty__text',
    textProps && textProps.className
  );

  const iconSize = size === 'xs' ? 's' : 'm';

  const innerNode = (
    <OuiButtonContent
      isLoading={isLoading}
      iconType={iconType}
      iconSide={iconSide}
      iconSize={iconSize}
      iconGap={iconGap}
      textProps={{ ...textProps, className: textClassNames }}
      {...contentProps}
      // className has to come last to override contentProps.className
      className={contentClassNames}>
      {children}
    </OuiButtonContent>
  );

  // <a> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
  // this is a button and piggyback off its disabled styles.
  if (href && !buttonIsDisabled) {
    const secureRel = getSecureRelForTarget({ href, target, rel });

    return (
      <a
        className={classes}
        href={href}
        target={target}
        rel={secureRel}
        ref={buttonRef as Ref<HTMLAnchorElement>}
        {...(rest as OuiButtonEmptyPropsForAnchor)}>
        {innerNode}
      </a>
    );
  }

  return (
    <button
      disabled={buttonIsDisabled}
      className={classes}
      type={type}
      ref={buttonRef as Ref<HTMLButtonElement>}
      aria-pressed={isSelected}
      {...(rest as OuiButtonEmptyPropsForButton)}>
      {innerNode}
    </button>
  );
};

// @internal
export type OuiSmallButtonEmptyProps = ExclusiveUnion<
  Omit<OuiButtonEmptyPropsForAnchor, 'size'>,
  Omit<OuiButtonEmptyPropsForButton, 'size'>
>;

// @internal
export const OuiSmallButtonEmpty: FunctionComponent<OuiSmallButtonEmptyProps> = (
  props
) => <OuiButtonEmpty {...props} size="s" />;
