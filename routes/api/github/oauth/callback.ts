import { HandlerContext } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  const headers = new Headers();
  const url = new URL(_req.url);
  const code = url.searchParams.get('code');

  if (code) {
    setCookie(headers, {
      name: "code",
      value: code, // this should be a unique value for each session
      maxAge: 120,
      sameSite: "Lax", // this is important to prevent CSRF attacks
      domain: url.hostname,
      path: "/",
      secure: true,
    });
  }
  
  headers.set("location", "/");

  return new Response(null, {
    status: 303,
    headers,
  });
};
