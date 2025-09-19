"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import AOS from "aos"
import "aos/dist/aos.css"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import PopularDestinations from "@/components/popular-destinations"
import TestimonialsSection from "@/components/testimonials-section"
import Footer from "@/components/footer"

export default function HomePage() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    })

    // GSAP timeline for page load animations
    const tl = gsap.timeline()

    tl.from(".nav-item", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    })
      .from(
        ".hero-title",
        {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
        },
        "-=0.5",
      )
      .from(
        ".hero-subtitle",
        {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8",
      )
      .from(
        ".hero-cta",
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.5",
      )
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PopularDestinations />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
