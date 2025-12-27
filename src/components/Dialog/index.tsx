import { FC, ReactNode, useState, useEffect } from 'react'
import { Portal } from '@/utils/portal'
import { useScrollLock } from '@/utils/useScrollLock'
import { DialogOverlay } from './DialogOverlay'
import { DialogContent } from './DialogContent'
import './DialogRoot.css'

export interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: ReactNode
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  overlayClassName?: string
  contentClassName?: string
  zIndex?: number
}

export const Dialog: FC<DialogProps> = ({
  open = false,
  onOpenChange,
  children,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  overlayClassName,
  contentClassName,
  zIndex,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (open) {
      setShouldRender(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true)
        })
      })
    } else {
      setIsVisible(false)
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [open])

  useScrollLock(open)

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false)
    }
  }

  const handleEscape = () => {
    if (closeOnEscape) {
      handleClose()
    }
  }

  if (!shouldRender) {
    return null
  }

  const overlayStyle: React.CSSProperties | undefined = zIndex ? { zIndex } : undefined
  const contentStyle: React.CSSProperties | undefined = zIndex ? { zIndex: zIndex + 1 } : undefined

  return (
    <Portal>
      <DialogOverlay
        onClick={closeOnOverlayClick ? handleClose : undefined}
        className={`dialog-overlay ${isVisible ? 'dialog-overlay-enter' : 'dialog-overlay-exit'} ${overlayClassName || ''}`}
        style={overlayStyle}
      />
      <DialogContent
        onEscape={handleEscape}
        className={`dialog-content ${isVisible ? 'dialog-content-enter' : 'dialog-content-exit'} ${contentClassName || ''}`}
        style={contentStyle}
      >
        {children}
      </DialogContent>
    </Portal>
  )
}
