import { ReactNode } from 'react'

import { useDialogContext } from '../components/Dialog/DialogContext'

/**
 * useDialog 훅에서 사용하는 다이얼로그 옵션
 */
interface DialogOptions {
  /** 다이얼로그 내부에 표시할 콘텐츠 (필수) */
  content: ReactNode
  /** 다이얼로그의 z-index 값 (지정하지 않으면 자동으로 스택킹됩니다) */
  zIndex?: number
  /** 오버레이(배경) 클릭 시 다이얼로그를 닫을지 여부 (기본값: true) */
  closeOnOverlayClick?: boolean
  /** Escape 키를 눌렀을 때 다이얼로그를 닫을지 여부 (기본값: true) */
  closeOnEscape?: boolean
  /** 오버레이(배경) 요소에 적용할 CSS 클래스명 */
  overlayClassName?: string
  /** 다이얼로그 콘텐츠 요소에 적용할 CSS 클래스명 */
  contentClassName?: string
  /** 다이얼로그의 상태가 변경될 때 호출되는 콜백 함수 */
  onOpenChange?: (open: boolean) => void
}

/**
 * 다이얼로그를 제어하기 위한 훅
 *
 * @returns dialog 함수와 removeDialog, updateDialog 함수를 반환합니다
 *
 * @example
 * ```tsx
 * const { dialog } = useDialog()
 *
 * const handleClick = () => {
 *   dialog({
 *     content: <div>Hello Dialog!</div>
 *   })
 * }
 * ```
 */
export const useDialog = () => {
  const { addDialog, removeDialog, updateDialog } = useDialogContext()

  const dialog = (options: DialogOptions) => {
    const id = addDialog({
      content: options.content,
      open: true,
      zIndex: options.zIndex,
      closeOnOverlayClick: options.closeOnOverlayClick,
      closeOnEscape: options.closeOnEscape,
      overlayClassName: options.overlayClassName,
      contentClassName: options.contentClassName,
      onOpenChange: options.onOpenChange,
    })

    const close = () => {
      removeDialog(id)
    }

    return {
      id,
      close,
    }
  }

  return {
    dialog,
    removeDialog,
    updateDialog,
  }
}
