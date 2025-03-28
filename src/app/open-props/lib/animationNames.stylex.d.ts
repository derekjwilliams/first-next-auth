/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import type { VarGroup } from '@stylexjs/stylex/lib/StyleXTypes';
type TAnimationNames = Readonly<{
  fadeIn: string;
  fadeInBloom: string;
  fadeOut: string;
  fadeOutBloom: string;
  scaleUp: string;
  scaleDown: string;
  slideOutUp: string;
  slideOutDown: string;
  slideOutRight: string;
  slideOutLeft: string;
  slideInUp: string;
  slideInDown: string;
  slideInRight: string;
  slideInLeft: string;
  shakeX: string;
  shakeY: string;
  spin: string;
  ping: string;
  blink: string;
  float: string;
  bounce: string;
  pulse: string;
}>;
export declare const animationNames: VarGroup<TAnimationNames>;
