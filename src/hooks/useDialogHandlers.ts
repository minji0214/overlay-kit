import { useCallback } from 'react'

interface UseDialogHandlersOptions {
  onOpenChange?: (open: boolean) => void
  closeOnEscape?: boolean
}

export const useDialogHandlers = ({ onOpenChange, closeOnEscape = true }: UseDialogHandlersOptions) => {
  const handleClose = useCallback(() => {
    if (onOpenChange) {
      onOpenChange(false)
    }
  }, [onOpenChange])

  const handleEscape = useCallback(() => {
    if (closeOnEscape) {
      handleClose()
    }
  }, [closeOnEscape, handleClose])

  return { handleClose, handleEscape }
}
