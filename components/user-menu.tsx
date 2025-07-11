"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, LogOut, Settings, Calendar, ChevronDown } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { ThemeToggle } from "@/components/theme-toggle"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function UserMenu() {
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    logout()
    router.push("/")
    setIsLoggingOut(false)
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <Button
            variant="outline"
            className="text-white border-white/30 bg-green-600 hover:bg-green-700 transition-all duration-200"
          >
            My Appointments
          </Button>
        </Link>
        <Link href="/auth/signin">
          <Button className="bg-[#FF7F50] hover:bg-[#FF6347] text-white shadow-lg hover:shadow-xl transition-all duration-200">
            Sign In
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <Link href="/dashboard">
        <Button
          variant="outline"
          className="text-white border-white/30 bg-green-600 hover:bg-green-700 transition-all duration-200"
        >
          <Calendar className="h-4 w-4 mr-2" />
          My Appointments
        </Button>
      </Link>

      <ThemeToggle />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-white hover:bg-white/10 transition-all duration-200"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-white/20 text-white text-sm font-semibold">
                {user.avatar || user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:block font-medium">{user.name}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              My Appointments
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Profile Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut} className="text-red-600 focus:text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            {isLoggingOut ? "Signing out..." : "Sign out"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
