import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { Booking } from "@/lib/models"

export async function GET() {
  try {
    const db = await getDatabase()

    // Get bookings with destination details
    const bookings = await db
      .collection<Booking>("bookings")
      .aggregate([
        {
          $lookup: {
            from: "destinations",
            localField: "destinationId",
            foreignField: "_id",
            as: "destination",
          },
        },
        {
          $unwind: {
            path: "$destination",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ])
      .toArray()

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const db = await getDatabase()

    const booking: Omit<Booking, "_id"> = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection<Booking>("bookings").insertOne(booking)

    return NextResponse.json({ _id: result.insertedId, ...booking }, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
