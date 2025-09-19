"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Users, Phone, Mail, MessageSquare } from "lucide-react"
import { format } from "date-fns"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import type { Booking, Destination } from "@/lib/models"

interface BookingWithDestination extends Booking {
  destination?: Destination
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingWithDestination[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings")
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      }
    } catch (error) {
      console.error("Error fetching bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      case "cancelled":
        return "bg-red-500/20 text-red-400"
      case "completed":
        return "bg-blue-500/20 text-blue-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const filterBookings = (status?: string) => {
    if (!status) return bookings
    return bookings.filter((booking) => booking.status === status)
  }

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              My <span className="neon-text">Bookings</span>
            </h1>
            <p className="text-xl text-muted-foreground">Manage your travel bookings and view trip details</p>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 glass">
              <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({filterBookings("pending").length})</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed ({filterBookings("confirmed").length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({filterBookings("completed").length})</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled ({filterBookings("cancelled").length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <BookingsList bookings={bookings} getStatusColor={getStatusColor} />
            </TabsContent>
            <TabsContent value="pending">
              <BookingsList bookings={filterBookings("pending")} getStatusColor={getStatusColor} />
            </TabsContent>
            <TabsContent value="confirmed">
              <BookingsList bookings={filterBookings("confirmed")} getStatusColor={getStatusColor} />
            </TabsContent>
            <TabsContent value="completed">
              <BookingsList bookings={filterBookings("completed")} getStatusColor={getStatusColor} />
            </TabsContent>
            <TabsContent value="cancelled">
              <BookingsList bookings={filterBookings("cancelled")} getStatusColor={getStatusColor} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function BookingsList({
  bookings,
  getStatusColor,
}: {
  bookings: BookingWithDestination[]
  getStatusColor: (status: string) => string
}) {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-muted-foreground mb-4">No bookings found</p>
        <Button onClick={() => (window.location.href = "/destinations")}>Browse Destinations</Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {bookings.map((booking) => (
        <Card key={booking._id} className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Destination Image & Info */}
              <div className="lg:col-span-1">
                {booking.destination && (
                  <>
                    <img
                      src={booking.destination.image || "/placeholder.svg"}
                      alt={booking.destination.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-lg mb-1">{booking.destination.title}</h3>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {booking.destination.location}
                    </div>
                  </>
                )}
              </div>

              {/* Booking Details */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Booking Details</h4>
                  <Badge className={getStatusColor(booking.status)}>{booking.status.toUpperCase()}</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{format(new Date(booking.date), "MMM dd, yyyy")}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{booking.numberOfPeople} people</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{booking.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{booking.phone}</span>
                  </div>
                </div>

                {booking.specialRequests && (
                  <div>
                    <div className="flex items-center mb-2">
                      <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm font-medium">Special Requests</span>
                    </div>
                    <p className="text-sm text-muted-foreground bg-muted/20 p-3 rounded-lg">
                      {booking.specialRequests}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions & Price */}
              <div className="lg:col-span-1 flex flex-col justify-between">
                <div className="text-right mb-4">
                  <div className="text-2xl font-bold text-primary">${booking.totalAmount}</div>
                  <div className="text-sm text-muted-foreground">Total Amount</div>
                </div>

                <div className="space-y-2">
                  {booking.status === "pending" && (
                    <>
                      <Button variant="outline" className="w-full bg-transparent">
                        Modify Booking
                      </Button>
                      <Button variant="destructive" className="w-full">
                        Cancel Booking
                      </Button>
                    </>
                  )}
                  {booking.status === "confirmed" && <Button className="w-full">View Itinerary</Button>}
                  {booking.status === "completed" && (
                    <Button variant="outline" className="w-full bg-transparent">
                      Leave Review
                    </Button>
                  )}
                  <Button variant="ghost" className="w-full">
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
