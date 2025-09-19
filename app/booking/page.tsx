"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPin, Clock, Users, CreditCard, Shield, CheckCircle } from "lucide-react"
import { format } from "date-fns"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import type { Destination, Booking } from "@/lib/models"
import { cn } from "@/lib/utils"

export default function BookingPage() {
  const searchParams = useSearchParams()
  const destinationId = searchParams.get("destination")

  const [destination, setDestination] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [date, setDate] = useState<Date>()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfPeople: 1,
    specialRequests: "",
  })

  useEffect(() => {
    if (destinationId) {
      fetchDestination(destinationId)
    } else {
      setLoading(false)
    }
  }, [destinationId])

  const fetchDestination = async (id: string) => {
    try {
      const response = await fetch(`/api/destinations/${id}`)
      if (response.ok) {
        const data = await response.json()
        setDestination(data)
      }
    } catch (error) {
      console.error("Error fetching destination:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "numberOfPeople" ? Number.parseInt(value) || 1 : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!destination || !date) return

    setSubmitting(true)

    try {
      const bookingData: Omit<Booking, "_id" | "createdAt" | "updatedAt"> = {
        userId: "temp-user-id", // This will be replaced with actual user ID after auth
        destinationId: destination._id!,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date,
        numberOfPeople: formData.numberOfPeople,
        specialRequests: formData.specialRequests,
        status: "pending",
        totalAmount: destination.price * formData.numberOfPeople,
      }

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })

      if (response.ok) {
        setSuccess(true)
      } else {
        throw new Error("Failed to create booking")
      }
    } catch (error) {
      console.error("Error creating booking:", error)
      alert("Failed to create booking. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const totalAmount = destination ? destination.price * formData.numberOfPeople : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Destination not found</h1>
            <p className="text-muted-foreground mb-6">Please select a destination to book.</p>
            <Button onClick={() => (window.location.href = "/destinations")}>Browse Destinations</Button>
          </div>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <Card className="glass border-border/50 max-w-md w-full mx-4">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-4">Booking Confirmed!</h1>
              <p className="text-muted-foreground mb-6">
                Your booking for {destination.title} has been submitted successfully. We'll contact you within 24 hours
                to confirm the details.
              </p>
              <div className="space-y-2">
                <Button onClick={() => (window.location.href = "/bookings")} className="w-full">
                  View My Bookings
                </Button>
                <Button variant="outline" onClick={() => (window.location.href = "/destinations")} className="w-full">
                  Book Another Trip
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Book Your <span className="neon-text">Adventure</span>
            </h1>
            <p className="text-xl text-muted-foreground">Complete your booking details below</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Booking Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="bg-background/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="bg-background/50"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="bg-background/50"
                        />
                      </div>
                    </div>

                    {/* Trip Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Trip Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Preferred Date *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal bg-background/50",
                                  !date && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <Label htmlFor="numberOfPeople">Number of People *</Label>
                          <Input
                            id="numberOfPeople"
                            name="numberOfPeople"
                            type="number"
                            min="1"
                            max={destination.maxGroupSize}
                            value={formData.numberOfPeople}
                            onChange={handleInputChange}
                            required
                            className="bg-background/50"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Maximum {destination.maxGroupSize} people
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                      <Textarea
                        id="specialRequests"
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        placeholder="Any dietary restrictions, accessibility needs, or special occasions..."
                        className="bg-background/50"
                        rows={3}
                      />
                    </div>

                    {/* Terms */}
                    <div className="flex items-center space-x-2 p-4 bg-muted/20 rounded-lg">
                      <Shield className="h-5 w-5 text-primary" />
                      <div className="text-sm">
                        <p className="font-medium">Secure Booking</p>
                        <p className="text-muted-foreground">
                          Your information is protected with end-to-end encryption
                        </p>
                      </div>
                    </div>

                    <Button type="submit" disabled={submitting || !date} className="w-full neon-glow text-lg py-3">
                      {submitting ? "Processing..." : `Book Now - $${totalAmount}`}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div>
              <Card className="glass border-border/50 sticky top-24">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Destination Info */}
                  <div>
                    <img
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-lg">{destination.title}</h3>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {destination.location}
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className="space-y-2 pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        Duration
                      </div>
                      <span>{destination.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        People
                      </div>
                      <span>{formData.numberOfPeople}</span>
                    </div>
                    {date && (
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                          Date
                        </div>
                        <span>{format(date, "MMM dd, yyyy")}</span>
                      </div>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="space-y-2 pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between text-sm">
                      <span>Price per person</span>
                      <span>${destination.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Number of people</span>
                      <span>× {formData.numberOfPeople}</span>
                    </div>
                    <div className="flex items-center justify-between font-semibold text-lg pt-2 border-t border-border/50">
                      <span>Total</span>
                      <span className="text-primary">${totalAmount}</span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                    <Badge variant="secondary">Free Cancellation</Badge>
                    <Badge variant="secondary">Instant Confirmation</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
