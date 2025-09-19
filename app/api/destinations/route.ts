import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { Destination } from "@/lib/models"

export async function GET() {
  try {
    const db = await getDatabase()
    const destinations = await db.collection<Destination>("destinations").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(destinations)
  } catch (error) {
    console.error("Error fetching destinations:", error)
    return NextResponse.json({ error: "Failed to fetch destinations" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const db = await getDatabase()

    const destination: Omit<Destination, "_id"> = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection<Destination>("destinations").insertOne(destination)

    return NextResponse.json({ _id: result.insertedId, ...destination }, { status: 201 })
  } catch (error) {
    console.error("Error creating destination:", error)
    return NextResponse.json({ error: "Failed to create destination" }, { status: 500 })
  }
}
