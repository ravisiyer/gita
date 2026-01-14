import { Metadata } from "next";
import Link from "next/link";
import { GRAPHQL_URI, GRAPHQL_EXPLORER_URI } from "@/app/constants/constants";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
};

function Page() {
  return (
    <div>
      <h1 className="mt-2 text-2xl">Note: This app version is a test frontend app used for testing Gita JSON files API</h1>
      <p className="italic text-gray-900 mt-2 p-2">
        Persons interested in
        <a href="https://raviswdev.blogspot.com/2025/12/are-any-persons-interested-in.html"
          className="mx-1 text-blue-600 hover:text-blue-800 underline">
          sponsoring software development for in-progress Gita JSON files API and restoring
          the orignal Gita frontend app&apos;s regular functionality by using the API 
        </a>
        — may email me at riyer02@gmail.com. The software is open source and the development work 
        is being done at deeply discounted rates.
      </p>
      <p className="mt-4 mb-4"> This Gita frontend app version uses
        <a href="https://github.com/ravisiyer/gita-data#readme" 
        className="mx-1 bg-orange-400 hover:bg-orange-300 active:scale-95">
         Bhagavad Gita Static JSON files API - gita-data
        </a>
        and shows only Swami Sivananda translation and commentary.  
      </p>
      <p className="mt-4 mb-4">
        Even though this frontend app seems to be functional with its limited functionality of only one translator 
        and commentator (Swami Sivananda), I view this frontend app as a temporary test frontend app to test the 
        gita-data JSON API. Eventually it should be replaced by a better demo and test frontend project that uses 
        the gita-data JSON files API.
      </p>
      <p className="mt-4 mb-4">
        This frontend app does not use the optimizations of chapters.json, verse.json and translation.json being 
        directly imported into the (Next.js) frontend project as constant JSON objects, which is discussed in the 
        section: Summary of best option for generous free-tier Gita API implementation in 
        <a href="https://raviswdev.blogspot.com/2025/12/create-gita-json-file-rest-api-hosted.html" 
        className="mx-1 bg-orange-400 hover:bg-orange-300 active:scale-95">
        this blog post
        </a>.
        Even without these optimizations, this frontend app usually has acceptable performance with chapter and verse pages being loaded within few seconds (less than 2 seconds in one test). On occassion, it took slightly longer but which too, if I recall correctly, was still less than 5 or max. 10 seconds.
      </p>
      <p className="mt-4 mb-4">
        For implentation details about this app version, please see the
        <a href="https://github.com/ravisiyer/gita/tree/datajson#readme" className="mx-1 bg-orange-400 hover:bg-orange-300 active:scale-95">
          README in this app's datajson branch in its GitHub repository
        </a>.
      </p>
      <p className="mt-4">Author: Ravi S. Iyer, Date: 14th January 2026</p>
      <p className="mt-4 mb-4">
        The contents below are from the previous version of the app, before the original graphql backend data service went down.
      </p>
      <hr className="border-t-2 border-gray-500"/>
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
      <p className="mt-4">Web app version: 1.4.1, Date: 5th September 2024</p>
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
      <p>
        Application icon{" "}
        <a
          href="https://www.freepik.com/icons/bhagavad-gita"
          className="underline"
        >
          <Image
            src="/icon.ico"
            alt="Shree icon"
            width={32}
            height={32}
            className="inline"
          />{" "}
          by Freepik
        </a>
      </p>
    </div>
  );
}
export default Page;
