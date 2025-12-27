import { FC, ReactNode, useState, useCallback, useEffect, useRef } from 'react'

import { DialogContext, DialogInstance } from './DialogContext'

import { setDialogContext } from '@/dialog'

/**
 * DialogProvider 컴포넌트의 Props
 */
interface DialogProviderProps {
  /** 자식 요소 */
  children: ReactNode
  /** 다이얼로그의 기본 z-index 값 (기본값: 50) */
  defaultZIndex?: number
}

/**
 * 다이얼로그 컨텍스트를 제공하는 Provider 컴포넌트
 *
 * 앱의 최상위 레벨에 배치하여 dialog() 함수와 useDialog 훅을 사용할 수 있게 합니다.
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <DialogProvider defaultZIndex={50}>
 *       <YourApp />
 *       <DialogRenderer />
 *     </DialogProvider>
 *   )
 * }
 * ```
 */
export const DialogProvider: FC<DialogProviderProps> = ({ children, defaultZIndex = 50 }) => {
  const [dialogs, setDialogs] = useState<DialogInstance[]>([])
  const dialogsRef = useRef<DialogInstance[]>([])

  useEffect(() => {
    dialogsRef.current = dialogs
  }, [dialogs])

  const addDialog = useCallback(
    (dialog: Omit<DialogInstance, 'id'>) => {
      const id = crypto.randomUUID()
      const zIndex = dialog.zIndex ?? defaultZIndex + dialogsRef.current.length

      setDialogs((prev) => [...prev, { ...dialog, id, zIndex }])

      return id
    },
    [defaultZIndex],
  )

  const removeDialog = useCallback((id: string) => {
    setDialogs((prev) => prev.filter((dialog) => dialog.id !== id))
  }, [])

  const updateDialog = useCallback((id: string, updates: Partial<DialogInstance>) => {
    setDialogs((prev) => prev.map((dialog) => (dialog.id === id ? { ...dialog, ...updates } : dialog)))
  }, [])

  useEffect(() => {
    setDialogContext({ addDialog, removeDialog, updateDialog })
  }, [addDialog, removeDialog, updateDialog])

  return (
    <DialogContext.Provider value={{ dialogs, addDialog, removeDialog, updateDialog }}>
      {children}
    </DialogContext.Provider>
  )
}
