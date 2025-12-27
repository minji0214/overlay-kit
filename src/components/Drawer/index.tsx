import { FC } from 'react'

/**
 * Drawer 컴포넌트의 Props
 */
export interface DrawerProps {
  /** 드로어의 열림/닫힘 상태를 제어합니다 */
  open?: boolean
  /** 드로어의 상태가 변경될 때 호출되는 콜백 함수 */
  onOpenChange?: (open: boolean) => void
  /** 드로어 내부에 표시할 콘텐츠 */
  children?: React.ReactNode
  /** 드로어가 나타날 방향 (기본값: 'right') */
  side?: 'top' | 'right' | 'bottom' | 'left'
}

/**
 * Drawer 컴포넌트
 *
 * 화면 가장자리에서 슬라이드되어 나타나는 드로어 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false)
 *
 * return (
 *   <>
 *     <button onClick={() => setOpen(true)}>Open Drawer</button>
 *     <Drawer open={open} onOpenChange={setOpen} side="right">
 *       <p>Drawer content</p>
 *     </Drawer>
 *   </>
 * )
 * ```
 */
export const Drawer: FC<DrawerProps> = ({
  open = false,
  onOpenChange: _onOpenChange,
  children,
  side: _side = 'right',
}) => {
  return (
    <div>
      {/* Drawer implementation will be added here */}
      {open && <div>{children}</div>}
    </div>
  )
}
