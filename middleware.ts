import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define role-based route access
const roleRoutes = {
  admin: ["/admin"],
  "branch-manager": ["/branch-manager"],
  "pos-operator": ["/pos-operator"],
  "chef-kitchen": ["/chef-kitchen"],
}

const publicRoutes = ["/", "/login", "/register", "/forgot-password"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Check for authentication token
  const token = request.cookies.get("auth-token")

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  let response
  try {
    // Verify token and get user info
    response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        Cookie: request.headers.get("cookie") || "",
      },
    })

    if (!response.ok) {
      throw new Error("Invalid token")
    }

    const { data: user } = await response.json()

    // Check role-based access
    const userRoles = user.roles?.map((role: any) => role.name) || []

    // Check if user has access to the requested route
    const hasAccess = Object.entries(roleRoutes).some(([role, routes]) => {
      if (!userRoles.includes(role)) return false
      return routes.some((route) => pathname.startsWith(route))
    })

    if (!hasAccess) {
      // Redirect to appropriate dashboard based on user's primary role
      const primaryRole = userRoles[0]
      const redirectPath = roleRoutes[primaryRole as keyof typeof roleRoutes]?.[0] || "/admin"
      return NextResponse.redirect(new URL(`${redirectPath}/dashboard`, request.url))
    }

    // Add user info to headers for use in components
    const nextResponse = NextResponse.next()
    nextResponse.headers.set("x-user-id", user.id.toString())
    nextResponse.headers.set("x-user-roles", JSON.stringify(userRoles))

    return nextResponse
  } catch (error) {
    // Invalid token, redirect to login
    const redirectResponse = NextResponse.redirect(new URL("/login", request.url))
    redirectResponse.cookies.delete("auth-token")
    return redirectResponse
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
