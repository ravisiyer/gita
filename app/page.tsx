// import ChapterSummaries from "./chaptersummaries";
import ChapterTiles from "./chaptertiles";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>
        <Image
          src="/hero-desktop.jpg"
          alt="Hero Image"
          width={896}
          height={538}
          className="hidden md:block"
          // Image aspect ratio is retained with width:896 and height:538.
          // Hi-res image is 3040x1824. Compressed image is lesser.
        />
        <Image
          src="/hero-mobile.jpg"
          alt="Hero Image"
          width={768}
          height={888}
          className="block md:hidden"
          // Image aspect ratio is retained with width:768 and height:888.
          // Hi-res image is 1578x1824. Compressed image is lesser.
        />
      </div>
      <h1 className="text-xl font-bold">Bhagavad Gita - The Song of God</h1>
      <h3 className="text-xl font-bold">
        Sacred Hindu Scripture Revered Across Millennia
      </h3>
      <Link href="/chaptersummaries">
        <div className=" border border-black bg-orange-400 hover:bg-orange-300 p-2 my-2 ">
          {/* <div className=" border border-black bg-orange-400 hover:bg-orange-300 p-2 my-2 md:mx-2 "> */}
          <h3 className="text-lg font-bold">
            {/* Bhagavad Gita Chapter Summaries भगवत गीता अध्यायों का सारांश */}
            <p>Chapter Summaries</p>
            <p>अध्यायों का सारांश</p>
          </h3>
        </div>
      </Link>

      <Suspense fallback={`Loading ...`}>
        <ChapterTiles />
        {/* <ChapterSummaries /> */}
      </Suspense>
      <hr className="border border-gray-400 mt-2" />
      <p className="text-xs text-right">
        Top of page photo by{" "}
        <a href="https://unsplash.com/@drone4inspection?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
          Oleg Churakov
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/photos/a-statue-of-a-religious-figure-AKR89I3xf94?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
          Unsplash
        </a>
      </p>
    </>
  );
}
