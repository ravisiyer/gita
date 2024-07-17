import Link from "next/link";
import { getAllChapters } from "../lib/data";
import { GitaChapter } from "../lib/gqltypes-d";

async function Page() {
  let data = await getAllChapters();
  let allGitaChapters: GitaChapter[] = data.allGitaChapters;

  return (
    <div>
      {allGitaChapters.map((chapter) => (
        <div key={chapter.id}>
          <p>chapter.id key:{chapter.id}</p>
          <h4>English Summary</h4>
          <p>
            chapter.chapterSummary blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blahblah blah blahblah blah blahblah blah
            blahblah blah blahblah blah blah blah blah blahblah blah blahblah
            blah blahblah blah blahblah blah blahblah blah blah blah blah
            blahblah blah blahblah blah blahblah blah blahblah blah blahblah
            blah blah blah blah blahblah blah blahblah blah blahblah blah
            blahblah blah blahblah blah blah blah blah blahblah blah blahblah
            blah blahblah blah blahblah blah blahblah blah blah
          </p>
          <h4>English Summary</h4>
          <p>
            chapter.chapterSummary blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blahblah blah blahblah blah blahblah blah
            blahblah blah blahblah blah blah blah blah blahblah blah blahblah
            blah blahblah blah blahblah blah blahblah blah blah blah blah
            blahblah blah blahblah blah blahblah blah blahblah blah blahblah
            blah blah blah blah blahblah blah blahblah blah blahblah blah
            blahblah blah blahblah blah blah blah blah blahblah blah blahblah
            blah blahblah blah blahblah blah blahblah blah blah
          </p>
          <h4>English Summary</h4>
          <p>
            chapter.chapterSummary blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blahblah blah blahblah blah blahblah blah
            blahblah blah blahblah blah blah blah blah blahblah blah blahblah
            blah blahblah blah blahblah blah blahblah blah blah blah blah
            blahblah blah blahblah blah blahblah blah blahblah blah blahblah
            blah blah blah blah blahblah blah blahblah blah blahblah blah
            blahblah blah blahblah blah blah blah blah blahblah blah blahblah
            blah blahblah blah blahblah blah blahblah blah blah
          </p>
          <h4>English Summary</h4>
          <p>
            chapter.chapterSummary blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blahblah blah blahblah blah blahblah blah
            blahblah blah blahblah blah blah blah blah blahblah blah blahblah
            blah blahblah blah blahblah blah blahblah blah blah blah blah
            blahblah blah blahblah blah blahblah blah blahblah blah blahblah
            blah blah blah blah blahblah blah blahblah blah blahblah blah
            blahblah blah blahblah blah blah blah blah blahblah blah blahblah
            blah blahblah blah blahblah blah blahblah blah blah
          </p>
          <h4>English Summary</h4>
          <p>
            chapter.chapterSummary blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blahblah blah blahblah blah blahblah blah
            blahblah blah blahblah blah blah blah blah blahblah blah blahblah
            blah blahblah blah blahblah blah blahblah blah blah blah blah
            blahblah blah blahblah blah blahblah blah blahblah blah blahblah
            blah blah blah blah blahblah blah blahblah blah blahblah blah
            blahblah blah blahblah blah blah blah blah blahblah blah blahblah
            blah blahblah blah blahblah blah blahblah blah blah
          </p>
          <h4>English Summary</h4>
          <p>
            chapter.chapterSummary blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blahblah blah blahblah blah blahblah blah
            blahblah blah blahblah blah blah blah blah blahblah blah blahblah
            blah blahblah blah blahblah blah blahblah blah blah blah blah
            blahblah blah blahblah blah blahblah blah blahblah blah blahblah
            blah blah blah blah blahblah blah blahblah blah blahblah blah
            blahblah blah blahblah blah blah blah blah blahblah blah blahblah
            blah blahblah blah blahblah blah blahblah blah blah
          </p>
          <h4>English Summary</h4>
          <p>
            chapter.chapterSummary blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blahblah blah blahblah blah blahblah blah
            blahblah blah blahblah blah blah blah blah blahblah blah blahblah
            blah blahblah blah blahblah blah blahblah blah blah blah blah
            blahblah blah blahblah blah blahblah blah blahblah blah blahblah
            blah blah blah blah blahblah blah blahblah blah blahblah blah
            blahblah blah blahblah blah blah blah blah blahblah blah blahblah
            blah blahblah blah blahblah blah blahblah blah blah
          </p>
        </div>
      ))}
    </div>
  );
}
export default Page;
