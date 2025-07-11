import Link from "next/link"
import { Clock, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
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
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-[#008080]">Privacy Policy</h1>
              </div>
              <p className="text-gray-600">
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  At BookItEasy, we are committed to protecting your privacy and ensuring the security of your personal
                  information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                  information when you use our appointment booking platform and related services.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  By using our Service, you consent to the data practices described in this policy. If you do not agree
                  with the practices described in this policy, please do not use our Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                    <p className="text-gray-700 leading-relaxed mb-2">
                      We may collect personal information that you voluntarily provide to us, including:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                      <li>Name and contact information (email, phone number, address)</li>
                      <li>Account credentials (username, password)</li>
                      <li>Payment information (credit card details, billing address)</li>
                      <li>Appointment preferences and special requests</li>
                      <li>Communication preferences</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Information</h3>
                    <p className="text-gray-700 leading-relaxed mb-2">
                      We automatically collect certain information about your use of our Service:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                      <li>Device information (IP address, browser type, operating system)</li>
                      <li>Usage patterns and preferences</li>
                      <li>Log files and analytics data</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Providing and maintaining our appointment booking services</li>
                  <li>Processing bookings and managing your appointments</li>
                  <li>Sending confirmation emails and appointment reminders</li>
                  <li>Processing payments and managing billing</li>
                  <li>Providing customer support and responding to inquiries</li>
                  <li>Improving our services and user experience</li>
                  <li>Sending marketing communications (with your consent)</li>
                  <li>Complying with legal obligations and protecting our rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may share your information in the following circumstances:
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Providers</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We share necessary booking information with service providers to facilitate your appointments.
                      This includes your name, contact information, and appointment details.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Third-Party Service Providers</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We may share information with trusted third parties who assist us in operating our platform, such
                      as payment processors, email service providers, and analytics services.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Requirements</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We may disclose your information if required by law or in response to valid legal requests from
                      public authorities.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal
                  information against unauthorized access, alteration, disclosure, or destruction. These measures
                  include:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection practices</li>
                  <li>Secure data centers and infrastructure</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  However, no method of transmission over the internet or electronic storage is 100% secure. While we
                  strive to protect your information, we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You have certain rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>
                    <strong>Access:</strong> You can request access to your personal information
                  </li>
                  <li>
                    <strong>Correction:</strong> You can request correction of inaccurate information
                  </li>
                  <li>
                    <strong>Deletion:</strong> You can request deletion of your personal information
                  </li>
                  <li>
                    <strong>Portability:</strong> You can request a copy of your data in a portable format
                  </li>
                  <li>
                    <strong>Opt-out:</strong> You can opt out of marketing communications at any time
                  </li>
                  <li>
                    <strong>Cookie preferences:</strong> You can manage cookie settings in your browser
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  To exercise these rights, please contact us using the information provided in the "Contact Us"
                  section.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our platform. These
                  technologies help us:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze usage patterns and improve our services</li>
                  <li>Provide personalized content and recommendations</li>
                  <li>Ensure security and prevent fraud</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  You can control cookie settings through your browser preferences. However, disabling cookies may
                  affect the functionality of our Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
                <p className="text-gray-700 leading-relaxed">
                  We retain your personal information for as long as necessary to provide our services and fulfill the
                  purposes outlined in this Privacy Policy. We may also retain information to comply with legal
                  obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we
                  will securely delete or anonymize it.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our Service is not intended for children under the age of 13. We do not knowingly collect personal
                  information from children under 13. If we become aware that we have collected personal information
                  from a child under 13, we will take steps to delete such information promptly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for other
                  operational, legal, or regulatory reasons. We will notify you of any material changes by posting the
                  updated policy on our website and updating the "Last updated" date. Your continued use of our Service
                  after such changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
                  please contact us:
                </p>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">Email: privacy@bookiteasy.com</p>
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
