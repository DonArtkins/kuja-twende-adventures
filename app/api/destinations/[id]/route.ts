import { type NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDatabase } from "@/lib/mongodb"
import type { Destination } from "@/lib/models"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = await getDatabase()
    const destination = await db.collection<Destination>("destinations").findOne({ _id: new ObjectId(params.id) })

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 })
    }

    return NextResponse.json(destination)
  } catch (error) {
    console.error("Error fetching destination:", error)
    return NextResponse.json({ error: "Failed to fetch destination" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const db = await getDatabase()

    const updateData = {
      ...body,
      updatedAt: new Date(),
    }

    const result = await db
      .collection<Destination>("destinations")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Destination updated successfully" })
  } catch (error) {
    console.error("Error updating destination:", error)
    return NextResponse.json({ error: "Failed to update destination" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = await getDatabase()
    const result = await db.collection<Destination>("destinations").deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Destination deleted successfully" })
  } catch (error) {
    console.error("Error deleting destination:", error)
    return NextResponse.json({ error: "Failed to delete destination" }, { status: 500 })
  }
}
