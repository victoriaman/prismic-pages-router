import { CONSTANT } from "@/lib/constant";
import { serialize } from "cookie"; // Helper to set cookies in Pages Router API
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end("Method Not Allowed");
  }

  // Log cookies (you can use req.cookies if cookie-parser is installed, or parse manually)
  console.log("Cookies before logout:", req.cookies || req.headers.cookie);

  // Clear the auth cookie
  res.setHeader("Set-Cookie", serialize(CONSTANT.AUTHENTICATION_COOKIE_NAME, "", {
    path: "/",
    expires: new Date(0), // Expire immediately
    httpOnly: true,       // Optional: Recommended for security
    sameSite: "lax",      // Optional: Adjust for your case
  }));

  console.log("Logging out...");

  // Redirect to login
  res.writeHead(302, { Location: "/login" });
  res.end();

  // You can't do "after()" in Pages Router. Do post-logout logic here before ending.
  console.log("Logout action completed.");
}
