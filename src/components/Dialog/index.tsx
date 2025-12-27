import { FC, ReactNode } from 'react'

import { DialogOverlay } from './DialogOverlay'
import { DialogContent } from './DialogContent'

import { useScrollLock } from '@/utils/useScrollLock'
import { useAnimationState } from '@/hooks/useAnimationState'
import { useDialogHandlers } from '@/hooks/useDialogHandlers'
import { Portal } from '@/utils/portal'
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
  const { isVisible, shouldRender } = useAnimationState(open)
  const { handleClose, handleEscape } = useDialogHandlers({ onOpenChange, closeOnEscape })

  useScrollLock(open)

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
        enabled={isVisible}
        onEscape={handleEscape}
        className={`dialog-content ${isVisible ? 'dialog-content-enter' : 'dialog-content-exit'} ${contentClassName || ''}`}
        style={contentStyle}
      >
        {children}
      </DialogContent>
    </Portal>
  )
}
