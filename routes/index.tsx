import { gitHubApi } from "../github.ts";
import { HandlerContext, PageProps } from "$fresh/server.ts";
import { getCookies, setCookie } from "$std/http/cookie.ts";

export async function handler(
  req: Request,
  ctx: HandlerContext,
): Promise<Response> {
  const maybeAccessToken = getCookies(req.headers)["gh_access_token"];
  if (maybeAccessToken) {
    try {
      const userData = await gitHubApi.getUserData(maybeAccessToken);
      if (userData) {
        return ctx.render(userData);
      }
    } catch {
      return Response.redirect(`${new URL(req.url).origin}/api/logout`);
    }
  }

  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return ctx.render(false);
  }

  let accessToken;
  try {
    accessToken = await gitHubApi.getAccessToken(code);
  } catch {
    return ctx.render(false);
  }
  const userData = await gitHubApi.getUserData(accessToken);

  const response = await ctx.render(userData);
  setCookie(response.headers, {
    name: "gh_access_token",
    value: accessToken,
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  return response;
}

export default function Home({ url, data }: PageProps) {
  return data ? (
    <div>
      <a href="/api/logout"><button>Sign Out</button></a>
      <h1>{data.userName} ({data.userId})</h1>
      <img src={data.avatarUrl} alt="avatar" />
    </div>
  ) : (
    <a href="/api/login"><button>Sign In</button></a>
  );
}
