// components/lexical/plugins/LinkDialog.tsx
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../../../app/customStyles/marigoldColors.stylex'
import { spacingPatterns } from '../../../app/customStyles/spacingPatterns.stylex'
import { borders } from '@derekjwilliams/stylextras-open-props-pr/lib/borders.stylex'

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
    backgroundColor: marigoldColors.backgroundCard,
    padding: '24px',
    borderRadius: '8px',
    borderStyle: 'solid',
    borderColor: marigoldColors.borderSubtle,
    borderWidth: '1px',
    minWidth: '400px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    margin: '0 0 16px 0',
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
    width: '100%',
    padding: spacingPatterns.gapSmall,
    border: `1px solid ${marigoldColors.textInputBorder}`,
    borderRadius: borders.radius2,
    boxSizing: 'border-box',
    backgroundColor: marigoldColors.textInputBackground,
    color: marigoldColors.textInputColor,
    ':focus': {
      outline: `2px solid ${marigoldColors.primary}`,
      outlineOffset: '1px',
    },
  },
  buttonContainer: {
    display: 'flex',
    gap: spacingPatterns.gapSmall,
    justifyContent: 'flex-end',
  },
  cancelButton: {
    padding: `${spacingPatterns.gapSmall} ${spacingPatterns.gapLarge}`,
    border: `1px solid ${marigoldColors.textInputBorder}`,
    borderRadius: borders.radius2,
    backgroundColor: marigoldColors.backgroundCard,
    color: marigoldColors.foreground,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: marigoldColors.backgroundHoverLinkButton,
      color: marigoldColors.foregroundHoverLinkButton,
    },
  },
  confirmButton: {
    padding: `${spacingPatterns.gapSmall} ${spacingPatterns.gapLarge}`,
    border: 'none',
    borderRadius: borders.radius2,
    backgroundColor: marigoldColors.backgroundButton,
    color: marigoldColors.foregroundButton,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: marigoldColors.backgroundHoverButton,
      color: marigoldColors.foregroundHoverButton,
    },
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
            {...stylex.props(styles.cancelButton)}>
            Cancel
          </button>
          <button
            type='button'
            onClick={handleConfirm}
            disabled={!isUrlValid}
            {...stylex.props(styles.confirmButton, !isUrlValid && styles.confirmButtonDisabled)}>
            Insert Link
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
