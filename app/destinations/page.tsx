"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, Star, Search, Filter } from "lucide-react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import type { Destination } from "@/lib/models"

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")

  useEffect(() => {
    fetchDestinations()
  }, [])

  useEffect(() => {
    filterDestinations()
  }, [destinations, searchTerm, categoryFilter, difficultyFilter])

  const fetchDestinations = async () => {
    try {
      const response = await fetch("/api/destinations")
      if (response.ok) {
        const data = await response.json()
        setDestinations(data)
      }
    } catch (error) {
      console.error("Error fetching destinations:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterDestinations = () => {
    let filtered = destinations

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (dest) =>
          dest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dest.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dest.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((dest) => dest.category === categoryFilter)
    }

    // Difficulty filter
    if (difficultyFilter !== "all") {
      filtered = filtered.filter((dest) => dest.difficulty === difficultyFilter)
    }

    setFilteredDestinations(filtered)
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Header */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Explore <span className="neon-text">Destinations</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover extraordinary adventures that blend cutting-edge technology with unforgettable experiences.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="glass p-6 rounded-lg border border-border/50">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search destinations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background/50"
                  />
                </div>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="tech">Tech Tours</SelectItem>
                    <SelectItem value="culture">Cultural</SelectItem>
                    <SelectItem value="nature">Nature</SelectItem>
                    <SelectItem value="urban">Urban</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Challenging">Challenging</SelectItem>
                    <SelectItem value="Extreme">Extreme</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setCategoryFilter("all")
                    setDifficultyFilter("all")
                  }}
                  className="bg-background/50"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-7xl mx-auto">
            {filteredDestinations.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No destinations found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDestinations.map((destination) => (
                  <Card
                    key={destination._id}
                    className="glass border-border/50 hover:border-primary/50 transition-all duration-300 group overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={destination.image || "/placeholder.svg"}
                        alt={destination.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        ${destination.price}
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className={getDifficultyColor(destination.difficulty)}>{destination.difficulty}</Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {destination.category}
                        </Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-muted-foreground ml-1">4.8</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {destination.title}
                      </h3>

                      <div className="flex items-center text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{destination.location}</span>
                      </div>

                      <p className="text-muted-foreground mb-4 text-sm line-clamp-2">{destination.description}</p>

                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {destination.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          Max {destination.maxGroupSize}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Link href={`/destinations/${destination._id}`}>
                          <Button variant="outline" className="w-full mb-2 bg-transparent">
                            View Details
                          </Button>
                        </Link>
                        <Link href={`/booking?destination=${destination._id}`}>
                          <Button className="w-full group-hover:neon-glow transition-all duration-300">Book Now</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
