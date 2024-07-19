import { Metadata } from "next";
import Link from "next/link";
import { getAllChapters } from "../lib/data";
// import { getAllChapters } from "./lib/dummydata";
import { GitaChapter } from "../lib/gqltypes-d";

export const metadata: Metadata = {
  title: "Chapter Summaries",
};

async function Page() {
  let data = await getAllChapters();
  let allGitaChapters: GitaChapter[] = data.allGitaChapters;

  return (
    <div>
      <h2 className="">
        <span className="block text-xl font-bold text-center mt-2">
          Bhagavad Gita Chapter Summaries
        </span>
        <span className="block text-3xl leading-10 font-bold text-center mt-4 mb-2">
          भगवत गीता अध्यायों का सारांश
        </span>
      </h2>
      {allGitaChapters.map((chapter) => (
        <div className="p-2" key={chapter.id}>
          <hr className="border border-gray-400 mb-4" />
          <div className=" border border-black bg-orange-400 hover:bg-orange-300 active:scale-95 p-2 rounded-md w-72">
            <Link href={`/chapter/${chapter.chapterNumber}`}>
              <div className="">
                <p className="text-lg font-bold">{`Chapter ${chapter.chapterNumber}`}</p>
                <p></p>
                <p className="text-lg font-bold mt-2">
                  {chapter.nameTranslated}
                </p>
                <p className="text-lg font-bold mt-2">{chapter.name}</p>
              </div>
            </Link>
          </div>
          <h4 className="my-4 text-lg font-bold">English Summary</h4>
          <p className="my-4">{chapter.chapterSummary}</p>
          <h4 className="my-4 text-lg font-bold">हिन्दी सारांश</h4>
          <p className="my-4 ">{chapter.chapterSummaryHindi}</p>
          <div className=" border border-black bg-orange-400 hover:bg-orange-300 active:scale-95 p-2 rounded-md w-24">
            <Link href={`/chapter/${chapter.chapterNumber}`}>
              <p className="text-lg font-bold">{`${chapter.versesCount} verses`}</p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Page;
