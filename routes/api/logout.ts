import { deleteCookie } from "$std/http/cookie.ts";

export function handler(req: Request): Response {
  const response = new Response(null, {
    status: 302,
    headers: {
      "location": new URL(req.url).origin,
    },
  });
  deleteCookie(response.headers, "gh_access_token", {
    path: "/"
  });
  return response;
}