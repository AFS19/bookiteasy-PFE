import Link from "next/link"
import { Clock, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function TermsPage() {
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
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#008080] rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-[#008080]">Terms of Service</h1>
              </div>
              <p className="text-gray-600">
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  By accessing and using BookItEasy ("the Service"), you accept and agree to be bound by the terms and
                  provision of this agreement. If you do not agree to abide by the above, please do not use this
                  service.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  These Terms of Service constitute a legally binding agreement between you and BookItEasy regarding
                  your use of our appointment booking platform and related services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  BookItEasy provides an online platform that allows users to book appointments with various service
                  providers. Our service includes:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Online appointment scheduling and booking</li>
                  <li>Calendar management and availability viewing</li>
                  <li>Automated confirmation and reminder notifications</li>
                  <li>Payment processing for applicable services</li>
                  <li>Customer support and assistance</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts and Registration</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To use certain features of our Service, you must register for an account. When you register, you agree
                  to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information to keep it accurate</li>
                  <li>Keep your password secure and confidential</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Booking and Cancellation Policy</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Booking Confirmations</h3>
                    <p className="text-gray-700 leading-relaxed">
                      All bookings are subject to availability and confirmation by the service provider. We reserve the
                      right to cancel or modify bookings in case of unforeseen circumstances.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Cancellation Policy</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Users may cancel appointments up to 24 hours before the scheduled time without penalty.
                      Cancellations made less than 24 hours in advance may be subject to cancellation fees as determined
                      by the service provider.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No-Show Policy</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Failure to attend a scheduled appointment without prior cancellation may result in charges and may
                      affect your ability to book future appointments.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Payment Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Payment for services may be required at the time of booking or at the time of service, depending on
                  the service provider's policies. By using our Service, you agree to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Pay all charges associated with your bookings</li>
                  <li>Provide valid payment information</li>
                  <li>Accept responsibility for all charges incurred under your account</li>
                  <li>Comply with the refund policies of individual service providers</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. User Conduct</h2>
                <p className="text-gray-700 leading-relaxed mb-4">You agree not to use the Service to:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on the rights of others</li>
                  <li>Transmit harmful, offensive, or inappropriate content</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Attempt to gain unauthorized access to any part of the Service</li>
                  <li>Use the Service for any commercial purpose without authorization</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy and Data Protection</h2>
                <p className="text-gray-700 leading-relaxed">
                  Your privacy is important to us. Our collection and use of personal information is governed by our
                  Privacy Policy, which is incorporated into these Terms by reference. By using our Service, you consent
                  to the collection and use of your information as outlined in our Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed">
                  BookItEasy shall not be liable for any indirect, incidental, special, consequential, or punitive
                  damages, including without limitation, loss of profits, data, use, goodwill, or other intangible
                  losses, resulting from your use of the Service. Our total liability shall not exceed the amount paid
                  by you for the Service in the twelve months preceding the claim.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modifications to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify these Terms of Service at any time. We will notify users of significant
                  changes via email or through our platform. Your continued use of the Service after such modifications
                  constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">Email: legal@bookiteasy.com</p>
                  <p className="text-gray-700">Phone: (123) 456-7890</p>
                  <p className="text-gray-700">Address: 123 Booking Street, Suite 456, San Francisco, CA 94103</p>
                </div>
              </section>
            </div>

            <div className="mt-8 text-center">
              <Link href="/">
                <Button className="bg-[#FF7F50] hover:bg-[#FF6347] text-white">Back to Home</Button>
              </Link>
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
    </div>
  )
}
