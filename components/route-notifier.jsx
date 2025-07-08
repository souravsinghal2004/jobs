// components/RouteLoadingNotifier.jsx
'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function RouteLoadingNotifier() {
  const router = useRouter()
  const timeoutRef = useRef(null)
  const toastId = useRef(null)

  useEffect(() => {
    const handleStart = () => {
      timeoutRef.current = setTimeout(() => {
        toastId.current = toast.loading('Working on it... Please wait.')
      }, 2000) // wait 2s before showing
    }

    const handleComplete = () => {
      clearTimeout(timeoutRef.current)
      if (toastId.current) {
        toast.dismiss(toastId.current)
        toastId.current = null
      }
    }

    router.events?.on('routeChangeStart', handleStart)
    router.events?.on('routeChangeComplete', handleComplete)
    router.events?.on('routeChangeError', handleComplete)

    return () => {
      router.events?.off('routeChangeStart', handleStart)
      router.events?.off('routeChangeComplete', handleComplete)
      router.events?.off('routeChangeError', handleComplete)
    }
  }, [router])

  return null
}
