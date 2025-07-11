"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Clock,
  ScissorsIcon as Cut,
  GiftIcon as Massage,
  SpadeIcon as Spa,
  Star,
  Users,
  CheckCircle,
  Filter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const services = [
  {
    id: "haircut",
    name: "Haircut & Styling",
    description: "Professional haircut and styling services for all hair types. Includes wash, cut, and basic styling.",
    duration: "45 min",
    price: "$35",
    originalPrice: "$45",
    icon: Cut,
    rating: 4.9,
    bookings: 1250,
    category: "Hair",
    popular: true,
    features: ["Wash included", "Professional styling", "Hair consultation"],
  },
  {
    id: "massage",
    name: "Therapeutic Massage",
    description:
      "Relaxing massage therapy to relieve stress and muscle tension. Perfect for unwinding after a long day.",
    duration: "60 min",
    price: "$75",
    originalPrice: "$85",
    icon: Massage,
    rating: 4.8,
    bookings: 890,
    category: "Wellness",
    popular: false,
    features: ["Deep tissue", "Stress relief", "Muscle recovery"],
  },
  {
    id: "facial",
    name: "Facial Treatment",
    description: "Rejuvenating facial treatment for healthy, glowing skin. Customized to your skin type and needs.",
    duration: "50 min",
    price: "$65",
    originalPrice: "$75",
    icon: Spa,
    rating: 4.7,
    bookings: 670,
    category: "Beauty",
    popular: false,
    features: ["Skin analysis", "Custom treatment", "Moisturizing"],
  },
]

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  const filteredServices = services
    .filter(
      (service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "all" || service.category.toLowerCase() === selectedCategory.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "price") return Number.parseInt(a.price.slice(1)) - Number.parseInt(b.price.slice(1))
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "duration") return Number.parseInt(a.duration) - Number.parseInt(b.duration)
      return b.bookings - a.bookings // popular
    })

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
            <Link href="/services" className="text-white font-medium border-b-2 border-white/30 pb-1">
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
                className="text-white border-white/30 hover:bg-white/10 transition-all duration-200"
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
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our range of professional services. Each service is delivered by experienced professionals
              with a focus on quality and customer satisfaction.
            </p>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <Filter className="h-5 w-5" />
                <span>Filter & Search:</span>
              </div>

              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-gray-200 focus:border-[#008080] focus:ring-[#008080]"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="hair">Hair</SelectItem>
                  <SelectItem value="wellness">Wellness</SelectItem>
                  <SelectItem value="beauty">Beauty</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price">Price: Low to High</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Card
                key={service.id}
                className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-white overflow-hidden"
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-[#FF7F50] to-[#FF6347] text-white border-0 shadow-lg">
                      🔥 Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="bg-gradient-to-br from-[#008080]/5 to-[#20B2AA]/5 pb-4 relative">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-[#008080] to-[#20B2AA] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="h-7 w-7 text-white" />
                    </div>
                    <Badge variant="outline" className="text-[#008080] border-[#008080]/30">
                      {service.category}
                    </Badge>
                  </div>

                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-[#008080] transition-colors">
                    {service.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">{service.description}</CardDescription>
                </CardHeader>

                <CardContent className="pt-6 space-y-4">
                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-[#008080]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{service.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{service.bookings} bookings</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration}</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[#008080]">{service.price}</span>
                      <span className="text-sm text-gray-400 line-through">{service.originalPrice}</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      Save ${Number.parseInt(service.originalPrice.slice(1)) - Number.parseInt(service.price.slice(1))}
                    </Badge>
                  </div>
                </CardContent>

                <CardFooter className="bg-gray-50 pt-6">
                  <Link href={`/booking/${service.id}`} className="w-full">
                    <Button className="w-full bg-gradient-to-r from-[#FF7F50] to-[#FF6347] hover:from-[#FF6347] hover:to-[#FF4500] text-white shadow-lg hover:shadow-xl transition-all duration-200 group">
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSortBy("popular")
                }}
                variant="outline"
                className="border-[#008080] text-[#008080] hover:bg-[#008080] hover:text-white"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-[#008080] to-[#20B2AA] rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Need Help Choosing?</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Our team is here to help you find the perfect service for your needs. Contact us for personalized
              recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-[#008080] hover:bg-gray-100 shadow-lg">
                  Get Recommendations
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#008080]"
                >
                  Learn More
                </Button>
              </Link>
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
