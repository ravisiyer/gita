import Link from "next/link";
import { getAllChapters } from "./lib/data";
// import { getAllChapters } from "./lib/dummydata";
import { GitaChapter } from "./lib/gqltypes-d";

async function ChapterTiles() {
  let data = await getAllChapters();
  let allGitaChapters: GitaChapter[] = data.allGitaChapters;

  return (
    <div>
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {allGitaChapters.map((chapter) => (
          <div key={chapter.id}>
            <Link href={`/${chapter.chapterNumber}`}>
              <div className=" border border-black bg-orange-400 hover:bg-orange-300 active:scale-95 p-2 h-36 sm:h-40 md:h-48 rounded-md">
                <h3 className="text-lg font-bold">{`Chapter ${chapter.chapterNumber}`}</h3>
                <p className="text-lg font-bold md:line-clamp-2">{`${chapter.nameTranslated}`}</p>
                <p className="text-lg font-bold md:line-clamp-2">{`${chapter.name}`}</p>
                <p className="mt-4 font-bold">{`${chapter.versesCount} verses`}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ChapterTiles;
