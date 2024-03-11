/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import type { VarGroup } from '@stylexjs/stylex/lib/StyleXTypes';
type TZindex = Readonly<{
  layer1: number;
  layer2: number;
  layer3: number;
  layer4: number;
  layer5: number;
  layerImportant: number;
}>;
export declare const zIndex: VarGroup<TZindex>;
