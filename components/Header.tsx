import * as stylex from "@stylexjs/stylex";
// import { marigoldColors } from '../app/tokens.stylex.js'
const marigoldColors = {
  flowerYellow: 'rgb(255 213 95)',
  flowerGold: 'rgb(255 194 0)',
  flowerRed: 'rgb(247 70 0)',
  environmentBrown: 'rgb(214 122 0)',
  leaf: 'rgb(0 81 69)',
  pansy: 'rgb(168 0 173)'
}
const page_wrapper = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4rem',
    alignItems: 'center',
    fontFamily: 'Figtree'
  }
})
const header_swatch_wrapper = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'row',
  }
})
const byline = stylex.create({
  base: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
    marginLeft: 'auto',
    marginRight:'auto',
    maxWidth: '36rem',
    textAlign: 'center'
  }
})
const header_logo = stylex.create({
  base:{
    maxWidth: '500px'
  }
})

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
    <div {...stylex.props(page_wrapper.base)}>
      <img src="/simple_logo.png"/>
      <div {...stylex.props(header_swatch_wrapper.base)}>
        <div {...stylex.props(header_swatch.base, header_swatch.flower_yellow)}></div>
        <div {...stylex.props(header_swatch.base, header_swatch.flower_gold)}></div>
        <div {...stylex.props(header_swatch.base, header_swatch.flower_red)}></div>
        <div {...stylex.props(header_swatch.base, header_swatch.environment_brown)}></div>
        <div {...stylex.props(header_swatch.base, header_swatch.leaf)}></div>
        <div {...stylex.props(header_swatch.base, header_swatch.pansy)}></div>
      </div>
      <p {...stylex.props(byline.base)}>
        Creating collaborative relationships between property owners and tenants.
      </p>
      <img {...stylex.props(header_logo.base)} width='500' src="/marigold_logo.png"/>
    </div>
  );
}
