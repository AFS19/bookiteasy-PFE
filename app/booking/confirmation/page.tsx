"use client"

import Link from "next/link"
import { Calendar, Check, Clock, Download, Mail, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ConfirmationPage() {
  // In a real application, this would come from the booking process
  // For demo purposes, we're using mock data
  const bookingDetails = {
    id: "BK-12345",
    service: "Haircut & Styling",
    date: "Monday, April 20, 2025",
    time: "10:00 AM",
    staff: "Alex Johnson",
    price: "$35",
    email: "user@example.com",
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

      <main className="flex-1 bg-[#F0F0F0] py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Alert className="bg-green-50 border-green-200 mb-8">
            <Check className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800 font-semibold">Booking Confirmed!</AlertTitle>
            <AlertDescription className="text-green-700">
              Your appointment has been successfully booked. A confirmation email has been sent to{" "}
              {bookingDetails.email}.
            </AlertDescription>
          </Alert>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-[#008080]">Booking Details</CardTitle>
              <CardDescription>Reference ID: {bookingDetails.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[#008080] mt-0.5" />
                    <div>
                      <h4 className="font-medium">Service</h4>
                      <p>{bookingDetails.service}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-[#008080] mt-0.5" />
                    <div>
                      <h4 className="font-medium">Date & Time</h4>
                      <p>{bookingDetails.date}</p>
                      <p className="text-sm text-gray-500">{bookingDetails.time}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-[#008080] mt-0.5" />
                    <div>
                      <h4 className="font-medium">Contact</h4>
                      <p>{bookingDetails.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#008080] mt-0.5" />
                    <div>
                      <h4 className="font-medium">Price</h4>
                      <p className="font-semibold">{bookingDetails.price}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <h4 className="font-medium mb-3">What's Next?</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-1" />
                    <span>You'll receive a confirmation email with all the details.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-1" />
                    <span>You can view or manage this appointment from your dashboard.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-1" />
                    <span>If you need to reschedule, you can do so up to 24 hours before your appointment.</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="grid sm:grid-cols-2 gap-4">
            <Button className="bg-[#008080] hover:bg-[#008080]/90 text-white">
              <Calendar className="mr-2 h-4 w-4" />
              Add to Calendar
            </Button>
            <Button variant="outline" className="border-[#008080] text-[#008080] hover:bg-[#008080]/10">
              <Download className="mr-2 h-4 w-4" />
              Download Details
            </Button>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button variant="outline">View My Appointments</Button>
            </Link>
            <Link href="/services">
              <Button className="bg-[#FF7F50] hover:bg-[#FF6347] text-white">
                <Plus className="mr-2 h-4 w-4" />
                Book Another Service
              </Button>
            </Link>
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
