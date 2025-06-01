// components/lexical/plugins/LinkDialog.tsx
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface LinkDialogProps {
  isOpen: boolean
  initialUrl?: string
  initialText?: string
  onConfirm: (url: string, text: string) => void
  onCancel: () => void
}

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
      // Focus URL input when dialog opens
      setTimeout(() => {
        urlInputRef.current?.focus()
      }, 0)
    }
  }, [isOpen, initialUrl, initialText])

  const handleConfirm = () => {
    if (url.trim()) {
      // Add https:// if no protocol is specified
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
    // Only close if clicking the overlay itself, not the dialog content
    if (e.target === e.currentTarget) {
      onCancel()
    }
  }

  if (!isOpen) return null

  return createPortal(
    <div
      className='link-dialog-overlay'
      onClick={handleOverlayClick}
      style={{
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
      }}>
      <div
        className='link-dialog'
        onKeyDown={handleKeyDown}
        style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          minWidth: '400px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
        <h3 style={{ margin: '0 0 16px 0' }}>Insert Link</h3>

        <div style={{ marginBottom: '16px' }}>
          <label
            htmlFor='link-url'
            style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
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
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label
            htmlFor='link-text'
            style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Text (optional)
          </label>
          <input
            id='link-text'
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Link text'
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button
            type='button'
            onClick={onCancel}
            style={{
              padding: '8px 16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: 'white',
              cursor: 'pointer',
            }}>
            Cancel
          </button>
          <button
            type='button'
            onClick={handleConfirm}
            disabled={!url.trim()}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              backgroundColor: url.trim() ? '#007bff' : '#ccc',
              color: 'white',
              cursor: url.trim() ? 'pointer' : 'not-allowed',
            }}>
            Insert Link
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
