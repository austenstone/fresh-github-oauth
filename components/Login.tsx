interface LoginProps {
  clientId: string;
}

export function Login(props: LoginProps) {
  const githubLoginEndpoint =
    `https://github.com/login/oauth/authorize?client_id=${props.clientId}`;

  return (
    <a href={githubLoginEndpoint}>
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
        <img class="fill-current w-6 h-6 mr-2" src="/github-mark.svg" />
        <span>Sign in with GitHub</span>
      </button>
    </a>
  );
}
