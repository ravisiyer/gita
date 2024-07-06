import { GRAPHQL_URI, GRAPHQL_EXPLORER_URI } from "@/app/constants";

function Page() {
  return (
    <div>
      <h1 className="my-5 text-2xl font-bold">About App & Data</h1>
      <p className="my-4 leading-[1.1]">
        This app. is being developed on top of{" "}
        <a
          href="https://github.com/ravisiyer/verysimplegita"
          className="text-blue-700 visited:text-purple-900 underline"
        >
          Very Simple Gita
        </a>{" "}
        which is a very simple but functional, open-source freeware, Bhagavad
        Gita web app.
      </p>
      <p className="my-4 leading-[1.1]">
        In this app. I plan to add regular web UI features. I am using Tailwind
        CSS and TypeScript. But it no longer will be a very simple gita app.
      </p>
      <p className="my-4 leading-[1.1]">
        The app. uses Next.js and Apollo Client to retrieve Bhagavad Gita
        chapters and verses data from a GraphQL endpoint, and displays it on
        browser. It is shared under free-software MIT license.
      </p>
      <p className="my-4 leading-[1.1]">
        Data source (GraphQL endpoint): {GRAPHQL_URI} (GraphQL Explorer:{" "}
        <a
          href={GRAPHQL_EXPLORER_URI}
          className="text-blue-700 visited:text-purple-900 underline"
        >
          {GRAPHQL_EXPLORER_URI}
        </a>
        )
      </p>
      <p className="my-4 leading-[1.1]">
        More about this app can be read in{" "}
        <a
          href="https://raviswdev.blogspot.com/2024/06/notes-on-regular-ui-bhagavad-gita.html"
          className="text-blue-700 visited:text-purple-900 underline"
        >
          this associated blog post
        </a>
        .
      </p>
      <p className="my-4 leading-[1.1]">
        App GitHub{" "}
        <a
          href="https://github.com/ravisiyer/gita"
          className="text-blue-700 visited:text-purple-900 underline"
        >
          repository
        </a>{" "}
        and associated{" "}
        <a
          href="https://github.com/ravisiyer/gita/blob/main/README.md"
          className="text-blue-700 visited:text-purple-900 underline"
        >
          README
        </a>
        .
      </p>
      <p className="my-4 leading-[1.1]">
        App version: In-progress, Date: 6th July 2024
        <br />
        App author: Ravi S. Iyer
      </p>
    </div>
  );
}
export default Page;
