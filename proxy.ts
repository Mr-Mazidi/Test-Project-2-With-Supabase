import { NextRequest, NextResponse } from "next/server";


export function proxy(request: NextRequest) {

    const isLogin = request.cookies.get("refresh_token")?.value
    const path = request.nextUrl.pathname



    if (!isLogin && !(path === "/auth/login" || path === "/auth/register")) {

        return NextResponse.redirect(new URL("/auth/login", request.url))

    }

    if (isLogin && (path === "/auth/login" || path === "/auth/register")) {

        return NextResponse.redirect(new URL("/shop/products", request.url))

    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/auth/:path*",
        "/shop/:path*",
        "/profile/:path*",
    ]
}