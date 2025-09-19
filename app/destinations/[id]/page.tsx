"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, Star, ArrowLeft, Calendar, Shield, Wifi } from "lucide-react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import type { Destination } from "@/lib/models"

export default function DestinationDetailPage() {
  const params = useParams()
  const [destination, setDestination] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchDestination(params.id as string)
    }
  }, [params.id])

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-400"
      case "Moderate":
        return "bg-yellow-500/20 text-yellow-400"
      case "Challenging":
        return "bg-orange-500/20 text-orange-400"
      case "Extreme":
        return "bg-red-500/20 text-red-400"
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

  if (!destination) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Destination not found</h1>
            <Link href="/destinations">
              <Button>Back to Destinations</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Back Button */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <Link href="/destinations">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Destinations
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-lg h-96 md:h-[500px]">
              <img
                src={destination.image || "/placeholder.svg"}
                alt={destination.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getDifficultyColor(destination.difficulty)}>{destination.difficulty}</Badge>
                  <Badge variant="secondary">{destination.category}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{destination.title}</h1>
                <div className="flex items-center text-white/80">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{destination.location}</span>
                </div>
              </div>
              <div className="absolute top-6 right-6 bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-lg font-bold">
                ${destination.price}
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <Card className="glass border-border/50">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">About This Adventure</h2>
                    <p className="text-muted-foreground leading-relaxed">{destination.description}</p>
                  </CardContent>
                </Card>

                {/* Highlights */}
                <Card className="glass border-border/50">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                    <ul className="space-y-2">
                      {destination.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <Star className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* What's Included */}
                <Card className="glass border-border/50">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">What's Included</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-green-400 mr-2" />
                        <span className="text-sm">Travel Insurance</span>
                      </div>
                      <div className="flex items-center">
                        <Wifi className="h-5 w-5 text-green-400 mr-2" />
                        <span className="text-sm">Free WiFi</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-green-400 mr-2" />
                        <span className="text-sm">Expert Guide</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-green-400 mr-2" />
                        <span className="text-sm">Flexible Dates</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Info */}
                <Card className="glass border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Quick Info</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">Duration</span>
                        </div>
                        <span className="font-medium">{destination.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">Max Group</span>
                        </div>
                        <span className="font-medium">{destination.maxGroupSize} people</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">Difficulty</span>
                        </div>
                        <Badge className={getDifficultyColor(destination.difficulty)}>{destination.difficulty}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Booking Card */}
                <Card className="glass border-border/50 sticky top-24">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-primary mb-2">${destination.price}</div>
                      <div className="text-sm text-muted-foreground">per person</div>
                    </div>

                    <div className="space-y-4">
                      <Link href={`/booking?destination=${destination._id}`}>
                        <Button className="w-full neon-glow text-lg py-3">Book Now</Button>
                      </Link>
                      <Button variant="outline" className="w-full bg-transparent">
                        Add to Wishlist
                      </Button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border/50 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">4.8/5</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Based on 127 reviews</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
