import Link from "next/link";
import { getAllChapters } from "../lib/data";
// import { getAllChapters } from "./lib/dummydata";
import { GitaChapter } from "../lib/gqltypes-d";

async function Page() {
  let data = await getAllChapters();
  let allGitaChapters: GitaChapter[] = data.allGitaChapters;

  return (
    <div>
      <h2 className="">
        {/* <h2 className="my-5 text-2xl font-bold"> */}
        <p className="text-xl font-bold text-center mt-2">
          Bhagavad Gita Chapter Summaries
        </p>
        <p className="text-3xl font-bold text-center mt-4 mb-2">
          भगवत गीता अध्यायों का सारांश
        </p>
      </h2>
      {allGitaChapters.map((chapter) => (
        <div className="p-2" key={chapter.id}>
          <hr className="border border-gray-400 mb-4" />
          <Link
            href={`/${chapter.chapterNumber}`}
            // className="text-blue-700 visited:text-purple-900 underline"
          >
            <div className=" border border-black bg-orange-400 hover:bg-orange-300 p-2 rounded-md w-72">
              <div className="">
                {/* <div className="my-4 text-lg font-bold"> */}
                <p className="text-lg font-bold">{`Chapter ${chapter.chapterNumber}`}</p>
                <p></p>
                <p className="text-lg font-bold mt-2">
                  {chapter.nameTranslated}
                </p>
                <p className="text-lg font-bold mt-2">{chapter.name}</p>
                {/* {`${chapter.chapterNumber}: ${chapter.nameTranslated} ${chapter.name}`} */}
              </div>
            </div>
          </Link>
          <h4 className="my-4 text-lg font-bold">English Summary</h4>
          <p className="my-4 leading-[1.1]">{chapter.chapterSummary}</p>
          <h4 className="my-4 text-lg font-bold">हिन्दी सारांश</h4>
          <p className="my-4 leading-snug">{chapter.chapterSummaryHindi}</p>
          <Link
            href={`/${chapter.chapterNumber}`}
            // className="text-blue-700 visited:text-purple-900 underline"
          >
            <div className=" border border-black bg-orange-400 hover:bg-orange-300 p-2 rounded-md w-24">
              <p className="text-lg font-bold leading-[1.1]">{`${chapter.versesCount} verses`}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
export default Page;
