"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Star } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create floating particles animation
    if (particlesRef.current) {
      const particles = Array.from({ length: 50 }, (_, i) => {
        const particle = document.createElement("div")
        particle.className = "absolute w-1 h-1 bg-primary/30 rounded-full"
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`
        particlesRef.current?.appendChild(particle)

        gsap.to(particle, {
          y: -100,
          x: Math.random() * 200 - 100,
          opacity: 0,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          delay: Math.random() * 2,
          ease: "power2.out",
        })

        return particle
      })
    }

    // Continuous glow animation
    gsap.to(".hero-glow", {
      scale: 1.1,
      opacity: 0.8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    })
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-bg"></div>
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none"></div>

      {/* Animated Background Glow */}
      <div className="hero-glow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="hero-subtitle inline-flex items-center px-4 py-2 rounded-full glass border border-primary/30 text-sm font-medium text-primary">
            <Star className="w-4 h-4 mr-2" />
            The Future of Travel is Here
          </div>

          {/* Main Heading */}
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="block text-foreground">Discover</span>
            <span className="block neon-text bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Extraordinary
            </span>
            <span className="block text-foreground">Adventures</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience cutting-edge travel technology that transforms ordinary trips into unforgettable journeys. Your
            next adventure awaits in the digital frontier.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/destinations">
              <Button size="lg" className="neon-glow group px-8 py-4 text-lg">
                Explore Destinations
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="glass group px-8 py-4 text-lg bg-transparent">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="hero-subtitle grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">10K+</div>
              <div className="text-muted-foreground">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">4.9★</div>
              <div className="text-muted-foreground">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
