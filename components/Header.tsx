import * as stylex from "@stylexjs/stylex";
import { marigoldColors } from '../app/marigoldColors.stylex'

const header_swatch = stylex.create({
    base: {
        minWidth: '4rem',
        minHeight: '4rem',
    },
    flower_yellow: {
      backgroundColor: marigoldColors.flowerYellow,
    },
    flower_gold: {
      backgroundColor: marigoldColors.flowerGold,
    },
    flower_red: {
      backgroundColor: marigoldColors.flowerRed
    },
    environment_brown: {
      backgroundColor: marigoldColors.environmentBrown
    },
    leaf: {
      backgroundColor: marigoldColors.leaf
    },
    pansy: {
      backgroundColor: marigoldColors.pansy
    }
})
export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center font-figtree">
      <img src="/simple_logo.png"/>
      <div className="flex flex-row">
        <div {...stylex.props(header_swatch.base, header_swatch.flower_yellow)}></div>
        <div {...stylex.props(header_swatch.base, header_swatch.flower_gold)}></div>
        <div {...stylex.props(header_swatch.base, header_swatch.flower_red)}></div>
        <div {...stylex.props(header_swatch.base, header_swatch.environment_brown)}></div>
        <div {...stylex.props(header_swatch.base, header_swatch.leaf)}></div>
        <div {...stylex.props(header_swatch.base, header_swatch.pansy)}></div>
      </div>
      <p className="text-2xl lg:text-2xl !leading-tight mx-auto max-w-xl text-center">
        Creating collaborative relationships between property owners and tenants.
      </p>
      <img src="/marigold_logo.png"/>
    </div>
  );
}
