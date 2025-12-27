import { FC, ReactNode, useRef } from 'react'

import { DialogOverlay } from './DialogOverlay'
import { DialogContent } from './DialogContent'

import { useScrollLock } from '@/utils/useScrollLock'
import { useAnimationState } from '@/hooks/useAnimationState'
import { useDialogHandlers } from '@/hooks/useDialogHandlers'
import { Portal } from '@/utils/portal'
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
  const { isVisible, shouldRender } = useAnimationState(open)
  const { handleClose, handleEscape } = useDialogHandlers({ onOpenChange, closeOnEscape })

  useScrollLock(open)

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
        enabled={isVisible}
        onEscape={closeOnEscape ? handleEscape : undefined}
        className={`dialog-content ${isVisible ? 'dialog-content-enter' : 'dialog-content-exit'} ${contentClassName || ''}`}
        style={contentStyle}
      >
        {children}
      </DialogContent>
    </Portal>
  )
}
