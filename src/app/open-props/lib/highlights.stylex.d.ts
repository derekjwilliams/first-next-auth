/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import type { VarGroup } from '@stylexjs/stylex/lib/StyleXTypes';
type THighlights = Readonly<{
  highlightSize: string;
  highlightColor: string;
  highlight: string;
}>;
export declare const highlights: VarGroup<THighlights>;
