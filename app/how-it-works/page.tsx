import Link from "next/link"
import { Calendar, Check, Clock, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Search,
      title: "Choose a Service",
      description:
        "Browse through our range of professional services and select the one that meets your needs. We offer various services including haircuts, massages, facials, and more.",
    },
    {
      icon: Calendar,
      title: "Select Date & Time",
      description:
        "View available time slots in real-time and pick the one that works best for your schedule. You can see availability up to 3 months in advance.",
    },
    {
      icon: User,
      title: "Enter Your Details",
      description:
        "Provide your contact information and any special requests you might have for your appointment. This helps us prepare for your visit.",
    },
    {
      icon: Check,
      title: "Confirm Booking",
      description:
        "Review your booking details and confirm your appointment. You'll receive an instant confirmation via email with all the details.",
    },
  ]

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

      <main className="flex-1">
        <section className="bg-[#F0F0F0] py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-[#008080] mb-6">How It Works</h1>
              <p className="text-lg text-gray-700">
                BookItEasy makes scheduling appointments simple and efficient. Follow these easy steps to book your next
                appointment.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
              <div>
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Booking Process Illustration"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-8">
                {steps.slice(0, 2).map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="bg-[#008080] rounded-full w-10 h-10 flex items-center justify-center shrink-0 mt-1">
                      <step.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#008080] mb-2">
                        Step {index + 1}: {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 space-y-8">
                {steps.slice(2, 4).map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="bg-[#008080] rounded-full w-10 h-10 flex items-center justify-center shrink-0 mt-1">
                      <step.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#008080] mb-2">
                        Step {index + 3}: {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-1 md:order-2">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Confirmation Process Illustration"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F0F0F0] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-[#008080] mb-6 text-center">Frequently Asked Questions</h2>
              <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">How far in advance can I book?</h3>
                  <p className="text-gray-600">
                    You can book appointments up to 3 months in advance, allowing you to secure your preferred time
                    slots.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Can I reschedule my appointment?</h3>
                  <p className="text-gray-600">
                    Yes, you can reschedule your appointment up to 24 hours before the scheduled time without any
                    charges.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">How do I receive confirmation?</h3>
                  <p className="text-gray-600">
                    You'll receive an immediate email confirmation once your booking is complete. You can also view all
                    your appointments in your dashboard.
                  </p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Link href="/faq">
                  <Button variant="outline" className="border-[#008080] text-[#008080] hover:bg-[#008080]/10">
                    View All FAQs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#008080] mb-6">Ready to Book Your Appointment?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience the simplicity of booking with BookItEasy. Our streamlined process ensures you can schedule
              your appointments in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button size="lg" className="bg-[#FF7F50] hover:bg-[#FF6347] text-white">
                  Book Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-[#008080] text-[#008080] hover:bg-[#008080]/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
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
