import React, { FC, HTMLAttributes } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import './RadioSet.css'
import stylex from '@stylexjs/stylex'
import { fonts } from '../../app/open-props/lib/fonts.stylex'
import { sizes } from '../../app/open-props/lib/sizes.stylex'

const styles = stylex.create({
  label: {
    fontSize: fonts.size3,
    lineHeight: fonts.lineHeight0,
    paddingLeft: sizes.spacing3,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: sizes.spacing2,
    marginBottom: sizes.spacing5,
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
    <RadioGroup.Root className='RadioGroupRoot' {...stylex.props(styles.root)} defaultValue={value} name={name}>
      {options.map((option) => (
        <div key={option.id} style={{ display: 'flex', alignItems: 'center' }}>
          <RadioGroup.Item className='RadioGroupItem' value={option.value} id={option.id}>
            <RadioGroup.Indicator className='RadioGroupIndicator' />
          </RadioGroup.Item>
          <label className='Label' {...stylex.props(styles.label)} htmlFor={option.id}>
            {option.label}
          </label>
        </div>
      ))}
    </RadioGroup.Root>
  )
}

export default RadioSet
