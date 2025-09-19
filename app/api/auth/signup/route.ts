import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { hashPassword, generateToken } from "@/lib/auth"
import type { User } from "@/lib/models"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    const db = await getDatabase()

    // Check if user already exists
    const existingUser = await db.collection<User>("users").findOne({ email: email.toLowerCase() })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user: Omit<User, "_id"> = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection<User>("users").insertOne(user)

    // Generate JWT token
    const token = generateToken(result.insertedId.toString(), user.email, user.role)

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        message: "User created successfully",
        token,
        user: { _id: result.insertedId, ...userWithoutPassword },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
