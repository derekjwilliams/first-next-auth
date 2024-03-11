import * as stylex from "@stylexjs/stylex";
import { marigoldColors } from '../app/marigoldColors.stylex'

const headerColors = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'row'
  }
})
const marigoldLogo = stylex.create({
  base: {
    width: '300px'
  }
})
const headerContainer = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4rem',
    alignItems: 'center',
    fontFamily: 'Figtree',
    fontSize: '24px',
  }
  // flex flex-col gap-16 items-center font-figtree
})
const headerSwatch = stylex.create({
    base: {
        minWidth: '4rem',
        minHeight: '4rem',
        maxWidth: '4rem',
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
    <div {...stylex.props(headerContainer.base)}>
      <img src="/simple_logo.png"/>
      <div {...stylex.props(headerColors.base)}>
        <div {...stylex.props(headerSwatch.base, headerSwatch.flower_yellow)}></div>
        <div {...stylex.props(headerSwatch.base, headerSwatch.flower_gold)}></div>
        <div {...stylex.props(headerSwatch.base, headerSwatch.flower_red)}></div>
        <div {...stylex.props(headerSwatch.base, headerSwatch.environment_brown)}></div>
        <div {...stylex.props(headerSwatch.base, headerSwatch.leaf)}></div>
        <div {...stylex.props(headerSwatch.base, headerSwatch.pansy)}></div>
      </div>
      <p>
        Creating collaborative relationships between property owners and tenants.
      </p>
      <img {...stylex.props(marigoldLogo.base)} src="/marigold_logo.png"/>
    </div>
  );
}
