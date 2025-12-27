import { ReactNode } from 'react'

import type { DialogInstance } from './components/Dialog/DialogContext'

let dialogContextInstance: {
  addDialog: (dialog: Omit<DialogInstance, 'id'>) => string
  removeDialog: (id: string) => void
  updateDialog: (id: string, updates: Partial<DialogInstance>) => void
} | null = null

export const setDialogContext = (context: typeof dialogContextInstance) => {
  dialogContextInstance = context
}

/**
 * dialog() 함수의 옵션
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
 * 전역 다이얼로그를 여는 함수
 *
 * @param options - 다이얼로그 옵션
 * @returns 다이얼로그 인스턴스의 id와 close 함수를 반환합니다
 *
 * @example
 * ```tsx
 * const { close } = dialog({
 *   content: <div>Hello Dialog!</div>,
 *   closeOnOverlayClick: true,
 * })
 *
 * // 프로그래밍 방식으로 닫기
 * close()
 * ```
 *
 * @throws {Error} DialogProvider가 마운트되지 않은 경우 에러를 발생시킵니다
 */
export const dialog = (options: DialogOptions) => {
  if (!dialogContextInstance) {
    throw new Error('dialog() must be called within DialogProvider. Make sure DialogProvider is mounted in your app.')
  }

  const id = dialogContextInstance.addDialog({
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
    dialogContextInstance?.removeDialog(id)
  }

  return {
    id,
    close,
  }
}
