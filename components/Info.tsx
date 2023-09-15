import { PageProps } from "$fresh/server.ts";

interface token {
  token: string;
}

export function Info({ data }: PageProps<token>) {
  return <p>Welcome!</p>;
}
