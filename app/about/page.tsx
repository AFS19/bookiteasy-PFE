import Link from "next/link"
import { Clock, Users, Calendar, Star, Shield, Award } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AboutPage() {
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
              <h1 className="text-4xl md:text-5xl font-bold text-[#008080] mb-6">About BookItEasy</h1>
              <p className="text-lg text-gray-700">
                We're on a mission to simplify appointment booking for businesses and their customers.
              </p>
            </div>
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-[#008080] opacity-10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 p-8 rounded-lg max-w-xl text-center">
                  <h2 className="text-2xl font-bold text-[#008080] mb-4">Simplifying Scheduling Since 2020</h2>
                  <p className="text-gray-700">
                    BookItEasy was founded with a simple goal: to make appointment booking hassle-free for everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#008080] mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    BookItEasy was born out of frustration with complicated scheduling systems that wasted time and
                    created confusion. Our founders, having experienced the pain of missed appointments and double
                    bookings, set out to create a solution that would benefit both service providers and their clients.
                  </p>
                  <p>
                    Starting with a small team of developers and UX designers, we built our platform with a focus on
                    simplicity and reliability. Today, BookItEasy serves thousands of businesses across multiple
                    industries, helping them manage their appointments efficiently while providing their customers with
                    a seamless booking experience.
                  </p>
                  <p>
                    Our commitment to continuous improvement means we're always enhancing our platform based on user
                    feedback and emerging technologies, ensuring BookItEasy remains the most intuitive appointment
                    booking solution available.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F0F0F0] p-6 rounded-lg text-center">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-[#008080]" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">10,000+</h3>
                  <p className="text-sm text-gray-600">Active Users</p>
                </div>
                <div className="bg-[#F0F0F0] p-6 rounded-lg text-center">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-[#008080]" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">500,000+</h3>
                  <p className="text-sm text-gray-600">Appointments Booked</p>
                </div>
                <div className="bg-[#F0F0F0] p-6 rounded-lg text-center">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-[#008080]" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">4.8/5</h3>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
                <div className="bg-[#F0F0F0] p-6 rounded-lg text-center">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-[#008080]" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">100%</h3>
                  <p className="text-sm text-gray-600">Secure Bookings</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#008080] text-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Reliability</h3>
                <p className="text-white/80">
                  We understand that appointments are commitments. Our platform is designed to be reliable and
                  dependable, ensuring that bookings are accurate and notifications are timely.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">User-Centric</h3>
                <p className="text-white/80">
                  Every feature we develop is designed with our users in mind. We prioritize intuitive interfaces and
                  smooth experiences for both service providers and their clients.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-white/80">
                  We strive for excellence in everything we do, from the performance of our platform to the quality of
                  our customer support. We're not satisfied until our users are delighted.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#008080] mb-6">Meet Our Team</h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-12">
              The passionate individuals behind BookItEasy are dedicated to creating the best appointment booking
              experience possible.
            </p>
            <div className="grid md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <div className="bg-[#F0F0F0] rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-[#008080]" />
                  </div>
                  <h3 className="font-semibold text-lg">Team Member {i}</h3>
                  <p className="text-[#008080]">Position</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F0F0F0] py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#008080] mb-6">Join Us on Our Journey</h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-8">
              We're always looking for talented individuals who share our passion for creating exceptional user
              experiences.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-[#FF7F50] hover:bg-[#FF6347] text-white">
                Get in Touch
              </Button>
            </Link>
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
