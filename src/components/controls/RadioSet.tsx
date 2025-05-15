import React, { FC, HTMLAttributes } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import './RadioSet.css'
import stylex from '@stylexjs/stylex'
import { fonts } from '@derekjwilliams/stylextras-open-props-pr/lib/fonts.stylex'
import { sizes } from '@derekjwilliams/stylextras-open-props-pr/lib/sizes.stylex'
import { colors } from '@derekjwilliams/stylextras-open-props-pr/lib/colors.stylex'
import { borders } from '@derekjwilliams/stylextras-open-props-pr/lib/borders.stylex'
import { marigoldColors } from '../../app/customStyles/marigoldColors.stylex'

const styles = stylex.create({
  label: {
    fontSize: fonts.size2,
    lineHeight: fonts.lineHeight0,
    paddingLeft: sizes.spacing3,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: sizes.spacing2,
    marginBottom: sizes.spacing5,
  },
  itemWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  item: {
    borderStyle: 'solid',
    borderColor: colors.gray8,
    backgroundColor: {
      default: 'white',
      ':hover': marigoldColors.flowerYellow,
      ':active': 'darkblue',
    },
    borderWidth: borders.size1,
    width: '20px',
    height: '20px',
    borderRadius: '100%',
  },
  indicator: {
    display: 'block',
    alignItems: 'center',
    justifyContent: 'center',

    // marginLeft: '5px',
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: '20px',
  },
})

interface RadioOption {
  value: string
  label: string
  id: string
}

interface RadioSetProps extends HTMLAttributes<HTMLDivElement> {
  options: RadioOption[]
  value: string
  name?: string
}

const RadioSet: FC<RadioSetProps> = ({ options, value, name }) => {
  return (
    <RadioGroup.Root
      className='RadioGroupRoot'
      {...stylex.props(styles.root)}
      defaultValue={value}
      name={name}>
      {options.map((option) => (
        <div
          key={option.id}
          {...stylex.props(styles.itemWrapper)}>
          <RadioGroup.Item
            className='RadioGroupItem'
            {...stylex.props(styles.item)}
            value={option.value}
            id={option.id}>
            <RadioGroup.Indicator
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              {...stylex.props(styles.indicator)}
              className='RadioGroupIndicator'
            />
          </RadioGroup.Item>
          <label
            className='Label'
            {...stylex.props(styles.label)}
            htmlFor={option.id}>
            {option.label}
          </label>
        </div>
      ))}
    </RadioGroup.Root>
  )
}

export default RadioSet
