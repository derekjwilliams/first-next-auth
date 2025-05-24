import * as stylex from '@stylexjs/stylex'
import Image from 'next/image'
import { colorPrimitives } from '../app/customStyles/colorPrimitives.stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'

const headerColors = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'row',
  },
  byline: {
    color: marigoldColors.foreground,
    backgroundColor: marigoldColors.background,
    textAlign: 'center',
  },
})
const marigoldLogo = stylex.create({
  base: {
    width: '300px',
  },
})
const headerContainer = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4rem',
    alignItems: 'center',
    fontSize: '24px',
    color: 'black',
  },
})

const headerSwatch = stylex.create({
  base: {
    minWidth: '4rem',
    minHeight: '4rem',
    maxWidth: '4rem',
  },
  flower_yellow: {
    backgroundColor: colorPrimitives.marigoldYellow,
  },
  flower_gold: {
    backgroundColor: colorPrimitives.marigoldGold,
  },
  flower_red: {
    backgroundColor: colorPrimitives.marigoldRed,
  },
  environment_brown: {
    backgroundColor: colorPrimitives.environmentBrown,
  },
  leaf: {
    backgroundColor: colorPrimitives.marigoldLeaf,
  },
  pansy: {
    backgroundColor: colorPrimitives.pansy,
  },
})
export default function Header() {
  return (
    <div {...stylex.props(headerContainer.base)}>
      <Image
        alt='simple logo'
        width={492 / 4}
        height={492 / 4}
        src='/simple_logo.png'
        priority={true}
      />
      <div {...stylex.props(headerColors.base)}>
        <div {...stylex.props(headerSwatch.base, headerSwatch.flower_yellow)}></div>
        <div {...stylex.props(headerSwatch.base, headerSwatch.flower_gold)}></div>
        <div {...stylex.props(headerSwatch.base, headerSwatch.flower_red)}></div>
        <div {...stylex.props(headerSwatch.base, headerSwatch.environment_brown)}></div>
        <div {...stylex.props(headerSwatch.base, headerSwatch.leaf)}></div>
        <div {...stylex.props(headerSwatch.base, headerSwatch.pansy)}></div>
      </div>
      <p {...stylex.props(headerColors.byline)}>
        Creating collaborative relationships between property owners and tenants.
      </p>
      <Image
        alt='logo'
        width={1322 / 4}
        height={365 / 4}
        {...stylex.props(marigoldLogo.base)}
        src='/marigold_logo.png'
      />
    </div>
  )
}
