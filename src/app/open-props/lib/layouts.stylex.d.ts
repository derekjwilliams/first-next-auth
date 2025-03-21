/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import type { VarGroup } from '@stylexjs/stylex/lib/StyleXTypes';
type TLayouts = Readonly<{
  gridCell: string;
  gridCellName: string;
  gridRam: string;
  gridHolyGrail: string;
  gridAdaptMixinViewportContext: string;
  gridAdaptMixinContainerContext: string;
  gridAdaptMixinContext: string;
  gridAdaptMixinBreak1: string;
  aboveBreak1Columns: string;
  gridAdaptMixinBreak2: string;
  aboveBreak2Columns: string;
  gridAdaptMixin: string;
}>;
export declare const layouts: VarGroup<TLayouts>;
