import { FC, ReactNode, useRef, useState, useEffect } from 'react'
import { Portal } from '@/utils/portal'
import { useScrollLock } from '@/utils/useScrollLock'
import { useFocusTrap } from '@/utils/useFocusTrap'
import { DialogOverlay } from './DialogOverlay'
import { DialogContent } from './DialogContent'
import './DialogRoot.css'

interface DialogRootProps {
  open: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
  zIndex?: number
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  overlayClassName?: string
  contentClassName?: string
}

export const DialogRoot: FC<DialogRootProps> = ({
  open,
  onOpenChange,
  children,
  zIndex,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  overlayClassName,
  contentClassName,
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (open) {
      setShouldRender(true)
      // 다음 프레임에서 애니메이션 시작
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true)
        })
      })
    } else {
      setIsVisible(false)
      // 애니메이션 완료 후 DOM에서 제거
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 200) // transition duration과 동일
      return () => clearTimeout(timer)
    }
  }, [open])

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

  useScrollLock(open)
  useFocusTrap(contentRef, shouldRender && isVisible, closeOnEscape ? handleEscape : undefined)

  if (!shouldRender) {
    return null
  }

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    ...(zIndex !== undefined && { zIndex }),
  }

  const contentStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
    ...(zIndex !== undefined && { zIndex: zIndex + 1 }),
  }

  return (
    <Portal>
      <DialogOverlay
        onClick={closeOnOverlayClick ? handleClose : undefined}
        className={`dialog-overlay ${isVisible ? 'dialog-overlay-enter' : 'dialog-overlay-exit'} ${overlayClassName || ''}`}
        style={overlayStyle}
      />
      <DialogContent
        ref={contentRef}
        className={`dialog-content ${isVisible ? 'dialog-content-enter' : 'dialog-content-exit'} ${contentClassName || ''}`}
        style={contentStyle}
      >
        {children}
      </DialogContent>
    </Portal>
  )
}
