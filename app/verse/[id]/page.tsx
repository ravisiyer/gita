import { Metadata } from "next";
import { getVerse } from "@/app/lib/data";
// import { getVerse } from "@/app/lib/dummydata";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getCVNumbersFromVerseId, getValNumericVerseId } from "@/app/lib/util";
import { GitaVerse } from "@/app/lib/gqltypes-d";
import Verse from "@/app/ui/verse";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const chapVerseNumbers = getCVNumbersFromVerseId(params.id);
  return {
    title: `Chapter ${chapVerseNumbers.chapterNumber}, Verse ${chapVerseNumbers.verseNumber}`,
  };
}

async function Page({ params }: { params: { id: string } }) {
  const verseId = params.id;

  const valVerseId = getValNumericVerseId(verseId);
  if (!valVerseId.valid) {
    notFound();
  }
  const numericVerseId = valVerseId.numericVerseId;

  let data = await getVerse(verseId);
  let gitaVerse: GitaVerse = data.gitaVerse;
  return <Verse gitaVerse={gitaVerse} />;
}
export default Page;
