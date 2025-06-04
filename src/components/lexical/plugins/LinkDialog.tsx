// components/lexical/plugins/LinkDialog.tsx
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../../../app/customStyles/marigoldColors.stylex'
import { spacingPatterns } from '../../../app/customStyles/spacingPatterns.stylex'
import { borders } from '@derekjwilliams/stylextras-open-props-pr/lib/borders.stylex'
import { fonts } from '@derekjwilliams/stylextras-open-props-pr/lib/fonts.stylex'

interface LinkDialogProps {
  isOpen: boolean
  initialUrl?: string
  initialText?: string
  onConfirm: (url: string, text: string) => void
  onCancel: () => void
}

const styles = stylex.create({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  dialog: {
    backgroundColor: marigoldColors.cardBackground,
    padding: '24px',
    borderRadius: '8px',
    borderStyle: 'solid',
    borderColor: marigoldColors.borderSubtle,
    borderWidth: '1px',
    minWidth: {
      default: '300px',
      '@media (min-width: 600px)': '600px',
    },
    maxWidth: {
      default: '300px',
      '@media (min-width: 600px)': '800px',
    },

    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    margin: 0,
    marginBottom: spacingPatterns.gapMedium,
    color: marigoldColors.foreground,
  },
  inputGroup: {
    marginBottom: spacingPatterns.gapLarge,
  },
  inputGroupLast: {
    marginBottom: spacingPatterns.gapXLarge,
  },
  label: {
    display: 'block',
    marginBottom: spacingPatterns.gapSmall,
    fontWeight: 'bold',
    color: marigoldColors.label,
  },
  input: {
    '::placeholder': {
      color: '#999',
    },
    width: '100%',
    borderColor: marigoldColors.textInputBorder,
    padding: spacingPatterns.gapSmall,
    borderStyle: 'solid',
    borderRadius: borders.radius2,
    boxSizing: 'border-box',
    backgroundColor: marigoldColors.textInputBackground,
    color: marigoldColors.textInputColor,
    fontFamily: fonts.sans,
    fontSize: fonts.size1,
    ':focus': {
      outline: '2px solid ' + marigoldColors.primary,
      outlineOffset: '-2px',
      borderColor: 'transparent',
    },
  },
  buttonContainer: {
    display: 'flex',
    gap: spacingPatterns.gapSmall,
    justifyContent: 'flex-end',
  },
  button: {
    padding: spacingPatterns.gapSmall,
    paddingLeft: spacingPatterns.gapLarge,
    paddingRight: spacingPatterns.gapLarge,
    border: '1px solid ' + marigoldColors.textInputBorder,
    borderRadius: borders.radius2,
    backgroundColor: marigoldColors.backgroundCard,
    color: marigoldColors.foregroundButton,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: marigoldColors.backgroundHoverLinkButton,
      color: marigoldColors.foregroundHoverLinkButton,
    },
  },
  cancelButton: {
    backgroundColor: marigoldColors.backgroundCard,
  },
  confirmButton: {
    backgroundColor: marigoldColors.backgroundButton,
  },
  confirmButtonDisabled: {
    backgroundColor: marigoldColors.borderSubtle,
    color: marigoldColors.foregroundMuted,
    cursor: 'not-allowed',
    ':hover': {
      backgroundColor: marigoldColors.borderSubtle,
      color: marigoldColors.foregroundMuted,
    },
  },
})

export default function LinkDialog({
  isOpen,
  initialUrl = '',
  initialText = '',
  onConfirm,
  onCancel,
}: LinkDialogProps) {
  const [url, setUrl] = useState(initialUrl)
  const [text, setText] = useState(initialText)
  const urlInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setUrl(initialUrl)
      setText(initialText)
      setTimeout(() => {
        urlInputRef.current?.focus()
      }, 0)
    }
  }, [isOpen, initialUrl, initialText])

  const handleConfirm = () => {
    if (url.trim()) {
      const formattedUrl = url.startsWith('http') ? url : `https://${url}`
      onConfirm(formattedUrl, text.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onCancel()
    } else if (e.key === 'Enter') {
      e.preventDefault()
      handleConfirm()
    }
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel()
    }
  }

  if (!isOpen) return null

  const isUrlValid = url.trim()

  return createPortal(
    <div
      {...stylex.props(styles.overlay)}
      onClick={handleOverlayClick}>
      <div
        {...stylex.props(styles.dialog)}
        onKeyDown={handleKeyDown}>
        <h3 {...stylex.props(styles.title)}>Insert Link</h3>

        <div {...stylex.props(styles.inputGroup)}>
          <label
            htmlFor='link-url'
            {...stylex.props(styles.label)}>
            URL
          </label>
          <input
            ref={urlInputRef}
            id='link-url'
            type='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='https://example.com'
            {...stylex.props(styles.input)}
          />
        </div>

        <div {...stylex.props(styles.inputGroupLast)}>
          <label
            htmlFor='link-text'
            {...stylex.props(styles.label)}>
            Text (optional)
          </label>
          <input
            id='link-text'
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Link text'
            {...stylex.props(styles.input)}
          />
        </div>

        <div {...stylex.props(styles.buttonContainer)}>
          <button
            type='button'
            onClick={onCancel}
            {...stylex.props(styles.button, styles.cancelButton)}>
            Cancel
          </button>
          <button
            type='button'
            onClick={handleConfirm}
            disabled={!isUrlValid}
            {...stylex.props(styles.button, styles.confirmButton, !isUrlValid && styles.confirmButtonDisabled)}>
            Insert Link
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
