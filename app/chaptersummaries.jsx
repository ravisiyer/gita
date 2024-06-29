import Link from "next/link";
import { getAllChapters } from "./lib/data";
// import { getAllChapters } from "./lib/dummydata";

async function ChapterSummaries() {
  let data = await getAllChapters();
  let allGitaChapters = data.allGitaChapters;

  return (
    <div>
      <h2 className="mt-5 mb-5 mr-5 text-2xl font-bold">
        Bhagavad Gita Chapter Summaries भगवत गीता अध्यायों का सारांश
      </h2>
      {allGitaChapters.map((chapter) => (
        <div key={chapter.id}>
          <Link href={`/${chapter.chapterNumber}`}>
            <h3 className="mt-4 mb-4 mr-4 text-lg font-bold">{`${chapter.chapterNumber}: ${chapter.nameTranslated} ${chapter.name}`}</h3>
          </Link>
          <h4 className="mt-4 mb-4 mr-4 font-bold">English Summary</h4>
          {/* text-base seems to be default and so am omitting it above. */}
          <p className="mt-4 mb-4 mr-4 leading-tight">
            {chapter.chapterSummary}
          </p>
          <h4 className="mt-4 mb-4 mr-4 font-bold">हिन्दी सारांश</h4>
          <p className="mt-4 mb-4 mr-4 leading-tight">
            {chapter.chapterSummaryHindi}
          </p>
          <Link href={`/${chapter.chapterNumber}`}>
            <p className="mt-4 mb-4 mr-4 leading-tight">{`${chapter.versesCount} verses`}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
export default ChapterSummaries;
