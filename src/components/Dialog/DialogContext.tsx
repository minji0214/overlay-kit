import { createContext, useContext, ReactNode } from 'react'

/**
 * 다이얼로그 인스턴스 타입
 */
export interface DialogInstance {
  /** 다이얼로그의 고유 ID */
  id: string
  /** 다이얼로그 내부에 표시할 콘텐츠 */
  content: ReactNode
  /** 다이얼로그의 열림/닫힘 상태 */
  open: boolean
  /** 다이얼로그의 z-index 값 */
  zIndex?: number
  /** 다이얼로그의 상태가 변경될 때 호출되는 콜백 함수 */
  onOpenChange?: (open: boolean) => void
  /** 오버레이(배경) 클릭 시 다이얼로그를 닫을지 여부 */
  closeOnOverlayClick?: boolean
  /** Escape 키를 눌렀을 때 다이얼로그를 닫을지 여부 */
  closeOnEscape?: boolean
  /** 오버레이(배경) 요소에 적용할 CSS 클래스명 */
  overlayClassName?: string
  /** 다이얼로그 콘텐츠 요소에 적용할 CSS 클래스명 */
  contentClassName?: string
}

/**
 * DialogContext의 값 타입
 */
interface DialogContextValue {
  /** 현재 등록된 모든 다이얼로그 인스턴스 목록 */
  dialogs: DialogInstance[]
  /** 새로운 다이얼로그를 추가하고 ID를 반환합니다 */
  addDialog: (dialog: Omit<DialogInstance, 'id'>) => string
  /** 지정된 ID의 다이얼로그를 제거합니다 */
  removeDialog: (id: string) => void
  /** 지정된 ID의 다이얼로그를 업데이트합니다 */
  updateDialog: (id: string, updates: Partial<DialogInstance>) => void
}

const DialogContext = createContext<DialogContextValue | null>(null)

export const useDialogContext = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useDialogContext must be used within DialogProvider')
  }
  return context
}

export { DialogContext }
