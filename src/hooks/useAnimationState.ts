import { useState, useEffect } from 'react'

import { DIALOG_TRANSITION_DURATION } from '@/components/Dialog/constants'

export const useAnimationState = (open: boolean) => {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (open) {
      setShouldRender(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true)
        })
      })
    } else {
      setIsVisible(false)
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, DIALOG_TRANSITION_DURATION)
      return () => clearTimeout(timer)
    }
  }, [open])

  return { isVisible, shouldRender }
}
