import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { Login } from "../components/Login.tsx";
import { Info } from "../components/Info.tsx";
import { Octokit, App, OAuthApp, createToken } from "https://esm.sh/octokit?dts";

interface Data {
  token: string;
}

const clientId = Deno.env.get("CLIENT_ID") ?? "", clientSecret = Deno.env.get("CLIENT_SECRET") ?? "";

if (!clientId || !clientSecret) throw new Error("Missing CLIENT_ID or CLIENT_SECRET");

export const handler: Handlers = {
  async GET(req, ctx) {
    const cookies = getCookies(req.headers);

    const { token } = await createToken({
      clientId,
      clientSecret,
      code: cookies.code
    });
    return ctx.render({ token });
  },
};

export default function Home({ data }: PageProps<Data>) {
  return data.token
    ? (
      <>
        <p>Welcome!</p>
        <a href="/logout">Logout</a>
        <Info token={data.token} />
      </>
    )
    : <Login clientId={clientId} />;
}
