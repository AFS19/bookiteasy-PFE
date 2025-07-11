"use client"

import Link from "next/link"
import { Calendar, Clock, Users, CheckCircle, Star, ArrowRight, Zap, Shield, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserMenu } from "@/components/user-menu"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-[#008080] to-[#20B2AA] text-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Clock className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold">BookItEasy</h1>
          </div>

          {/* Desktop Navigation */}
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#F8FFFE] via-[#F0F9FF] to-[#EFF6FF] py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-[#008080]/10 text-[#008080] border-[#008080]/20 px-4 py-2">
                    ✨ Trusted by 10,000+ customers
                  </Badge>
                  <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                    Book Your
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008080] to-[#20B2AA]">
                      {" "}
                      Perfect{" "}
                    </span>
                    Appointment
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Schedule services, manage appointments, and receive confirmations all in one place. BookItEasy makes
                    scheduling simple, fast, and reliable.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/services">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#FF7F50] to-[#FF6347] hover:from-[#FF6347] hover:to-[#FF4500] text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-4 text-lg font-semibold w-full sm:w-auto"
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Book Now
                    </Button>
                  </Link>
                  <Link href="/how-it-works">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-[#008080] text-[#008080] hover:bg-[#008080] hover:text-white transition-all duration-200 px-8 py-4 text-lg font-semibold w-full sm:w-auto"
                    >
                      <ArrowRight className="mr-2 h-5 w-5" />
                      How It Works
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-8 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gradient-to-r from-[#008080] to-[#20B2AA] border-2 border-white"
                        ></div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">10,000+ happy customers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-600 font-medium ml-1">4.9/5 rating</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#FF7F50] to-[#FF6347] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Live Demo
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#008080] to-[#20B2AA] rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Quick Booking</h3>
                        <p className="text-gray-600 text-sm">Book in under 2 minutes</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {["Mon", "Tue", "Wed"].map((day) => (
                          <div key={day} className="text-center p-2 bg-white rounded border text-sm font-medium">
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button size="sm" className="bg-[#008080] hover:bg-[#008080]/90 text-white">
                          9:00 AM
                        </Button>
                        <Button size="sm" variant="outline">
                          10:30 AM
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-[#008080] to-[#20B2AA] text-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-semibold">Instant Confirmation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose BookItEasy?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience the future of appointment booking with our powerful, yet simple platform
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-[#008080] to-[#20B2AA] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">Lightning Fast</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 leading-relaxed">
                    Book your appointment in under 2 minutes. Our streamlined process eliminates unnecessary steps and
                    gets you scheduled quickly.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-[#FF7F50] to-[#FF6347] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">Real-Time Availability</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 leading-relaxed">
                    See live availability and book instantly. No more phone calls or waiting for confirmations -
                    everything happens in real-time.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-[#20B2AA] to-[#48D1CC] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">100% Reliable</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 leading-relaxed">
                    Never miss an appointment again. Get instant confirmations, smart reminders, and easy rescheduling
                    options.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gradient-to-br from-[#F8FFFE] to-[#F0F9FF]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600">Simple steps to your perfect appointment</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Users, title: "Choose Service", desc: "Browse our range of professional services" },
                { icon: Calendar, title: "Pick Date & Time", desc: "Select from available time slots" },
                { icon: Clock, title: "Enter Details", desc: "Provide your information quickly" },
                { icon: CheckCircle, title: "Get Confirmed", desc: "Receive instant confirmation" },
              ].map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="mx-auto mb-6 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-[#008080]/20">
                    <step.icon className="h-8 w-8 text-[#008080]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-gray-600">{step.desc}</p>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full">
                      <ArrowRight className="h-6 w-6 text-[#008080]/30 mx-auto" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#008080] to-[#20B2AA] text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl mb-8 text-white/90">
                Join thousands of satisfied customers who trust BookItEasy for their scheduling needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services">
                  <Button
                    size="lg"
                    className="bg-white text-[#008080] hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-4 text-lg font-semibold"
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Start Booking Now
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="border-2 border-white text-[#008080] bg-white hover:bg-white/20 hover:text-white hover:border-white transition-all duration-200 px-8 py-4 text-lg font-semibold"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
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
                Making appointment booking simple and efficient for everyone. Trusted by thousands of businesses
                worldwide.
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
                <p>Available 24/7 for support</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} BookItEasy. All rights reserved. Made with ❤️ for better scheduling.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
