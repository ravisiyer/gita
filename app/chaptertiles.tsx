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
          <div className="w-1/2 border border-black p-2" key={chapter.id}>
            <Link
              href={`/${chapter.chapterNumber}`}
              className="text-blue-700 visited:text-purple-900 underline"
            >
              <h3 className="my-4 text-lg font-bold">{`${chapter.chapterNumber}: ${chapter.nameTranslated} ${chapter.name}`}</h3>
            </Link>
            {/* <h4 className="my-4 font-bold">English Summary</h4>
          <p className="my-4 leading-[1.1]">{chapter.chapterSummary}</p>
          <h4 className="my-4 font-bold">हिन्दी सारांश</h4>
          <p className="my-4 leading-snug">{chapter.chapterSummaryHindi}</p> */}
            <Link
              href={`/${chapter.chapterNumber}`}
              className="text-blue-700 visited:text-purple-900 underline"
            >
              <p className="my-4 leading-[1.1]">{`${chapter.versesCount} verses`}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ChapterTiles;
