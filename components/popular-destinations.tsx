import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function PopularDestinations() {
  const destinations = [
    {
      id: 1,
      title: "Neon Tokyo Adventure",
      location: "Tokyo, Japan",
      price: 2499,
      duration: "7 days",
      maxGroup: 12,
      image: "/futuristic-tokyo-cityscape-neon-lights.jpg",
      description: "Experience the cyberpunk culture of modern Tokyo with guided tours through tech districts.",
    },
    {
      id: 2,
      title: "Digital Nomad Safari",
      location: "Maasai Mara, Kenya",
      price: 1899,
      duration: "5 days",
      maxGroup: 8,
      image: "/african-safari-with-modern-technology.jpg",
      description: "Traditional safari meets modern technology with drone photography and VR experiences.",
    },
    {
      id: 3,
      title: "Arctic Aurora Tech",
      location: "Reykjavik, Iceland",
      price: 3299,
      duration: "6 days",
      maxGroup: 10,
      image: "/northern-lights-iceland-futuristic.jpg",
      description: "Chase the Northern Lights with advanced prediction technology and heated glass igloos.",
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Popular <span className="neon-text">Destinations</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our most sought-after adventures that blend traditional travel with futuristic experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {destinations.map((destination, index) => (
            <Card
              key={destination.id}
              className="glass border-border/50 hover:border-primary/50 transition-all duration-300 group overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 100}
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
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {destination.title}
                </h3>

                <div className="flex items-center text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{destination.location}</span>
                </div>

                <p className="text-muted-foreground mb-4 text-sm">{destination.description}</p>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {destination.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Max {destination.maxGroup}
                  </div>
                </div>

                <Button className="w-full group-hover:neon-glow transition-all duration-300">Book Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center" data-aos="fade-up">
          <Link href="/destinations">
            <Button variant="outline" size="lg" className="glass bg-transparent">
              View All Destinations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
