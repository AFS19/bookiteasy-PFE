import Link from "next/link"
import { Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I book an appointment?",
      answer:
        "Booking an appointment is easy! Simply browse our services, select the one you need, choose an available time slot, and fill in your details. You'll receive a confirmation email once your booking is complete.",
    },
    {
      question: "Can I reschedule my appointment?",
      answer:
        "Yes, you can reschedule your appointment up to 24 hours before the scheduled time. Simply go to your dashboard, find the appointment you want to reschedule, and click the 'Reschedule' button.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "You can cancel your appointment up to 24 hours before the scheduled time without any charge. Cancellations made less than 24 hours in advance may be subject to a cancellation fee.",
    },
    {
      question: "How do I receive confirmation of my booking?",
      answer:
        "Once you complete your booking, you'll receive an immediate confirmation email with all the details of your appointment. You can also view your upcoming appointments in your dashboard.",
    },
    {
      question: "Can I book for someone else?",
      answer:
        "Yes, you can book appointments for others. During the booking process, you'll have the option to enter the details of the person who will be attending the appointment.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and Apple Pay. Payment is typically collected at the time of service, unless otherwise specified by the service provider.",
    },
    {
      question: "How far in advance can I book an appointment?",
      answer:
        "You can book appointments up to 3 months in advance. This allows you to secure your preferred time slots for recurring services.",
    },
    {
      question: "What if I'm late for my appointment?",
      answer:
        "If you're running late, please contact the service provider directly. Depending on their schedule, they may be able to accommodate you, but your service time might be shortened to ensure other clients aren't affected.",
    },
    {
      question: "Can I request a specific staff member?",
      answer:
        "Yes, during the booking process, you can select your preferred staff member if they're available for the service you're booking.",
    },
    {
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking the 'Sign In' button and then selecting 'Create Account'. You'll need to provide your email address and create a password. You can also sign up during the booking process.",
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

      <main className="flex-1 bg-[#F0F0F0] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-[#008080] mb-4">Frequently Asked Questions</h1>
              <p className="text-gray-600">
                Find answers to common questions about BookItEasy and our appointment booking process.
              </p>
            </div>

            <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="px-6 text-left hover:text-[#008080]">{faq.question}</AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 text-center">
              <h2 className="text-xl font-semibold text-[#008080] mb-4">Still Have Questions?</h2>
              <p className="text-gray-600 mb-6">
                If you couldn't find the answer to your question, feel free to contact our support team.
              </p>
              <Link href="/contact">
                <Button className="bg-[#FF7F50] hover:bg-[#FF6347] text-white">Contact Support</Button>
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
