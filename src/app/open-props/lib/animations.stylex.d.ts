/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import type {
  MapNamespaces,
  StyleXVar,
} from '@stylexjs/stylex/lib/StyleXTypes';
type Style = Readonly<{
  animationName: string | StyleXVar<string>;
  animationDuration: string;
  animationTimingFunction: string | StyleXVar<string>;
  animationIterationCount?: string;
}>;
type TAnimations = MapNamespaces<
  Readonly<{
    fadeIn: Style;
    fadeInBloom: Style;
    fadeOut: Style;
    fadeOutBloom: Style;
    scaleUp: Style;
    scaleDown: Style;
    slideOutUp: Style;
    slideOutDown: Style;
    slideOutRight: Style;
    slideOutLeft: Style;
    slideInUp: Style;
    slideInDown: Style;
    slideInRight: Style;
    slideInLeft: Style;
    shakeX: Style;
    shakeY: Style;
    spin: Style;
    ping: Style;
    blink: Style;
    float: Style;
    bounce: Style;
    pulse: Style;
  }>
>;
export declare const animations: TAnimations;
