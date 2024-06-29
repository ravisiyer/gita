import ChapterSummaries from "./chaptersummaries";
import { Suspense } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="about">
        <Link href="/about">About App & Data</Link>
      </div>
      <Suspense fallback={`Loading ...`}>
        <ChapterSummaries />
      </Suspense>
    </main>
  );
}
