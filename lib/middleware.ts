import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "./auth"

export function authMiddleware(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "")

  if (!token) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  const decoded = verifyToken(token)

  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  // Add user info to request headers for use in API routes
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-user-id", decoded.userId)
  requestHeaders.set("x-user-email", decoded.email)
  requestHeaders.set("x-user-role", decoded.role)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}
