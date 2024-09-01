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
        This Gita web app (Next.js, open source, freeware) shows Gita verse
        text, transliteration and word meaning, along with translations and
        commentaries in English, Hindi and Sanskrit. It does not have Gita verse
        audio facility. It is a frontend app depending on a backend developed
        and deployed by others for its data.
      </p>
      <p className="my-4">
        The backend data service for this Gita web app is a public GraphQL
        endpoint: {GRAPHQL_URI} (GraphQL Explorer:{" "}
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
          IIT Kanpur&apos;s Gita Super Site
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
      <p className="mt-4">Web app version: 1.4, Date: 1st September 2024</p>
      <div className="my-4 flex flex-col md:flex-row gap-y-4 md:gap-x-8">
        <a
          href="https://raviswdev.blogspot.com/2024/08/gita-web-app-nextjs-open-source-v14.html"
          className="text-blue-700 visited:text-purple-900 underline"
          // className="text-blue-700 visited:text-purple-900 underline text-lg md:text-base"
          // Samsung M21 Android mobile needs text-lg otherwise the font is smaller than text above and below it
          // Don't know why. Right now, don't have time to invest in figuring out a proper solution. So this hack
          // which is repeated for next a element below
          // But Chrome on desktop with mobile mode (Inspect) does not have the same problem. So commented out
          // the above hack. Perhaps it is a Samsung M21 issue.
        >
          Blog post
          <span className="hidden md:inline">
            &nbsp;about this web app version
          </span>{" "}
          with screenshots
        </a>
        <a
          href="https://github.com/ravisiyer/gita"
          className="text-blue-700 visited:text-purple-900 underline"
          // className="text-blue-700 visited:text-purple-900 underline text-lg md:text-base"
        >
          Web app GitHub repository
        </a>
      </div>
      <p className="mt-4">Web app author: Ravi S. Iyer</p>
    </div>
  );
}
export default Page;
