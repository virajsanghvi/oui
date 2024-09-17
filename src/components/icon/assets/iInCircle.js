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

import * as React from 'react';
const OuiIconIInCircle = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7.5 12.008 7.468 7.5H6.25v-1h2.401l.03 4.508H9.8v1H7.5Zm-.25-7.202a.83.83 0 0 1 .207-.577c.137-.153.334-.229.59-.229.256 0 .454.076.594.23.14.152.209.345.209.576 0 .228-.07.417-.21.568-.14.15-.337.226-.593.226-.256 0-.453-.075-.59-.226a.81.81 0 0 1-.207-.568Z" />
    <path
      fillRule="evenodd"
      d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zm0 1A7 7 0 1 0 8 1a7 7 0 0 0 0 14z"
    />
  </svg>
);
export const icon = OuiIconIInCircle;
