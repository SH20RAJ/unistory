import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const { pathname } = req.nextUrl

    // Public routes that don't require authentication
    const publicRoutes = [
        '/',
        '/auth/signin',
        '/auth/signup',
        '/auth/error',
        '/api/auth/callback/google',
        '/api/auth/signin',
        '/api/auth/signout',
        '/api/auth/session',
        '/api/auth/csrf'
    ]

    // Check if the current path is a public route
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

    // If user is not authenticated and trying to access a protected route
    if (!req.auth && !isPublicRoute) {
        const signInUrl = new URL('/auth/signin', req.url)
        signInUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(signInUrl)
    }

    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if (req.auth && (pathname.startsWith('/auth/signin') || pathname.startsWith('/auth/signup'))) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
})

// Configure which routes this middleware should run on
export const config = {
    matcher: [
        // Match all request paths except for the ones starting with:
        // - api/auth (auth routes)
        // - _next/static (static files)
        // - _next/image (image optimization files)
        // - favicon.ico (favicon file)
        // - public files (public folder)
        "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
}
