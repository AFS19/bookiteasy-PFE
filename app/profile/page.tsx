"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Clock, User, Mail, Phone, MapPin, Calendar, Camera, Save, Edit2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ProtectedRoute } from "@/components/protected-route"
import { UserMenu } from "@/components/user-menu"
import { useAuth } from "@/components/auth-provider"

function ProfileContent() {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    dateOfBirth: "",
    bio: "",
    preferences: {
      preferredStaff: "",
      preferredTime: "",
      specialRequests: "",
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name.startsWith("preferences.")) {
      const prefKey = name.split(".")[1]
      setProfileData((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefKey]: value,
        },
      }))
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update user in auth context
    if (user) {
      const updatedUser = {
        ...user,
        name: profileData.name,
        email: profileData.email,
      }
      updateUser(updatedUser)
    }

    setIsSaving(false)
    setIsEditing(false)
    setShowSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleCancel = () => {
    setProfileData({
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      address: "",
      dateOfBirth: "",
      bio: "",
      preferences: {
        preferredStaff: "",
        preferredTime: "",
        specialRequests: "",
      },
    })
    setIsEditing(false)
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
        <div className="container mx-auto px-4 max-w-4xl">
          {showSuccess && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <Save className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">Profile updated successfully!</AlertDescription>
            </Alert>
          )}

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#008080] mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and preferences</p>
          </div>

          <div className="grid gap-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="bg-gradient-to-r from-[#008080] to-[#20B2AA] text-white text-2xl font-bold">
                        {user?.avatar || user?.name?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-[#FF7F50] hover:bg-[#FF6347]"
                      disabled={!isEditing}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                    <p className="text-gray-600">{user?.email}</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                      <Badge className="bg-green-100 text-green-700 border-green-200">Active Member</Badge>
                      <Badge variant="outline">Since {new Date(user?.createdAt || "").getFullYear()}</Badge>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} className="bg-[#008080] hover:bg-[#008080]/90">
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                          Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={isSaving} className="bg-[#FF7F50] hover:bg-[#FF6347]">
                          {isSaving ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-[#008080]" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Your basic profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter your phone number"
                        className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="address"
                        name="address"
                        value={profileData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter your address"
                        className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#008080]" />
                    Booking Preferences
                  </CardTitle>
                  <CardDescription>Set your default preferences for appointments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="preferences.preferredStaff">Preferred Staff Member</Label>
                    <Input
                      id="preferences.preferredStaff"
                      name="preferences.preferredStaff"
                      value={profileData.preferences.preferredStaff}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="e.g., Alex Johnson"
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferences.preferredTime">Preferred Time</Label>
                    <Input
                      id="preferences.preferredTime"
                      name="preferences.preferredTime"
                      value={profileData.preferences.preferredTime}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="e.g., Morning (9AM-12PM)"
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferences.specialRequests">Special Requests</Label>
                    <Textarea
                      id="preferences.specialRequests"
                      name="preferences.specialRequests"
                      value={profileData.preferences.specialRequests}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Any special requirements or notes..."
                      rows={3}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bio Section */}
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
                <CardDescription>Tell us a bit about yourself (optional)</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Write a short bio about yourself..."
                  rows={4}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Link href="/dashboard">
                    <Button variant="outline" className="w-full">
                      View Appointments
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button variant="outline" className="w-full">
                      Book New Service
                    </Button>
                  </Link>
                  <Link href="/settings">
                    <Button variant="outline" className="w-full">
                      Account Settings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
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

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  )
}
