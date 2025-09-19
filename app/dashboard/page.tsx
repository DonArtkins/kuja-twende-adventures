"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Star, LogOut, User, Settings } from "lucide-react"
import { format } from "date-fns"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import type { User as UserType, Booking, Destination } from "@/lib/models"

interface BookingWithDestination extends Booking {
  destination?: Destination
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const [bookings, setBookings] = useState<BookingWithDestination[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/auth/login")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      fetchUserBookings()
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/auth/login")
    }
  }, [router])

  const fetchUserBookings = async () => {
    try {
      const response = await fetch("/api/bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setBookings(data.slice(0, 3)) // Show only recent 3 bookings
      }
    } catch (error) {
      console.error("Error fetching bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
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

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, <span className="neon-text">{user.name}</span>
              </h1>
              <p className="text-xl text-muted-foreground">Manage your adventures and bookings</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" onClick={handleLogout} className="bg-transparent">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Profile Card */}
            <div className="lg:col-span-1">
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <User className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-muted-foreground">{user.email}</p>
                    <Badge variant="secondary" className="mt-2">
                      {user.role === "admin" ? "Administrator" : "Traveler"}
                    </Badge>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">{bookings.length}</div>
                        <div className="text-sm text-muted-foreground">Total Trips</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-accent">4.9</div>
                        <div className="text-sm text-muted-foreground">Rating</div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Edit Profile</Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Bookings */}
            <div className="lg:col-span-2">
              <Card className="glass border-border/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Bookings</CardTitle>
                  <Button variant="outline" onClick={() => router.push("/bookings")} className="bg-transparent">
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  {bookings.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">No bookings yet</p>
                      <Button onClick={() => router.push("/destinations")}>Explore Destinations</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div
                          key={booking._id}
                          className="flex items-center space-x-4 p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                        >
                          {booking.destination && (
                            <img
                              src={booking.destination.image || "/placeholder.svg"}
                              alt={booking.destination.title}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold">{booking.destination?.title || "Unknown Destination"}</h4>
                              <Badge className={getStatusColor(booking.status)}>{booking.status.toUpperCase()}</Badge>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground space-x-4">
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {booking.destination?.location}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {format(new Date(booking.date), "MMM dd, yyyy")}
                              </div>
                              <div className="flex items-center">
                                <Users className="h-3 w-3 mr-1" />
                                {booking.numberOfPeople} people
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-primary">${booking.totalAmount}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                className="glass border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                onClick={() => router.push("/destinations")}
              >
                <CardContent className="p-6 text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Explore Destinations</h3>
                  <p className="text-sm text-muted-foreground">Discover new adventures and book your next trip</p>
                </CardContent>
              </Card>

              <Card
                className="glass border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                onClick={() => router.push("/bookings")}
              >
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Manage Bookings</h3>
                  <p className="text-sm text-muted-foreground">View and modify your existing bookings</p>
                </CardContent>
              </Card>

              <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Star className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Leave Reviews</h3>
                  <p className="text-sm text-muted-foreground">Share your experiences with other travelers</p>
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
