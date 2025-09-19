import { Zap, Shield, Globe, Headphones } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Instant Booking",
      description: "Book your dream destination in seconds with our lightning-fast booking system.",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Your transactions are protected with military-grade encryption technology.",
    },
    {
      icon: Globe,
      title: "Global Destinations",
      description: "Access to 500+ carefully curated destinations across all continents.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock assistance from our expert travel consultants.",
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="neon-text">Kuja Twende</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of travel with our cutting-edge platform designed for modern adventurers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glass border-border/50 hover:border-primary/50 transition-all duration-300 group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
