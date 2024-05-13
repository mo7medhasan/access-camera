 import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
   const user = request.cookies.get("user");
  const token = request.cookies.get("token");
  const IsUser = user && user.value === "user" && token && token.value !== ""?true:false;
 
  if (IsUser) {
    const updatedResponse = NextResponse.redirect(new URL("/", request.url));
     return updatedResponse;
  }else if(
    request?.nextUrl?.pathname==="/profile"&&!IsUser
  ) {

    const updatedResponse = NextResponse.redirect(new URL("/", request.url));
     return updatedResponse;
  }
  
  return NextResponse.next();

}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/signin/:path*", "/signup/:path*", "/profile/:path*"],
};
