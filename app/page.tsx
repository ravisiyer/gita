import ChapterSummaries from "./chaptersummaries";
import { Suspense } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <Suspense fallback={`Loading ...`}>
      <ChapterSummaries />
    </Suspense>
  );
}
