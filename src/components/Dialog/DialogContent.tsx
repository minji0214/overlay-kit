import { useRef, ReactNode, forwardRef } from 'react'

import { useFocusTrap } from '@/utils/useFocusTrap'

interface DialogContentProps {
  children: ReactNode
  onEscape?: () => void
  className?: string
  style?: React.CSSProperties
  enabled?: boolean
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, onEscape, className, style, enabled = true }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const actualRef = (ref || contentRef) as React.RefObject<HTMLDivElement>

    useFocusTrap(actualRef, enabled, onEscape)

    return (
      <div ref={actualRef} role="dialog" aria-modal="true" className={className} style={style}>
        {children}
      </div>
    )
  },
)

DialogContent.displayName = 'DialogContent'
