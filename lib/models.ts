export interface Destination {
  _id?: string
  title: string
  description: string
  location: string
  price: number
  image: string
  category: string
  duration: string
  maxGroupSize: number
  difficulty: "Easy" | "Moderate" | "Challenging" | "Extreme"
  highlights: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Booking {
  _id?: string
  userId: string
  destinationId: string
  name: string
  email: string
  phone: string
  date: Date
  numberOfPeople: number
  specialRequests?: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  totalAmount: number
  createdAt: Date
  updatedAt: Date
}

export interface User {
  _id?: string
  name: string
  email: string
  password: string
  role: "user" | "admin"
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  _id?: string
  userId: string
  destinationId: string
  userName: string
  rating: number
  comment: string
  createdAt: Date
  updatedAt: Date
}
