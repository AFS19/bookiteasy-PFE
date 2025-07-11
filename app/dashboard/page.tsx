"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bell, Calendar, Clock, Edit, X, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RescheduleModal } from "@/components/reschedule-modal"
import { NotificationPreferences } from "@/components/notification-preferences"
import { ProtectedRoute } from "@/components/protected-route"
import { UserMenu } from "@/components/user-menu"
import { useAuth } from "@/components/auth-provider"

// Mock data for appointments
const defaultAppointments = [
  {
    id: "apt1",
    service: "Haircut & Styling",
    date: "2025-04-20",
    time: "10:00",
    staff: "Alex Johnson",
    status: "upcoming",
    price: "$35",
  },
  {
    id: "apt2",
    service: "Therapeutic Massage",
    date: "2025-04-25",
    time: "14:30",
    staff: "Jamie Smith",
    status: "upcoming",
    price: "$75",
  },
  {
    id: "apt3",
    service: "Facial Treatment",
    date: "2025-03-15",
    time: "11:00",
    staff: "Taylor Wilson",
    status: "completed",
    price: "$65",
  },
  {
    id: "apt4",
    service: "Haircut & Styling",
    date: "2025-03-05",
    time: "09:30",
    staff: "Alex Johnson",
    status: "completed",
    price: "$35",
  },
  {
    id: "apt5",
    service: "Therapeutic Massage",
    date: "2025-03-01",
    time: "16:00",
    staff: "Jamie Smith",
    status: "cancelled",
    price: "$75",
  },
]

function DashboardContent() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("upcoming")
  const [localAppointments, setLocalAppointments] = useState(defaultAppointments)
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [successMessage, setSuccessMessage] = useState<any>(null)

  // Check for success message on component mount
  useEffect(() => {
    const bookingSuccess = localStorage.getItem("bookingSuccess")
    if (bookingSuccess) {
      const successData = JSON.parse(bookingSuccess)
      setSuccessMessage(successData)
      localStorage.removeItem("bookingSuccess") // Clear the message after showing it

      // Load new appointments from localStorage
      const storedAppointments = localStorage.getItem("appointments")
      if (storedAppointments) {
        const newAppointments = JSON.parse(storedAppointments)
        setLocalAppointments([...defaultAppointments, ...newAppointments])
      }
    }
  }, [])

  // Auto-hide success message after 10 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

  const filteredAppointments = localAppointments.filter((apt) => {
    if (activeTab === "upcoming") return apt.status === "upcoming"
    if (activeTab === "completed") return apt.status === "completed"
    if (activeTab === "cancelled") return apt.status === "cancelled"
    return true
  })

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const handleReschedule = (appointmentId: string) => {
    setSelectedAppointment(appointmentId)
    setIsRescheduleModalOpen(true)
  }

  const handleCancelAppointment = (appointmentId: string) => {
    setLocalAppointments(
      localAppointments.map((apt) => (apt.id === appointmentId ? { ...apt, status: "cancelled" } : apt)),
    )
  }

  const handleConfirmReschedule = (appointmentId: string, newDate: Date, newTime: string) => {
    setLocalAppointments(
      localAppointments.map((apt) =>
        apt.id === appointmentId
          ? {
              ...apt,
              date: newDate.toISOString().split("T")[0],
              time: newTime,
            }
          : apt,
      ),
    )
  }

  const selectedAppointmentDetails = localAppointments.find((apt) => apt.id === selectedAppointment) || {
    service: "",
    date: "",
    time: "",
    staff: "",
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
        <div className="container mx-auto px-4">
          {/* Success Message */}
          {successMessage && (
            <div className="mb-8">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <AlertTitle className="text-green-800 font-semibold">Booking Confirmed!</AlertTitle>
                <AlertDescription className="text-green-700">
                  {successMessage.message}
                  <br />
                  <span className="font-medium">
                    {successMessage.date} at {successMessage.time}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-4 text-green-700 hover:text-green-800"
                    onClick={() => setSuccessMessage(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </AlertDescription>
              </Alert>
            </div>
          )}

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#008080] mb-4">Welcome back, {user?.name || "User"}!</h1>
            <p className="text-gray-600 max-w-3xl">
              View and manage all your appointments. You can reschedule or cancel upcoming appointments.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-4 w-4" />
                Notification Preferences
              </Button>
            </div>

            {showNotifications && (
              <div className="mb-6">
                <NotificationPreferences />
              </div>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Your Appointments</CardTitle>
                  <CardDescription>View and manage your scheduled appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <TabsContent value="upcoming">
                    {filteredAppointments.length > 0 ? (
                      <div className="rounded-md border">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] divide-y">
                          {filteredAppointments.map((appointment) => (
                            <div
                              key={appointment.id}
                              className="p-4 md:grid md:grid-cols-[1fr_auto] md:gap-4 md:items-center"
                            >
                              <div className="grid gap-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">{appointment.service}</h3>
                                  {appointment.status === "upcoming" && (
                                    <Badge className="bg-green-500">Upcoming</Badge>
                                  )}
                                  {appointment.status === "completed" && (
                                    <Badge className="bg-gray-500">Completed</Badge>
                                  )}
                                  {appointment.status === "cancelled" && (
                                    <Badge className="bg-red-500">Cancelled</Badge>
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatDate(appointment.date)}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{appointment.time}</span>
                                  </div>
                                  <div>
                                    <span>with {appointment.staff}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-[#008080]">{appointment.price}</span>
                                  </div>
                                </div>
                              </div>

                              {appointment.status === "upcoming" && (
                                <div className="flex items-center gap-2 mt-4 md:mt-0">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-[#008080] border-[#008080]"
                                    onClick={() => handleReschedule(appointment.id)}
                                  >
                                    <Edit className="h-4 w-4 mr-1" />
                                    Reschedule
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500 border-red-500"
                                    onClick={() => handleCancelAppointment(appointment.id)}
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Cancel
                                  </Button>
                                </div>
                              )}

                              {(appointment.status === "completed" || appointment.status === "cancelled") && (
                                <div className="flex items-center gap-2 mt-4 md:mt-0">
                                  <Button variant="outline" size="sm">
                                    Book Again
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">No upcoming appointments found.</p>
                        <Link href="/services">
                          <Button className="bg-[#FF7F50] hover:bg-[#FF6347] text-white">Book an Appointment</Button>
                        </Link>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="completed">
                    {filteredAppointments.length > 0 ? (
                      <div className="rounded-md border">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] divide-y">
                          {filteredAppointments.map((appointment) => (
                            <div
                              key={appointment.id}
                              className="p-4 md:grid md:grid-cols-[1fr_auto] md:gap-4 md:items-center"
                            >
                              <div className="grid gap-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">{appointment.service}</h3>
                                  <Badge className="bg-gray-500">Completed</Badge>
                                </div>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatDate(appointment.date)}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{appointment.time}</span>
                                  </div>
                                  <div>
                                    <span>with {appointment.staff}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-[#008080]">{appointment.price}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mt-4 md:mt-0">
                                <Button variant="outline" size="sm">
                                  Book Again
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">No completed appointments found.</p>
                        <Link href="/services">
                          <Button className="bg-[#FF7F50] hover:bg-[#FF6347] text-white">Book an Appointment</Button>
                        </Link>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="cancelled">
                    {filteredAppointments.length > 0 ? (
                      <div className="rounded-md border">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] divide-y">
                          {filteredAppointments.map((appointment) => (
                            <div
                              key={appointment.id}
                              className="p-4 md:grid md:grid-cols-[1fr_auto] md:gap-4 md:items-center"
                            >
                              <div className="grid gap-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">{appointment.service}</h3>
                                  <Badge className="bg-red-500">Cancelled</Badge>
                                </div>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatDate(appointment.date)}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{appointment.time}</span>
                                  </div>
                                  <div>
                                    <span>with {appointment.staff}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-[#008080]">{appointment.price}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mt-4 md:mt-0">
                                <Button variant="outline" size="sm">
                                  Book Again
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">No cancelled appointments found.</p>
                        <Link href="/services">
                          <Button className="bg-[#FF7F50] hover:bg-[#FF6347] text-white">Book an Appointment</Button>
                        </Link>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="all">
                    {localAppointments.length > 0 ? (
                      <div className="rounded-md border">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] divide-y">
                          {localAppointments.map((appointment) => (
                            <div
                              key={appointment.id}
                              className="p-4 md:grid md:grid-cols-[1fr_auto] md:gap-4 md:items-center"
                            >
                              <div className="grid gap-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">{appointment.service}</h3>
                                  {appointment.status === "upcoming" && (
                                    <Badge className="bg-green-500">Upcoming</Badge>
                                  )}
                                  {appointment.status === "completed" && (
                                    <Badge className="bg-gray-500">Completed</Badge>
                                  )}
                                  {appointment.status === "cancelled" && (
                                    <Badge className="bg-red-500">Cancelled</Badge>
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatDate(appointment.date)}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{appointment.time}</span>
                                  </div>
                                  <div>
                                    <span>with {appointment.staff}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-[#008080]">{appointment.price}</span>
                                  </div>
                                </div>
                              </div>

                              {appointment.status === "upcoming" && (
                                <div className="flex items-center gap-2 mt-4 md:mt-0">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-[#008080] border-[#008080]"
                                    onClick={() => handleReschedule(appointment.id)}
                                  >
                                    <Edit className="h-4 w-4 mr-1" />
                                    Reschedule
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500 border-red-500"
                                    onClick={() => handleCancelAppointment(appointment.id)}
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Cancel
                                  </Button>
                                </div>
                              )}

                              {(appointment.status === "completed" || appointment.status === "cancelled") && (
                                <div className="flex items-center gap-2 mt-4 md:mt-0">
                                  <Button variant="outline" size="sm">
                                    Book Again
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">No appointments found.</p>
                        <Link href="/services">
                          <Button className="bg-[#FF7F50] hover:bg-[#FF6347] text-white">Book an Appointment</Button>
                        </Link>
                      </div>
                    )}
                  </TabsContent>
                </CardContent>
              </Card>
            </Tabs>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <Link href="/services">
                    <Button className="w-full bg-[#FF7F50] hover:bg-[#FF6347] text-white">Book New Appointment</Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    View Past Receipts
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <p className="text-sm text-gray-500">
                    If you need assistance with your appointments or have any questions, our support team is here to
                    help.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Link href="/contact">
                      <Button variant="outline" className="w-full">
                        Contact Support
                      </Button>
                    </Link>
                    <Link href="/faq">
                      <Button variant="outline" className="w-full">
                        View FAQ
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
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

      {/* Reschedule Modal */}
      {selectedAppointment && (
        <RescheduleModal
          isOpen={isRescheduleModalOpen}
          onClose={() => setIsRescheduleModalOpen(false)}
          appointmentId={selectedAppointment}
          appointmentDetails={selectedAppointmentDetails}
          onReschedule={handleConfirmReschedule}
        />
      )}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
