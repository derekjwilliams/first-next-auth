/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import type { VarGroup } from '@stylexjs/stylex/lib/StyleXTypes';
type TAspects = Readonly<{
  ratioSquare: string;
  ratioLandscape: string;
  ratioPortrait: string;
  ratioWidescreen: string;
  ratioUltrawide: string;
  ratioGolden: string;
}>;
export declare const aspects: VarGroup<TAspects>;
