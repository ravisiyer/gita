import Link from "next/link";
import { getAllChapters } from "./lib/data";
// import { getAllChapters } from "./lib/dummydata";
import { GitaChapter } from "./lib/gqltypes-d";

async function ChapterTiles() {
  let data = await getAllChapters();
  let allGitaChapters: GitaChapter[] = data.allGitaChapters;

  return (
    <div>
      <h2 className="my-5 text-2xl font-bold">
        Bhagavad Gita Chapters भगवत गीता अध्याय
      </h2>
      <div className="flex flex-wrap">
        {/* <div className="flex flex-col flex-wrap"> */}
        {allGitaChapters.map((chapter) => (
          <div className="w-full sm:w-1/2 md:w-1/4" key={chapter.id}>
            {/* <div className="w-1/2 " key={chapter.id}> */}
            <Link
              href={`/${chapter.chapterNumber}`}
              // className="text-blue-700 visited:text-purple-900 underline"
            >
              <div className=" border border-black bg-orange-400 hover:bg-orange-300 p-2 m-2 h-36 sm:h-40 md:h-56">
                <h3 className="text-lg font-bold">{`Chapter ${chapter.chapterNumber}`}</h3>
                <p className="text-lg font-bold">{`${chapter.nameTranslated}`}</p>
                <p className="text-lg font-bold">{`${chapter.name}`}</p>
                {/* <h3 className="my-4 text-lg font-bold">{`${chapter.chapterNumber}: ${chapter.nameTranslated} ${chapter.name}`}</h3> */}
                <p className="mt-4 leading-[1.1] font-bold">{`${chapter.versesCount} verses`}</p>
              </div>
            </Link>
            {/* <h4 className="my-4 font-bold">English Summary</h4>
          <p className="my-4 leading-[1.1]">{chapter.chapterSummary}</p>
          <h4 className="my-4 font-bold">हिन्दी सारांश</h4>
          <p className="my-4 leading-snug">{chapter.chapterSummaryHindi}</p> */}
            {/* <Link
              href={`/${chapter.chapterNumber}`}
              className="text-blue-700 visited:text-purple-900 underline"
            >
              <p className="my-4 leading-[1.1]">{`${chapter.versesCount} verses`}</p>
            </Link> */}
          </div>
        ))}
      </div>
    </div>
  );
}
export default ChapterTiles;
