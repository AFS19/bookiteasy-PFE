"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Clock,
  Shield,
  Bell,
  Eye,
  Trash2,
  Download,
  Key,
  Smartphone,
  Moon,
  Sun,
  Monitor,
  AlertTriangle,
  CheckCircle,
  Mail,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/protected-route"
import { UserMenu } from "@/components/user-menu"
import { useAuth } from "@/components/auth-provider"
import { useTheme } from "next-themes"

function SettingsContent() {
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const [showSuccess, setShowSuccess] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    loginNotifications: true,
    sessionTimeout: "30",
  })

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "private",
    dataSharing: false,
    marketingEmails: true,
    analyticsTracking: false,
  })

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    appointmentReminders: true,
    promotionalEmails: false,
    weeklyDigest: true,
  })

  // Appearance Settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: theme || "system",
    language: "en",
    timezone: "UTC-5",
    dateFormat: "MM/DD/YYYY",
  })

  // Password Change
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleSecurityChange = (key: string, value: boolean | string) => {
    setSecuritySettings((prev) => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key: string, value: boolean | string) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleAppearanceChange = (key: string, value: string) => {
    if (key === "theme") {
      setTheme(value)
    }
    setAppearanceSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setShowSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    setIsLoading(false)
    setShowSuccess(true)

    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDeleteAccount = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Logout and redirect
    logout()
    window.location.href = "/"
  }

  const handleExportData = () => {
    // Simulate data export
    const userData = {
      profile: user,
      settings: {
        security: securitySettings,
        privacy: privacySettings,
        notifications: notificationSettings,
        appearance: appearanceSettings,
      },
      exportDate: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(userData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)

    const link = document.createElement("a")
    link.href = url
    link.download = `bookiteasy-data-${new Date().toISOString().split("T")[0]}.json`
    link.click()

    URL.revokeObjectURL(url)
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
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">Settings updated successfully!</AlertDescription>
            </Alert>
          )}

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#008080] mb-2">Account Settings</h1>
            <p className="text-gray-600">Manage your account preferences and security settings</p>
          </div>

          <Tabs defaultValue="security" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#008080]" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Manage your account security and authentication preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={securitySettings.twoFactorEnabled ? "default" : "secondary"}>
                        {securitySettings.twoFactorEnabled ? "Enabled" : "Disabled"}
                      </Badge>
                      <Switch
                        checked={securitySettings.twoFactorEnabled}
                        onCheckedChange={(checked) => handleSecurityChange("twoFactorEnabled", checked)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Login Notifications</Label>
                      <p className="text-sm text-gray-500">Get notified when someone signs into your account</p>
                    </div>
                    <Switch
                      checked={securitySettings.loginNotifications}
                      onCheckedChange={(checked) => handleSecurityChange("loginNotifications", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout</Label>
                    <Select
                      value={securitySettings.sessionTimeout}
                      onValueChange={(value) => handleSecurityChange("sessionTimeout", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Change Password */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-[#008080]" />
                    Change Password
                  </CardTitle>
                  <CardDescription>Update your password to keep your account secure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new password"
                    />
                  </div>

                  <Button
                    onClick={handleChangePassword}
                    disabled={isLoading || !passwordData.currentPassword || !passwordData.newPassword}
                    className="bg-[#008080] hover:bg-[#008080]/90"
                  >
                    {isLoading ? "Updating..." : "Update Password"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-[#008080]" />
                    Privacy Settings
                  </CardTitle>
                  <CardDescription>Control how your information is shared and used</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Profile Visibility</Label>
                    <Select
                      value={privacySettings.profileVisibility}
                      onValueChange={(value) => handlePrivacyChange("profileVisibility", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Data Sharing</Label>
                      <p className="text-sm text-gray-500">Allow us to share anonymized data for service improvement</p>
                    </div>
                    <Switch
                      checked={privacySettings.dataSharing}
                      onCheckedChange={(checked) => handlePrivacyChange("dataSharing", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Marketing Emails</Label>
                      <p className="text-sm text-gray-500">Receive emails about new features and promotions</p>
                    </div>
                    <Switch
                      checked={privacySettings.marketingEmails}
                      onCheckedChange={(checked) => handlePrivacyChange("marketingEmails", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Analytics Tracking</Label>
                      <p className="text-sm text-gray-500">Help us improve by tracking how you use our service</p>
                    </div>
                    <Switch
                      checked={privacySettings.analyticsTracking}
                      onCheckedChange={(checked) => handlePrivacyChange("analyticsTracking", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Data Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Export or delete your personal data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Export Your Data</h4>
                      <p className="text-sm text-gray-500">Download a copy of all your data</p>
                    </div>
                    <Button variant="outline" onClick={handleExportData}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                    <div>
                      <h4 className="font-medium text-red-900">Delete Account</h4>
                      <p className="text-sm text-red-700">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive" onClick={() => setShowDeleteConfirm(true)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>

                  {showDeleteConfirm && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-700">
                        <div className="space-y-3">
                          <p className="font-medium">Are you sure you want to delete your account?</p>
                          <p className="text-sm">
                            This action cannot be undone. All your data, appointments, and preferences will be
                            permanently deleted.
                          </p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="destructive" onClick={handleDeleteAccount} disabled={isLoading}>
                              {isLoading ? "Deleting..." : "Yes, Delete Account"}
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-[#008080]" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Choose how you want to be notified about appointments and updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Communication Channels</h4>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <div>
                          <Label className="text-base font-medium">Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-4 w-4 text-gray-500" />
                        <div>
                          <Label className="text-base font-medium">SMS Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications via text message</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("smsNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="h-4 w-4 text-gray-500" />
                        <div>
                          <Label className="text-base font-medium">Push Notifications</Label>
                          <p className="text-sm text-gray-500">Receive browser push notifications</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("pushNotifications", checked)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Notification Types</h4>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Appointment Reminders</Label>
                        <p className="text-sm text-gray-500">Get reminded about upcoming appointments</p>
                      </div>
                      <Switch
                        checked={notificationSettings.appointmentReminders}
                        onCheckedChange={(checked) => handleNotificationChange("appointmentReminders", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Promotional Emails</Label>
                        <p className="text-sm text-gray-500">Receive special offers and promotions</p>
                      </div>
                      <Switch
                        checked={notificationSettings.promotionalEmails}
                        onCheckedChange={(checked) => handleNotificationChange("promotionalEmails", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Weekly Digest</Label>
                        <p className="text-sm text-gray-500">Get a weekly summary of your activity</p>
                      </div>
                      <Switch
                        checked={notificationSettings.weeklyDigest}
                        onCheckedChange={(checked) => handleNotificationChange("weeklyDigest", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-[#008080]" />
                    Appearance & Localization
                  </CardTitle>
                  <CardDescription>Customize how the application looks and behaves</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select value={theme || "system"} onValueChange={(value) => handleAppearanceChange("theme", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            Light
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center gap-2">
                            <Moon className="h-4 w-4" />
                            Dark
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4" />
                            System
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select
                      value={appearanceSettings.language}
                      onValueChange={(value) => handleAppearanceChange("language", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="it">Italiano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select
                      value={appearanceSettings.timezone}
                      onValueChange={(value) => handleAppearanceChange("timezone", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                        <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                        <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="UTC+0">UTC</SelectItem>
                        <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <Select
                      value={appearanceSettings.dateFormat}
                      onValueChange={(value) => handleAppearanceChange("dateFormat", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        <SelectItem value="DD MMM YYYY">DD MMM YYYY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSaveSettings} disabled={isLoading} className="bg-[#FF7F50] hover:bg-[#FF6347]">
                {isLoading ? "Saving..." : "Save All Settings"}
              </Button>
            </div>
          </Tabs>
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

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  )
}
