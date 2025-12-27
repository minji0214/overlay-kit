import { FC } from 'react'

import { useDialogContext } from './DialogContext'
import { DialogRoot } from './DialogRoot'

/**
 * DialogRenderer 컴포넌트
 *
 * DialogProvider와 함께 사용하여 전역 dialog() 함수와 useDialog 훅으로 생성된
 * 다이얼로그들을 렌더링합니다.
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <DialogProvider>
 *       <YourApp />
 *       <DialogRenderer />
 *     </DialogProvider>
 *   )
 * }
 * ```
 */
export const DialogRenderer: FC = () => {
  const { dialogs, removeDialog, updateDialog } = useDialogContext()

  return (
    <>
      {dialogs.map((dialog) => (
        <DialogRoot
          key={dialog.id}
          open={dialog.open}
          onOpenChange={(open) => {
            if (!open) {
              removeDialog(dialog.id)
            } else {
              updateDialog(dialog.id, { open })
            }
            dialog.onOpenChange?.(open)
          }}
          zIndex={dialog.zIndex}
          closeOnOverlayClick={dialog.closeOnOverlayClick}
          closeOnEscape={dialog.closeOnEscape}
          overlayClassName={dialog.overlayClassName}
          contentClassName={dialog.contentClassName}
        >
          {dialog.content}
        </DialogRoot>
      ))}
    </>
  )
}
