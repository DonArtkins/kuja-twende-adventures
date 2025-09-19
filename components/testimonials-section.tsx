import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Digital Nomad",
      content:
        "Kuja Twende transformed my travel experience. The futuristic approach to booking and the unique destinations are absolutely incredible!",
      rating: 5,
      avatar: "/professional-woman-avatar.png",
    },
    {
      name: "Marcus Johnson",
      role: "Adventure Photographer",
      content:
        "The tech-enhanced safari was mind-blowing. Drone footage, VR experiences, and traditional wildlife - perfect combination!",
      rating: 5,
      avatar: "/professional-man-avatar.png",
    },
    {
      name: "Elena Rodriguez",
      role: "Travel Blogger",
      content:
        "From booking to the actual trip, everything was seamless. The AR guides and real-time translation made exploring so much easier.",
      rating: 5,
      avatar: "/travel-blogger-woman-avatar.jpg",
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="neon-text">Travelers</span> Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied adventurers who have experienced the future of travel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="glass border-border/50 hover:border-primary/50 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>

                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
