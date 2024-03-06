import * as stylex from "@stylexjs/stylex";
import { marigoldColors } from '../app/tokens.stylex'

const page_wrapper = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4rem',
    alignItems: 'center',
    fontFamily: 'Figtree',
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
    textAlign: 'center',
  }
})
const logo = stylex.create({
  base:{
    maxWidth: '500px',
  }
})

const header_swatch = stylex.create({
    base: {
        minWidth: '4rem',
        minHeight: '4rem',
    },
    flower_yellow: {
      backgroundColor: 'red',
    },
    flower_gold: {
      backgroundColor: 'red',
    },
    flower_red: {
      backgroundColor: 'red',
    },
    environment_brown: {
      backgroundColor: 'red',
    },
    leaf: {
      backgroundColor: 'red',
    },
    pansy: {
      backgroundColor: 'red',
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
      <img {...stylex.props(logo.base)} src="/marigold_logo.png"/>
    </div>
  );
}
