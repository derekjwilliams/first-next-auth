/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import { defineVars } from '@stylexjs/stylex';
const radius1 = '2px';
const radius2 = '5px';
const radius3 = '1rem';
const radius4 = '2rem';
const radius5 = '4rem';
const radius6 = '8rem';
export const borders = defineVars({
  size1: '1px',
  size2: '2px',
  size3: '5px',
  size4: '10px',
  size5: '25px',
  radius1: radius1,
  radius2: radius2,
  radius3: radius3,
  radius4: radius4,
  radius5: radius5,
  radius6: radius6,
  radiusRound: '1e5px',
  // radiusBlob1: '30% 70% 70% 30% / 53% 30% 70% 47%',
  // radiusBlob2: '53% 47% 34% 66% / 63% 46% 54% 37%',
  // radiusBlob3: '37% 63% 56% 44% / 49% 56% 44% 51%',
  // radiusBlob4: '63% 37% 37% 63% / 43% 37% 63% 57%',
  // radiusBlob5: '49% 51% 48% 52% / 57% 44% 56% 43%',
  radiusConditional1: `clamp(0px, calc(100vw - 100%) * 1e5, ${radius1})`,
  radiusConditional2: `clamp(0px, calc(100vw - 100%) * 1e5, ${radius2})`,
  radiusConditional3: `clamp(0px, calc(100vw - 100%) * 1e5, ${radius3})`,
  radiusConditional4: `clamp(0px, calc(100vw - 100%) * 1e5, ${radius4})`,
  radiusConditional5: `clamp(0px, calc(100vw - 100%) * 1e5, ${radius5})`,
  radiusConditional6: `clamp(0px, calc(100vw - 100%) * 1e5, ${radius6})`
});