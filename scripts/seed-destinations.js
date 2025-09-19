const { MongoClient } = require("mongodb")

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/kuja-twende-adventures"

const sampleDestinations = [
  {
    title: "Neon Tokyo Adventure",
    description:
      "Experience the cyberpunk culture of modern Tokyo with guided tours through tech districts, robot restaurants, and virtual reality arcades. This futuristic journey combines traditional Japanese culture with cutting-edge technology.",
    location: "Tokyo, Japan",
    price: 2499,
    image: "/futuristic-tokyo-cityscape-neon-lights.jpg",
    category: "tech",
    duration: "7 days",
    maxGroupSize: 12,
    difficulty: "Moderate",
    highlights: [
      "Visit the world's most advanced robot restaurant",
      "Experience VR gaming in Akihabara",
      "Guided tour of tech startups in Shibuya",
      "Traditional tea ceremony with holographic guides",
      "Night photography in neon-lit districts",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Digital Nomad Safari",
    description:
      "Traditional safari meets modern technology with drone photography, VR wildlife experiences, and satellite-guided game drives. Capture the African wilderness like never before.",
    location: "Maasai Mara, Kenya",
    price: 1899,
    image: "/african-safari-with-modern-technology.jpg",
    category: "adventure",
    duration: "5 days",
    maxGroupSize: 8,
    difficulty: "Easy",
    highlights: [
      "Drone photography of the Great Migration",
      "VR wildlife encounters",
      "Satellite-guided night game drives",
      "Digital campfire stories with local tribes",
      "Solar-powered luxury camping",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Arctic Aurora Tech",
    description:
      "Chase the Northern Lights with advanced prediction technology and heated glass igloos. This high-tech Arctic adventure combines natural wonders with modern comfort.",
    location: "Reykjavik, Iceland",
    price: 3299,
    image: "/northern-lights-iceland-futuristic.jpg",
    category: "nature",
    duration: "6 days",
    maxGroupSize: 10,
    difficulty: "Challenging",
    highlights: [
      "AI-powered aurora prediction system",
      "Heated glass igloo accommodation",
      "Thermal drone photography",
      "Geothermal spa with smart temperature control",
      "Northern Lights time-lapse workshops",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Cyberpunk Singapore",
    description:
      "Explore the smart city of the future with IoT tours, vertical farming visits, and AI-guided cultural experiences. Singapore's blend of tradition and innovation awaits.",
    location: "Singapore",
    price: 1799,
    image: "/singapore-futuristic-skyline.jpg",
    category: "urban",
    duration: "4 days",
    maxGroupSize: 15,
    difficulty: "Easy",
    highlights: [
      "Smart city IoT infrastructure tour",
      "Vertical farming facility visits",
      "AI-powered cultural heritage walks",
      "Futuristic architecture photography",
      "Tech startup ecosystem exploration",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Himalayan Tech Trek",
    description:
      "High-altitude adventure enhanced with satellite communication, weather prediction AI, and drone-assisted navigation. Experience the world's highest peaks with cutting-edge safety technology.",
    location: "Everest Base Camp, Nepal",
    price: 4299,
    image: "/himalayan-mountains-with-technology.jpg",
    category: "adventure",
    duration: "14 days",
    maxGroupSize: 6,
    difficulty: "Extreme",
    highlights: [
      "Satellite communication throughout trek",
      "AI weather prediction for safety",
      "Drone-assisted route navigation",
      "High-altitude photography workshops",
      "Traditional Sherpa culture with modern safety",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Virtual Venice Experience",
    description:
      "Explore Venice through augmented reality historical reconstructions, underwater drone tours of submerged areas, and digital art installations in ancient palazzos.",
    location: "Venice, Italy",
    price: 2199,
    image: "/venice-canals-with-ar-overlay.jpg",
    category: "culture",
    duration: "5 days",
    maxGroupSize: 12,
    difficulty: "Easy",
    highlights: [
      "AR historical reconstructions",
      "Underwater drone canal exploration",
      "Digital art in historic palazzos",
      "Virtual gondola experiences",
      "Interactive museum technologies",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

async function seedDestinations() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db("kuja-twende-adventures")
    const collection = db.collection("destinations")

    // Clear existing destinations
    await collection.deleteMany({})
    console.log("Cleared existing destinations")

    // Insert sample destinations
    const result = await collection.insertMany(sampleDestinations)
    console.log(`Inserted ${result.insertedCount} destinations`)

    console.log("Sample destinations seeded successfully!")
  } catch (error) {
    console.error("Error seeding destinations:", error)
  } finally {
    await client.close()
  }
}

seedDestinations()
