import { FC, ReactNode } from 'react'

import { DialogOverlay } from './DialogOverlay'
import { DialogContent } from './DialogContent'

import { useScrollLock } from '@/utils/useScrollLock'
import { useAnimationState } from '@/hooks/useAnimationState'
import { useDialogHandlers } from '@/hooks/useDialogHandlers'
import { Portal } from '@/utils/portal'
import './DialogRoot.css'

/**
 * Dialog 컴포넌트의 Props
 */
export interface DialogProps {
  /** 다이얼로그의 열림/닫힘 상태를 제어합니다 */
  open?: boolean
  /** 다이얼로그의 상태가 변경될 때 호출되는 콜백 함수 */
  onOpenChange?: (open: boolean) => void
  /** 다이얼로그 내부에 표시할 콘텐츠 */
  children?: ReactNode
  /** 오버레이(배경) 클릭 시 다이얼로그를 닫을지 여부 (기본값: true) */
  closeOnOverlayClick?: boolean
  /** Escape 키를 눌렀을 때 다이얼로그를 닫을지 여부 (기본값: true) */
  closeOnEscape?: boolean
  /** 오버레이(배경) 요소에 적용할 CSS 클래스명 */
  overlayClassName?: string
  /** 다이얼로그 콘텐츠 요소에 적용할 CSS 클래스명 */
  contentClassName?: string
  /** 다이얼로그의 z-index 값 (지정하지 않으면 자동으로 스택킹됩니다) */
  zIndex?: number
}

/**
 * Dialog 컴포넌트
 *
 * 다이얼로그를 표시하기 위한 컴포넌트입니다. Portal을 사용하여 body에 마운트되며,
 * 접근성 기능(키보드 네비게이션, 포커스 트랩)을 포함합니다.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false)
 *
 * return (
 *   <>
 *     <button onClick={() => setOpen(true)}>Open Dialog</button>
 *     <Dialog
 *       open={open}
 *       onOpenChange={setOpen}
 *       overlayClassName="my-overlay"
 *       contentClassName="my-content"
 *     >
 *       <div>Dialog content</div>
 *     </Dialog>
 *   </>
 * )
 * ```
 */
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
