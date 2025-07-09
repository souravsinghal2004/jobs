
import React from 'react'
import Image from 'next/image'

import SmartLink from './SmartLink'

import { Button } from './ui/button'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { checkUser } from '@/lib/check-user'
import {
  Home,
  Briefcase,
  FileText,
  LayoutDashboard,
  LogIn,
} from 'lucide-react'

const Header = async () => {
  const user = await checkUser()
  const isAdmin = user?.role === 'ADMIN'

  return (
    <header className="bg-zinc-900 text-white shadow-md sticky top-0 z-50 border-b border-zinc-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <SmartLink href="/" className="flex items-center gap-3">
          <Image src="/logo.jpg" width={40} height={40} alt="Logo" className="rounded-full" />
          <span className="text-lg font-semibold tracking-wide hidden sm:inline">JobSphere</span>
        </SmartLink>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <SmartLink
           href="/" className="hover:text-blue-400 transition flex items-center gap-1">
            <Home size={18} />
            Home
          </SmartLink>

          <SmartLink href="/jobsss" className="hover:text-blue-400 transition flex items-center gap-1">
            <Briefcase size={18} />
            Jobs
          </SmartLink>

          <SmartLink href="/internship" className="hover:text-blue-400 transition flex items-center gap-1">
            <FileText size={18} />
            Internships
          </SmartLink>

          <SignedIn>
            <SmartLink href="/applications" className="hover:text-blue-400 transition flex items-center gap-1">
              <LayoutDashboard size={18} />
              Applications
            </SmartLink>
          </SignedIn>

          {isAdmin && (
            <SmartLink href="/admin" className="text-red-400 hover:underline">
              Admin Panel
            </SmartLink>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton forceRedirectUrl="/">
              <Button variant="secondary" className="flex items-center gap-1">
                <LogIn size={16} />
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}

export default Header
