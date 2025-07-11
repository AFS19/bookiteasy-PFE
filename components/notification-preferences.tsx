"use client"

import { useState } from "react"
import { Bell, Mail, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function NotificationPreferences() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [preferences, setPreferences] = useState({
    emailReminders: true,
    smsReminders: false,
    emailConfirmations: true,
    smsConfirmations: false,
    marketingEmails: false,
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = () => {
    // This is a demo - in a real application, this would save to a backend
    console.log("Saving preferences:", { email, phone, preferences })
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-[#008080]" />
          Notification Preferences
        </CardTitle>
        <CardDescription>
          Manage how and when you receive notifications about your appointments (Demo Only - Email will not be sent)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {showSuccess && (
          <Alert className="bg-green-50 border-green-200">
            <Bell className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800 font-semibold">Preferences Updated</AlertTitle>
            <AlertDescription className="text-green-700">
              Your notification preferences have been successfully updated. (Demo only - no actual emails will be sent)
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <h3 className="font-medium">Contact Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#008080]" />
                Email Address (Demo Only)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#008080]" />
                Phone Number (for SMS - Demo Only)
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Email Notifications (Demo Only)</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailReminders" className="cursor-pointer">
                Appointment Reminders
                <p className="text-sm text-gray-500">Receive reminders 24 hours before your appointment</p>
              </Label>
              <Switch
                id="emailReminders"
                checked={preferences.emailReminders}
                onCheckedChange={() => handleToggle("emailReminders")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="emailConfirmations" className="cursor-pointer">
                Booking Confirmations
                <p className="text-sm text-gray-500">Receive confirmation emails when you book or reschedule</p>
              </Label>
              <Switch
                id="emailConfirmations"
                checked={preferences.emailConfirmations}
                onCheckedChange={() => handleToggle("emailConfirmations")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="marketingEmails" className="cursor-pointer">
                Marketing & Promotions
                <p className="text-sm text-gray-500">Receive special offers and promotions</p>
              </Label>
              <Switch
                id="marketingEmails"
                checked={preferences.marketingEmails}
                onCheckedChange={() => handleToggle("marketingEmails")}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">SMS Notifications (Demo Only)</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="smsReminders" className="cursor-pointer">
                Appointment Reminders
                <p className="text-sm text-gray-500">Receive SMS reminders 2 hours before your appointment</p>
              </Label>
              <Switch
                id="smsReminders"
                checked={preferences.smsReminders}
                onCheckedChange={() => handleToggle("smsReminders")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="smsConfirmations" className="cursor-pointer">
                Booking Confirmations
                <p className="text-sm text-gray-500">Receive SMS confirmations when you book or reschedule</p>
              </Label>
              <Switch
                id="smsConfirmations"
                checked={preferences.smsConfirmations}
                onCheckedChange={() => handleToggle("smsConfirmations")}
              />
            </div>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full bg-[#FF7F50] hover:bg-[#FF6347] text-white">
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  )
}
