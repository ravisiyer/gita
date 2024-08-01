import { Metadata } from "next";
import Link from "next/link";
import { GRAPHQL_URI, GRAPHQL_EXPLORER_URI } from "@/app/constants";

export const metadata: Metadata = {
  title: "About",
};

function Page() {
  return (
    <div>
      <h2 className="my-5 text-2xl font-bold">About Web App & Data</h2>
      <p className="my-4">
        This Gita web app has been developed on top of{" "}
        <a
          href="https://github.com/ravisiyer/verysimplegita"
          className="text-blue-700 visited:text-purple-900 underline"
        >
          Very Simple Gita
        </a>{" "}
        which is a very simple but functional, open-source freeware, Bhagavad
        Gita web app.
      </p>
      <p className="my-4">
        I have changed the User Interface (UI) of this app to a regular web app
        UI. But, from a source code point of view, it no longer is a very simple
        Gita app. Students and other learners may want to first go through the
        source code of Very Simple Gita app before going through this app&apos;s
        source code.
      </p>
      <p className="my-4">
        This Gita web app uses Next.js and Apollo Client to retrieve Bhagavad
        Gita chapters and verses data from a GraphQL endpoint, and displays it
        on browser. It also uses Tailwind CSS and TypeScript.
      </p>
      <p className="my-4">
        This Gita web app is open-source and shared under free-software MIT
        license.
      </p>
      <p className="my-4">
        Data source (GraphQL endpoint): {GRAPHQL_URI} (GraphQL Explorer:{" "}
        <a
          href={GRAPHQL_EXPLORER_URI}
          className="text-blue-700 visited:text-purple-900 underline"
        >
          {GRAPHQL_EXPLORER_URI}
        </a>
        )
      </p>
      <p className="my-4">
        Note that there seems to be a question mark character problem with the
        data associated with some commentaries.{" "}
        <Link
          href="/qmarkissue"
          className="text-blue-700 visited:text-purple-900 underline"
        >
          See more info on it.
        </Link>
      </p>
      <p className="my-4">
        More about this web app can be read in{" "}
        <a
          href="https://raviswdev.blogspot.com/2024/07/gita-app-v10-pathway-to-self-learn.html"
          className="text-blue-700 visited:text-purple-900 underline"
        >
          this associated blog post
        </a>
        .
      </p>
      <p className="my-4">
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
      <p className="mt-4">
        Web app version: Minor improvement to 1.1, Date: 1st August 2024
        <br />
        Web app author: Ravi S. Iyer
      </p>
    </div>
  );
}
export default Page;
