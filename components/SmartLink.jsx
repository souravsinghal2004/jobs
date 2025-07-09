'use client'

import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useTransition } from 'react'

export default function SmartLink({ href, children, className }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    if (href === pathname) return // Prevent navigating to the same route

    const toastId = toast.loading('Working on it...')

    startTransition(() => {
      router.push(href)
    })

    // Optional: Dismiss toast after a short delay
    setTimeout(() => {
      toast.dismiss(toastId)
    }, 1000)
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
