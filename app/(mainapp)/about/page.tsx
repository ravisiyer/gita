import { Metadata } from "next";
import Link from "next/link";
import { GRAPHQL_URI, GRAPHQL_EXPLORER_URI } from "@/app/constants/constants";

export const metadata: Metadata = {
  title: "About",
};

function Page() {
  return (
    <div>
      <h2 className="my-5 text-2xl font-bold">About Web App & Data</h2>
      <p className="my-4">
        This is a text only (without audio/video) Gita web app (Next.js, open
        source, freeware).
      </p>
      <p className="my-4">
        For its data, this Gita web app uses a public GraphQL endpoint:{" "}
        {GRAPHQL_URI} (GraphQL Explorer:{" "}
        <a
          href={GRAPHQL_EXPLORER_URI}
          className="text-blue-700 visited:text-purple-900 underline"
        >
          {GRAPHQL_EXPLORER_URI}
        </a>
        ), with possibly this{" "}
        <a
          href="https://github.com/gita/bhagavad-gita-graphql"
          className="text-blue-700 visited:text-purple-900 underline"
        >
          GitHub repository
        </a>
        . I do not know how stable this data source is but for the past few
        months that I have been using it, it has been available all the time and
        been stable. This data source seems to be using a subset of data of{" "}
        <a
          href="https://www.gitasupersite.iitk.ac.in/srimad?language=dv&field_chapter_value=1&field_nsutra_value=1"
          className="text-blue-700 visited:text-purple-900 underline"
        >
          IIT Kanpur's Gita Super Site
        </a>
        , which publicly shares translations and commentaries of famous
        spiritual figures from India like{" "}
        <a
          href="https://en.wikipedia.org/wiki/Sivananda_Saraswati"
          className="text-blue-700 visited:text-purple-900 underline"
        >
          Swami Sivananda
        </a>
        ,{" "}
        <a
          href="https://en.wikipedia.org/wiki/Chinmayananda_Saraswati"
          className="text-blue-700 visited:text-purple-900 underline"
        >
          Swami Chinmayananda
        </a>
        ,{" "}
        <a
          href="https://en.wikipedia.org/wiki/Swami_Adidevananda"
          className="text-blue-700 visited:text-purple-900 underline"
        >
          Swami Adidevananda
        </a>{" "}
        and{" "}
        <a
          href="https://en.wikipedia.org/wiki/Gambhirananda"
          className="text-blue-700 visited:text-purple-900 underline"
        >
          Swami Gambirananda
        </a>
        . The Sanskrit commentaries of renowned ancient masters like Sri
        Shankaracharya, Sri Ramanujacharya and Sri Madhavacharya are also part
        of this data.
      </p>
      <p className="my-4">
        This Gita web app is able to utilize the above-mentioned awesome GraphQL
        data resource to show translations and commentaries of above mentioned
        spiritual masters and more. As it is a responsive web app, the app is
        accessible from Internet browsers (like Chrome/Edge/Safari) on PC
        desktop/laptop, Android mobile and Apple (iphone) mobile (and tablets
        though I have not tested it on tablets). Please note that it is NOT a
        native mobile (Android/iPhone) app.
      </p>
      {/* <p className="my-4">
        Data source (GraphQL endpoint): {GRAPHQL_URI} (GraphQL Explorer:{" "}
        <a
          href={GRAPHQL_EXPLORER_URI}
          className="text-blue-700 visited:text-purple-900 underline"
        >
          {GRAPHQL_EXPLORER_URI}
        </a>
        )
      </p> */}
      {/* <p className="my-4">
        More about this web app can be read in{" "}
        <a
          href="https://raviswdev.blogspot.com/2024/07/gita-app-v10-pathway-to-self-learn.html"
          className="text-blue-700 visited:text-purple-900 underline"
        >
          this associated blog post
        </a>
        .
      </p> */}
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
        . This README provides more details about the app.
      </p>
      <p className="mt-4">
        Web app version: 1.4, Date: 30th August 2024
        <br />
        Web app author: Ravi S. Iyer
      </p>
      {/* <h3 className="text-lg font-bold mt-2">Footnotes</h3>
      <ol className="list-decimal list-outside ml-4">
        <li>
          This Gita web app uses Next.js and Apollo Client to retrieve Bhagavad
          Gita chapters and verses data from a GraphQL endpoint, and displays it
          on browser. It also uses Tailwind CSS and TypeScript.
        </li>
        <li>
          There seems to be a question mark character problem with the data
          associated with some commentaries for which I am providing a temporary
          fix in the app.{" "}
          <Link
            href="/qmarkissue"
            className="text-blue-700 visited:text-purple-900 underline"
          >
            See more info on it.
          </Link>
        </li>
        <li>
          An important objective of this app development has been to provide a
          pathway to self-learner students to follow the path I used to learn
          the required technologies and develop this app. I have made extensive
          notes about the path I used in the blog some of whose posts are
          mentioned below.
        </li>
        <li>
          Some more info. about this web app can be read in the following blog
          posts, one for each release version of this app:
          <ul>
            <li>
              <a
                href="https://raviswdev.blogspot.com/2024/08/gita-web-app-nextjs-open-source-v14.html"
                className="text-blue-700 visited:text-purple-900 underline"
              >
                Version 1.4 (this version)
              </a>
            </li>
            <li>
              <a
                href="https://raviswdev.blogspot.com/2024/08/gita-web-app-nextjs-open-source-v13.html"
                className="text-blue-700 visited:text-purple-900 underline"
              >
                Version 1.3
              </a>
            </li>
            <li>
              <a
                href="https://raviswdev.blogspot.com/2024/08/gita-web-app-nextjs-open-source-v12.html"
                className="text-blue-700 visited:text-purple-900 underline"
              >
                Version 1.2
              </a>
            </li>
            <li>
              <a
                href="https://raviswdev.blogspot.com/2024/08/added-settings-page-to-gita-web-app-to.html"
                className="text-blue-700 visited:text-purple-900 underline"
              >
                Version 1.1
              </a>
            </li>
            <li>
              <a
                href="https://raviswdev.blogspot.com/2024/07/gita-app-v10-pathway-to-self-learn.html"
                className="text-blue-700 visited:text-purple-900 underline"
              >
                Version 1.0
              </a>
            </li>
          </ul>
        </li>
        <li>
          <p className="">
            This Gita web app has been developed on top of{" "}
            <a
              href="https://github.com/ravisiyer/verysimplegita"
              className="text-blue-700 visited:text-purple-900 underline"
            >
              Very Simple Gita
            </a>{" "}
            which is a very simple but functional, open-source freeware,
            Bhagavad Gita web app. I have changed the User Interface (UI) of
            this app to a regular web app UI. But, from a source code point of
            view, it no longer is a very simple Gita app. Students and other
            learners may want to first go through the source code of Very Simple
            Gita app before going through this app&apos;s source code.
          </p>
        </li>
      </ol> */}
    </div>
  );
}
export default Page;
