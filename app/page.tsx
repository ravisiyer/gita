import ChapterSummaries from "./chaptersummaries";
import { Suspense } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-between items-center">
      <div className="mx-auto max-w-4xl p-4 scroll-mt-16">
        <Suspense fallback={`Loading ...`}>
          <ChapterSummaries />
        </Suspense>
      </div>
    </main>
  );
}
