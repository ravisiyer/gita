import ChapterSummaries from "./chaptersummaries";
import { Suspense } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="mt-2 mr-2 text-right">
        {/* <div className="about"> */}
        <Link
          href="/about"
          className="text-blue-600 visited:text-purple-900 underline"
        >
          About App & Data
        </Link>
      </div>
      <Suspense fallback={`Loading ...`}>
        <ChapterSummaries />
      </Suspense>
    </main>
  );
}
