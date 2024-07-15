import { GRAPHQL_URI, GRAPHQL_EXPLORER_URI } from "@/app/constants";

function Page() {
  return (
    <div>
      <h2 className="my-5 text-2xl font-bold">About App & Data</h2>
      <p className="my-4 ">
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
      <p className="my-4 ">
        In this app, I am using Tailwind CSS and TypeScript. I have changed the
        navigation bar to a regular web app UI. But, from a source code point of
        view, it no longer is a very simple gita app.
      </p>
      <p className="my-4 ">
        The app uses Next.js and Apollo Client to retrieve Bhagavad Gita
        chapters and verses data from a GraphQL endpoint, and displays it on
        browser. It is shared under free-software MIT license.
      </p>
      <p className="my-4 ">
        Data source (GraphQL endpoint): {GRAPHQL_URI} (GraphQL Explorer:{" "}
        <a
          href={GRAPHQL_EXPLORER_URI}
          className="text-blue-700 visited:text-purple-900 underline"
        >
          {GRAPHQL_EXPLORER_URI}
        </a>
        )
      </p>
      <p className="my-4 ">
        Note that there seems to be a problem with the data associated with
        Swami Sivananda commentaries. Question mark character (?) appears
        frequently in places where I think there should be a comma character
        (,). I have raised the issue on the GitHub repository associated with
        the GraphQL endpoint.
      </p>
      <p className="my-4 ">
        More about this app can be read in{" "}
        <a
          href="https://raviswdev.blogspot.com/2024/06/notes-on-regular-ui-bhagavad-gita.html"
          className="text-blue-700 visited:text-purple-900 underline"
        >
          this associated blog post
        </a>
        .
      </p>
      <p className="my-4 ">
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
      <p className="my-4 ">
        App version: In-progress, Date: 9th July 2024
        <br />
        App author: Ravi S. Iyer
      </p>
    </div>
  );
}
export default Page;
