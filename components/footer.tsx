import Link from "next/link"
import { Rocket, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const footerLinks = {
    destinations: [
      { label: "Popular Tours", href: "/destinations" },
      { label: "Adventure Packages", href: "/destinations?category=adventure" },
      { label: "Tech Tours", href: "/destinations?category=tech" },
      { label: "Cultural Experiences", href: "/destinations?category=culture" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
    support: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
      { label: "Booking Policy", href: "/policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  }

  return (
    <footer className="bg-card/50 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="p-2 rounded-lg bg-primary/20">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold neon-text">Kuja Twende Adventures</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Pioneering the future of travel with cutting-edge technology and extraordinary experiences. Your adventure
              in the digital frontier starts here.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                hello@kujatwende.com
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +254 700 123 456
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Nairobi, Kenya
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Destinations</h3>
            <ul className="space-y-2">
              {footerLinks.destinations.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground text-sm">© 2024 Kuja Twende Adventures. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
