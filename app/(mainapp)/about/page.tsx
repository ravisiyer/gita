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
    </div>
  );
}
export default Page;
