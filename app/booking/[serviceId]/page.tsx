"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Star,
  Shield,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Enhanced service data
const serviceData = {
  haircut: {
    id: "haircut",
    name: "Haircut & Styling",
    description: "Professional haircut and styling services for all hair types. Includes wash, cut, and basic styling.",
    duration: "45 min",
    price: "$35",
    originalPrice: "$45",
    rating: 4.9,
    reviews: 1250,
    features: ["Wash included", "Professional styling", "Hair consultation"],
    category: "Hair",
  },
  massage: {
    id: "massage",
    name: "Therapeutic Massage",
    description:
      "Relaxing massage therapy to relieve stress and muscle tension. Perfect for unwinding after a long day.",
    duration: "60 min",
    price: "$75",
    originalPrice: "$85",
    rating: 4.8,
    reviews: 890,
    features: ["Deep tissue", "Stress relief", "Muscle recovery"],
    category: "Wellness",
  },
  facial: {
    id: "facial",
    name: "Facial Treatment",
    description: "Rejuvenating facial treatment for healthy, glowing skin. Customized to your skin type and needs.",
    duration: "50 min",
    price: "$65",
    originalPrice: "$75",
    rating: 4.7,
    reviews: 670,
    features: ["Skin analysis", "Custom treatment", "Moisturizing"],
    category: "Beauty",
  },
}

// Enhanced staff data
const staffMembers = [
  { id: "staff1", name: "Alex Johnson", role: "Senior Stylist", rating: 4.9, experience: "8 years", avatar: "AJ" },
  { id: "staff2", name: "Jamie Smith", role: "Massage Therapist", rating: 4.8, experience: "6 years", avatar: "JS" },
  { id: "staff3", name: "Taylor Wilson", role: "Esthetician", rating: 4.7, experience: "5 years", avatar: "TW" },
]

// Generate time slots for the next 7 days
const generateTimeSlots = () => {
  const days = []
  const today = new Date()

  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
    const monthDay = date.toLocaleDateString("en-US", { month: "short", day: "numeric" })

    // Generate available slots
    const slots = []
    const startHour = 9
    const endHour = 17

    for (let hour = startHour; hour <= endHour; hour++) {
      for (const minute of [0, 30]) {
        // Randomly determine if slot is available (70% chance)
        const isAvailable = Math.random() < 0.7

        if (isAvailable) {
          const timeString = `${hour}:${minute === 0 ? "00" : minute}`
          slots.push({
            time: timeString,
            available: true,
          })
        }
      }
    }

    days.push({
      date: date,
      dayName,
      monthDay,
      slots,
    })
  }

  return days
}

export default function BookingPage({ params }: { params: { serviceId: string } }) {
  const router = useRouter()
  const [selectedStaff, setSelectedStaff] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
    receiveEmails: true,
  })

  // Get service data safely with fallback
  const getServiceData = () => {
    const service = serviceData[params.serviceId as keyof typeof serviceData]
    if (!service) {
      return {
        id: "default",
        name: "Default Service",
        description: "This is a default service.",
        duration: "30 min",
        price: "$25",
        originalPrice: "$30",
        rating: 4.5,
        reviews: 100,
        features: ["Professional service"],
        category: "General",
      }
    }
    return service
  }

  const service = getServiceData()
  const timeSlots = generateTimeSlots()

  // Find the index of the selected date in the timeSlots array
  const selectedDateIndex = timeSlots.findIndex((day) => day.date.toDateString() === selectedDate.toDateString())

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
    setSelectedSlot(null)
  }

  const handleSlotSelect = (time: string) => {
    setSelectedSlot(time)
    setErrors((prev) => ({ ...prev, slot: "" }))
  }

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!selectedSlot) {
      newErrors.slot = "Please select a time slot"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    }
  }

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, receiveEmails: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep2()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create new appointment data
      const newAppointment = {
        id: `apt${Date.now()}`,
        service: service.name,
        date: selectedDate.toISOString().split("T")[0],
        time: selectedSlot,
        staff: selectedStaff
          ? staffMembers.find((s) => s.id === selectedStaff)?.name || "Any Available Staff"
          : "Any Available Staff",
        status: "upcoming",
        price: service.price,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        notes: formData.notes,
      }

      console.log("Booking submitted:", newAppointment)

      // Store the new appointment in localStorage for demo purposes
      const existingAppointments = JSON.parse(localStorage.getItem("appointments") || "[]")
      existingAppointments.push(newAppointment)
      localStorage.setItem("appointments", JSON.stringify(existingAppointments))

      // Store success message for flash message
      localStorage.setItem(
        "bookingSuccess",
        JSON.stringify({
          message: `Your ${service.name} appointment has been successfully booked!`,
          appointmentId: newAppointment.id,
          date: selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          time: selectedSlot,
        }),
      )

      // Navigate to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Booking failed:", error)
      setErrors({ submit: "Failed to submit booking. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const progressPercentage = currentStep === 1 ? 50 : 100

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
        </div>
      </header>

      <main className="flex-1 bg-gradient-to-br from-[#F8FFFE] to-[#F0F9FF] py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/services"
              className="inline-flex items-center text-[#008080] hover:text-[#008080]/80 transition-colors mb-6 font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Link>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.name}</h1>
                  <p className="text-gray-600">{service.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#008080]">{service.price}</div>
                    <div className="text-sm text-gray-400 line-through">{service.originalPrice}</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{service.rating}</span>
                    </div>
                    <div className="text-sm text-gray-500">{service.reviews} reviews</div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Booking Progress</span>
                  <span className="text-sm text-gray-500">Step {currentStep} of 2</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              {/* Step Indicators */}
              <div className="flex items-center justify-center gap-8 mb-8">
                <div className={`flex items-center gap-2 ${currentStep >= 1 ? "text-[#008080]" : "text-gray-400"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-[#008080] text-white" : "bg-gray-200"}`}
                  >
                    {currentStep > 1 ? <CheckCircle2 className="h-5 w-5" /> : "1"}
                  </div>
                  <span className="font-medium">Select Time</span>
                </div>
                <div className="w-12 h-px bg-gray-300"></div>
                <div className={`flex items-center gap-2 ${currentStep >= 2 ? "text-[#008080]" : "text-gray-400"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-[#008080] text-white" : "bg-gray-200"}`}
                  >
                    2
                  </div>
                  <span className="font-medium">Your Details</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {currentStep === 1 ? (
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-[#008080]" />
                      Select Date & Time
                    </CardTitle>
                    <CardDescription>Choose your preferred appointment slot</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Staff Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-4">Select Staff Member (Optional)</label>
                      <div className="grid gap-3">
                        <div
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedStaff === "" ? "border-[#008080] bg-[#008080]/5" : "border-gray-200 hover:border-gray-300"}`}
                          onClick={() => setSelectedStaff("")}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-[#008080] to-[#20B2AA] rounded-full flex items-center justify-center text-white font-semibold">
                              ?
                            </div>
                            <div>
                              <div className="font-medium">Any Available Staff</div>
                              <div className="text-sm text-gray-500">We'll assign the best available professional</div>
                            </div>
                          </div>
                        </div>

                        {staffMembers.map((staff) => (
                          <div
                            key={staff.id}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedStaff === staff.id ? "border-[#008080] bg-[#008080]/5" : "border-gray-200 hover:border-gray-300"}`}
                            onClick={() => setSelectedStaff(staff.id)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-[#008080] to-[#20B2AA] rounded-full flex items-center justify-center text-white font-semibold">
                                {staff.avatar}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{staff.name}</span>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs text-gray-600">{staff.rating}</span>
                                  </div>
                                </div>
                                <div className="text-sm text-gray-500">
                                  {staff.role} • {staff.experience} experience
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Date Selection */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Select Date</h3>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const newDate = new Date(selectedDate)
                              newDate.setDate(selectedDate.getDate() - 1)
                              handleDateChange(newDate)
                            }}
                            disabled={selectedDateIndex <= 0}
                            className="h-8 w-8"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const newDate = new Date(selectedDate)
                              newDate.setDate(selectedDate.getDate() + 1)
                              handleDateChange(newDate)
                            }}
                            disabled={selectedDateIndex >= timeSlots.length - 1}
                            className="h-8 w-8"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-2 mb-6">
                        {timeSlots.map((day) => (
                          <Button
                            key={day.monthDay}
                            variant={day.date.toDateString() === selectedDate.toDateString() ? "default" : "outline"}
                            className={`flex flex-col h-auto py-3 ${
                              day.date.toDateString() === selectedDate.toDateString()
                                ? "bg-[#008080] hover:bg-[#008080]/90 text-white"
                                : "hover:border-[#008080] hover:text-[#008080]"
                            }`}
                            onClick={() => handleDateChange(day.date)}
                          >
                            <span className="text-xs font-medium">{day.dayName}</span>
                            <span className="text-sm font-bold">{day.monthDay}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Available Time Slots</h3>
                      {selectedDateIndex >= 0 && timeSlots[selectedDateIndex].slots.length > 0 ? (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                          {timeSlots[selectedDateIndex].slots.map((slot, index) => (
                            <Button
                              key={index}
                              variant={selectedSlot === slot.time ? "default" : "outline"}
                              className={`h-12 ${
                                selectedSlot === slot.time
                                  ? "bg-[#008080] hover:bg-[#008080]/90 text-white"
                                  : "hover:border-[#008080] hover:text-[#008080]"
                              }`}
                              onClick={() => handleSlotSelect(slot.time)}
                            >
                              {slot.time}
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <p>No available slots for this date.</p>
                          <p className="text-sm">Please select a different date.</p>
                        </div>
                      )}
                    </div>

                    {errors.slot && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-700">{errors.slot}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      className="w-full bg-gradient-to-r from-[#FF7F50] to-[#FF6347] hover:from-[#FF6347] hover:to-[#FF4500] text-white shadow-lg hover:shadow-xl transition-all duration-200 h-12 text-lg font-semibold"
                      disabled={!selectedSlot}
                      onClick={handleContinue}
                    >
                      Continue to Details
                      <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-[#008080]" />
                      Your Information
                    </CardTitle>
                    <CardDescription>Please provide your details to complete the booking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Enter your first name"
                            className={`${errors.firstName ? "border-red-300 focus:border-red-500" : "focus:border-[#008080]"}`}
                            required
                          />
                          {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Enter your last name"
                            className={`${errors.lastName ? "border-red-300 focus:border-red-500" : "focus:border-[#008080]"}`}
                            required
                          />
                          {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          className={`${errors.email ? "border-red-300 focus:border-red-500" : "focus:border-[#008080]"}`}
                          required
                        />
                        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          className={`${errors.phone ? "border-red-300 focus:border-red-500" : "focus:border-[#008080]"}`}
                          required
                        />
                        {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Special Requests (Optional)</Label>
                        <textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/20 transition-colors"
                          rows={3}
                          placeholder="Any special requests or notes for your appointment"
                        />
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="receiveEmails"
                          checked={formData.receiveEmails}
                          onCheckedChange={handleCheckboxChange}
                        />
                        <Label htmlFor="receiveEmails" className="text-sm font-normal leading-relaxed">
                          I would like to receive email notifications about my appointment and special offers (Demo only
                          - no actual emails will be sent)
                        </Label>
                      </div>

                      {errors.submit && (
                        <Alert className="border-red-200 bg-red-50">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <AlertDescription className="text-red-700">{errors.submit}</AlertDescription>
                        </Alert>
                      )}

                      <div className="flex gap-4 pt-4">
                        <Button
                          variant="outline"
                          onClick={handleBack}
                          type="button"
                          className="flex-1 h-12 border-[#008080] text-[#008080] hover:bg-[#008080] hover:text-white transition-all duration-200"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>
                        <Button
                          className="flex-1 bg-gradient-to-r from-[#FF7F50] to-[#FF6347] hover:from-[#FF6347] hover:to-[#FF4500] text-white shadow-lg hover:shadow-xl transition-all duration-200 h-12 text-lg font-semibold"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Processing...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="mr-2 h-5 w-5" />
                              Confirm Booking
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Booking Summary Sidebar */}
            <div>
              <Card className="sticky top-8 shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-[#008080]/5 to-[#20B2AA]/5">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#008080]" />
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {/* Service Details */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#008080] to-[#20B2AA] rounded-lg flex items-center justify-center">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.duration}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {service.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {selectedSlot && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#FF7F50] to-[#FF6347] rounded-lg flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Date & Time</h4>
                          <p className="text-sm text-gray-600">
                            {selectedDate.toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-sm font-medium text-[#008080]">{selectedSlot}</p>
                        </div>
                      </div>
                    )}

                    {selectedStaff && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#20B2AA] to-[#48D1CC] rounded-lg flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Staff Member</h4>
                          <p className="text-sm text-gray-600">
                            {staffMembers.find((staff) => staff.id === selectedStaff)?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {staffMembers.find((staff) => staff.id === selectedStaff)?.role}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Service Price</span>
                      <span className="text-gray-400 line-through">{service.originalPrice}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Discounted Price</span>
                      <span className="font-semibold text-[#008080]">{service.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-[#008080]">{service.price}</span>
                    </div>
                    <div className="mt-2">
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        You save $
                        {Number.parseInt(service.originalPrice.slice(1)) - Number.parseInt(service.price.slice(1))}!
                      </Badge>
                    </div>
                  </div>

                  {/* Policies */}
                  <div className="border-t pt-4 space-y-3">
                    <h4 className="font-semibold text-gray-900">Booking Policies</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Free cancellation up to 24 hours before</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Easy rescheduling available</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Instant confirmation via email</span>
                      </div>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <Shield className="h-8 w-8 text-[#008080] mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Secure Booking</p>
                    <p className="text-xs text-gray-600">Your information is protected</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#008080] p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">BookItEasy</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Making appointment booking simple and efficient for everyone.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { href: "/", label: "Home" },
                  { href: "/services", label: "Services" },
                  { href: "/about", label: "About Us" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                {[
                  { href: "/faq", label: "FAQ" },
                  { href: "/help", label: "Help Center" },
                  { href: "/terms", label: "Terms of Service" },
                  { href: "/privacy", label: "Privacy Policy" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3 text-gray-400">
                <p>Email: info@bookiteasy.com</p>
                <p>Phone: (123) 456-7890</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} BookItEasy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
