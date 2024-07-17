// import Link from "next/link";
// import { getAllChapters } from "../lib/data";
// import { GitaChapter } from "../lib/gqltypes-d";

async function Page() {
  // let data = await getAllChapters();
  // let allGitaChapters: GitaChapter[] = data.allGitaChapters;

  let arr = new Array(18);
  // console.log("arr.length", arr.length);
  arr.fill(2);
  // arr.map((dummy, index) => console.log(index));

  return (
    <div>
      {arr.map((dummy, index) => (
        <div key={index}>
          {/* {allGitaChapters.map((chapter) => (
        <div key={chapter.id}> */}
          <p>div key:{index}</p>
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
