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
      <h1 className="mt-2 text-2xl">Note: Regular app backend data service is not working and so using simpler backend data service</h1>
      <p className="mt-4 mb-4"> On 30 Nov. 2025, I found that the free graphql backend data service - 
        <a href="https://gql.bhagavadgita.io/graphql" 
        className="mx-1 bg-orange-400 hover:bg-orange-300 active:scale-95">
         https://gql.bhagavadgita.io/graphql
        </a>
        - used by the regular app, is not working. The regular app is dependent on this service 
        to get Bhagavad Gita data to be shown to the user. This graphql backend data service is provided
        by somebody else, and so not in my control.
        I do not think an alternative free graphql backend service for Bhagavad Gita data is available, as of now. 
      </p>
      <p className="mt-4 mb-4">
        For the time being, I am using an alternate, simpler and free JSON backend service&nbsp; 
        <a href="https://vedicscriptures.github.io"
        className="text-blue-600 hover:text-blue-800 underline">
        https://vedicscriptures.github.io
        </a> 
        &nbsp;which provides Bhagavad Gita data in quite a different manner from the original graphql service.
        So I had to simplify the app to use translation and commentary for Gita verses of only one author
         — Swami Sivananda — and therefore disabled the Settings menu item, which previously allowed 
         selection of translators and commentators.
      </p>
      <p className="mt-4 mb-4">
        The basic app functionality of showing Gita chapters and verses with Swami Sivananda translation
        and commentary is working.
        But I have not been able to test the app thoroughly and so there may be some issues. 
      </p>
      <p className="mt-4 mb-4">
        I have&nbsp; 
        <a href="https://github.com/gita/bhagavad-gita-graphql/issues/3"
        className="text-blue-600 hover:text-blue-800 underline">
        put up an issue
        </a>
        &nbsp;in the GitHub repo -&nbsp; 
        <a href="https://github.com/gita/bhagavad-gita-graphql"
        className="bg-orange-400 hover:bg-orange-300 active:scale-95">
            https://github.com/gita/bhagavad-gita-graphql</a>
          &nbsp;- which seems to be associated with the original graphql service. But I do not know if or when it will be fixed.
      </p>
      <p className="mt-4 mb-4">
        To see screenshots of the app when the original graphql backend data service was working, please visit my blog post&nbsp; 
        <a href="https://raviswdev.blogspot.com/2024/08/gita-web-app-nextjs-open-source-v14.html"
        className="text-blue-600 hover:text-blue-800 underline">
        Gita web app (Next.js, open source) v1.4.1...</a>.
      </p>
      <p className="mt-4 mb-4">
        <a href="https://raviswdev.blogspot.com/2025/12/my-gita-web-app-backend-data-service.html"
        className="text-blue-600 hover:text-blue-800 underline">
        This blog post</a>
        &nbsp;has more details about the original graphql service being down issue. Once the graphql backend data service is working again, any Next.js developer can refer to its section&nbsp;
        <a href="https://raviswdev.blogspot.com/2025/12/my-gita-web-app-backend-data-service.html#resetapptomain"
        className="text-blue-600 hover:text-blue-800 underline">
        Resetting app to regular functionality</a>
        &nbsp;to easily deploy the regular functionality app (Open Source, MIT license) on any host. 
        Of course, if at that time I am in a position to update this app deployment myself, I will do so.
      </p>
      <p className="mt-4">Author: Ravi S. Iyer, Date: 3rd December 2025</p>
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
