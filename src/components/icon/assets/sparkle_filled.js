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
const OuiIconSparkleFilled = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M7.91667 4.25L9.09518 7.23816L12.0833 8.41667L9.09518 9.59518L7.91667 12.5833L6.73816 9.59518L3.75 8.41667L6.73816 7.23816L7.91667 4.25Z" />
    <path
      d="M7.91667 3.83333C8.08778 3.83333 8.2415 3.93795 8.30428 4.09713L9.41639 6.91694L12.2362 8.02906C12.3954 8.09184 12.5 8.24555 12.5 8.41667C12.5 8.58778 12.3954 8.7415 12.2362 8.80428L9.41639 9.91639L8.30428 12.7362C8.2415 12.8954 8.08778 13 7.91667 13C7.74555 13 7.59184 12.8954 7.52906 12.7362L6.41694 9.91639L3.59713 8.80428C3.43795 8.7415 3.33333 8.58778 3.33333 8.41667C3.33333 8.24555 3.43795 8.09184 3.59713 8.02906L6.41694 6.91694L7.52906 4.09713C7.59184 3.93795 7.74555 3.83333 7.91667 3.83333ZM7.91667 5.38567L7.12577 7.39103C7.08341 7.49841 6.99841 7.58341 6.89103 7.62577L4.88567 8.41667L6.89103 9.20757C6.99841 9.24992 7.08341 9.33492 7.12577 9.44231L7.91667 11.4477L8.70757 9.44231C8.74992 9.33492 8.83492 9.24992 8.94231 9.20757L10.9477 8.41667L8.94231 7.62577C8.83492 7.58341 8.74992 7.49841 8.70757 7.39103L7.91667 5.38567Z" />
    <path
      d="M4.16667 3L4.697 4.13634L5.83333 4.66667L4.697 5.197L4.16667 6.33333L3.63634 5.197L2.5 4.66667L3.63634 4.13634L4.16667 3Z" />
  </svg>
);
export const icon = OuiIconSparkleFilled;
