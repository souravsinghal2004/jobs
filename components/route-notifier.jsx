// components/RouteLoadingNotifier.jsx
'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'

export default function RouteLoadingNotifier() {
  const pathname = usePathname()
  const prevPath = useRef(pathname)
  const timeoutRef = useRef(null)
  const toastId = useRef(null)

  useEffect(() => {
    if (prevPath.current !== pathname) {
      // Route change started
      clearTimeout(timeoutRef.current)

      timeoutRef.current = setTimeout(() => {
        toastId.current = toast.loading('Working on it... Please wait.')
      }, 1000)

      // Route change complete
      setTimeout(() => {
        clearTimeout(timeoutRef.current)
        if (toastId.current) {
          toast.dismiss(toastId.current)
          toastId.current = null
        }
        prevPath.current = pathname
      }, 2000)
    }
  }, [pathname])

  return null
}
