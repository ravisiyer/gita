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
      <div className="">
        <h1 className="font-bold italic text-yellow-200 bg-slate-700 mt-2 p-2 rounded-md">
          <span className="block text-3xl">
            Bhagavad Gita - The Song of God
          </span>
          <span className="block text-xl">
            Sacred Hindu Scripture, Revered Across Millennia
          </span>
        </h1>
        <Link href="/chaptersummaries">
          <div className=" border border-black bg-orange-400 hover:bg-orange-300 active:scale-95 p-2 my-2 rounded-md">
            <h3 className="text-lg font-bold">
              <span className="block">Chapter Summaries</span>
              <span className="block">अध्यायों का सारांश</span>
            </h3>
          </div>
        </Link>

        <Suspense fallback={`Loading ...`}>
          <ChapterTiles />
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
      </div>
    </>
  );
}
