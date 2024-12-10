/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import type { VarGroup } from '@stylexjs/stylex/lib/StyleXTypes';
type TMasksEdges = Readonly<{
  scoopBottom: string;
  scoopTop: string;
  scoopVertical: string;
  scoopLeft: string;
  scoopRight: string;
  scoopHorizontal: string;
  scalloped: string;
  scallopedBottom: string;
  scallopedTop: string;
  scallopedVertical: string;
  scallopedLeft: string;
  scallopedRight: string;
  scallopedHorizontal: string;
  dripBottom: string;
  dripTop: string;
  dripVertical: string;
  dripLeft: string;
  dripRight: string;
  dripHorizontal: string;
  zigZagTop: string;
  zigZagBottom: string;
  zigZagLeft: string;
  zigZagRight: string;
  zigZagHorizontal: string;
  zigZagVertical: string;
}>;
export declare const masksEdges: VarGroup<TMasksEdges>;
