import React, { forwardRef } from 'react'
import Link from 'next/link'
import classNames from '@/utils/classnames'
import stylex from '@stylexjs/stylex'
import { fonts } from '@stylexjs/open-props/lib/fonts.stylex'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import { borders } from '@stylexjs/open-props/lib/borders.stylex'
import { marigoldColors } from '../../app/customStyles/marigoldColors.stylex'

const button = stylex.create({
  base: {
    display: 'inline-flex',
    whiteSpace: 'nowrap',
    fontSize: fonts.sizeFluid1,
    fontWeight: fonts.weight7,
    paddingInline: sizes.spacing6,
    paddingBlock: sizes.spacing3,
    color: {
      default: marigoldColors.foregroundLinkButton,
      ':hover': marigoldColors.foregroundHoverLinkButton,
      ':focus': marigoldColors.foregroundHoverLinkButton,
    },
    borderWidth: borders.size2,
    borderStyle: 'solid',
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
    <a onClick={onClick} ref={ref} className={className} {...props}>
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
  defaultClassName = { ...stylex.props(button.base) }['className'], // Default className
  ...props
}: LinkWrapperProps) => {
  const combinedClassName = classNames(defaultClassName || '', className || '') // Merge classNames
  return (
    <Link href={href} passHref legacyBehavior>
      <LinkButton href={href} className={combinedClassName} {...props}>
        {children}
      </LinkButton>
    </Link>
  )
}

export default LinkWrapperButton
