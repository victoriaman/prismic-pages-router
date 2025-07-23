import { NextRequest, NextResponse, userAgent } from "next/server";
import { CONSTANT } from "@/lib/constant";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log("middleware called:", pathname);

    const { device, browser, engine, os } = userAgent(request);
    console.log("device info:", device);
    console.log("browser info:", browser);
    console.log("engine info:", engine);
    console.log("os info:", os);

    const isAuthenticated = request.cookies.get(CONSTANT.AUTHENTICATION_COOKIE_NAME)?.value === "true";
    if (["/features", "/marketing/about", "/about"].includes(pathname) && !isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/features", "/marketing/about", "/about"],
};
