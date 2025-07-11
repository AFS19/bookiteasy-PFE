"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Clock, Lock, Mail, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth-provider"
import { UserMenu } from "@/components/user-menu"

export default function SignInPage() {
  const router = useRouter()
  const { login, register, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("signin")
  const [error, setError] = useState("")

  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  })

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSigninChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSigninData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignupData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!signinData.email || !signinData.password) {
      setError("Please fill in all fields")
      return
    }

    try {
      const result = await login(signinData.email, signinData.password)

      if (result.success) {
        router.push("/dashboard")
      } else {
        setError(result.error || "Login failed")
      }
    } catch (error) {
      setError("An unexpected error occurred")
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!signupData.name || !signupData.email || !signupData.password || !signupData.confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (signupData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    try {
      const result = await register(signupData.name, signupData.email, signupData.password)

      if (result.success) {
        router.push("/dashboard")
      } else {
        setError(result.error || "Registration failed")
      }
    } catch (error) {
      setError("An unexpected error occurred")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-[#008080] to-[#20B2AA] text-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Clock className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold">BookItEasy</h1>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-white/80 transition-colors font-medium">
              Home
            </Link>
            <Link href="/services" className="hover:text-white/80 transition-colors font-medium">
              Services
            </Link>
            <Link href="/how-it-works" className="hover:text-white/80 transition-colors font-medium">
              How It Works
            </Link>
            <Link href="/about" className="hover:text-white/80 transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="hover:text-white/80 transition-colors font-medium">
              Contact
            </Link>
          </nav>
          <UserMenu />
        </div>
      </header>

      <main className="flex-1 bg-[#F0F0F0] py-12">
        <div className="container mx-auto px-4 max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Welcome to BookItEasy</CardTitle>
              <CardDescription className="text-center">
                Sign in to your account or create a new one to manage your appointments
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              {error && (
                <Alert className="mb-4 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Create Account</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={handleSignin} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signin-email"
                          name="email"
                          type="email"
                          placeholder="example@email.com"
                          className="pl-10"
                          required
                          value={signinData.email}
                          onChange={handleSigninChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="signin-password">Password</Label>
                        <Link href="/auth/forgot-password" className="text-xs text-[#008080] hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signin-password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          required
                          value={signinData.password}
                          onChange={handleSigninChange}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-[#008080] hover:bg-[#008080]/90" disabled={isLoading}>
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>

                    <div className="text-center text-sm text-gray-500">
                      <p>For demo purposes, any email and password will work</p>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        value={signupData.name}
                        onChange={handleSignupChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-email"
                          name="email"
                          type="email"
                          placeholder="example@email.com"
                          className="pl-10"
                          required
                          value={signupData.email}
                          onChange={handleSignupChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          required
                          value={signupData.password}
                          onChange={handleSignupChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirm-password"
                          name="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          required
                          value={signupData.confirmPassword}
                          onChange={handleSignupChange}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-[#FF7F50] hover:bg-[#FF6347]" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>

                    <div className="text-center text-sm text-gray-500">
                      <p>For demo purposes, any information will create an account</p>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="text-center text-sm text-gray-500 mt-2">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="text-[#008080] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#008080] hover:underline">
                  Privacy Policy
                </Link>
                .
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">BookItEasy</h3>
              <p className="text-gray-300">Making appointment booking simple and efficient for everyone.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-300 hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-gray-300 hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-gray-300 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-300 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300">Email: info@bookiteasy.com</p>
              <p className="text-gray-300">Phone: (123) 456-7890</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} BookItEasy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
