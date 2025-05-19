import React, { forwardRef } from 'react'
import Link from 'next/link'
import classNames from '../../utils/classnames'
import stylex from '@stylexjs/stylex'
import { marigoldColors } from '../../app/customStyles/marigoldColors.stylex'
import { fonts } from '@derekjwilliams/stylextras-open-props-pr/fonts.stylex'
import { sizes } from '@derekjwilliams/stylextras-open-props-pr/sizes.stylex'
import { borders } from '@derekjwilliams/stylextras-open-props-pr/borders.stylex'

const button = stylex.create({
  base: {
    display: 'inline-flex',
    whiteSpace: 'nowrap',
    fontSize: fonts.sizeFluid1,
    fontWeight: fonts.weight7,
    paddingInline: sizes.spacing6,
    paddingBlock: sizes.spacing2,
    color: {
      default: marigoldColors.foregroundLinkButton,
      ':hover': marigoldColors.foregroundHoverLinkButton,
      ':focus': marigoldColors.foregroundHoverLinkButton,
    },
    borderColor: marigoldColors.foregroundLinkButton,
    backgroundColor: {
      default: 'transparent',
      ':hover': marigoldColors.backgroundHoverLinkButton,
      ':focus': marigoldColors.backgroundHoverLinkButton,
    },
    borderRadius: borders.radius2,
    cursor: {
      ':hover': 'pointer',
      ':focus': 'pointer',
    },
  },
})

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(({ onClick, children, className, ...props }, ref) => {
  return (
    <a
      onClick={onClick}
      ref={ref}
      className={className}
      {...props}>
      {children}
    </a>
  )
})

LinkButton.displayName = 'LinkButton'

interface LinkWrapperProps extends LinkButtonProps {
  href: string
  defaultClassName?: string
}

const LinkWrapperButton = ({
  href,
  children,
  className,
  defaultClassName = { ...stylex.props(button.base) }['className'],
  ...props
}: LinkWrapperProps) => {
  const combinedClassName = classNames(defaultClassName || '', className || '')

  return (
    <Link
      href={href}
      passHref
      className={combinedClassName}
      {...props}>
      {children}
    </Link>
  )
}

export default LinkWrapperButton
