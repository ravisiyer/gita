"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  getValNumericChapterNumber,
  getValNumericVerseNumber,
  calcNumericVerseId,
  getMaxVersesInChapter,
} from "../lib/util";
import {
  FIRST_CHAPTERNUMBER,
  LAST_CHAPTERNUMBER,
  MIN_VERSE_NUMBER_IN_ALL_CHAPTERS,
  MAX_VERSE_NUMBER_IN_ALL_CHAPTERS,
  NUMBER_OF_VERSES_IN_CHAPTERS,
} from "../constants";

// idSuffix is used to differentiate between SelectChapterVerse's input element ids if two parent
// Navbar components are used on same page - e.g. at top of page and bottom of page.
// Note that HTML spec. states that each element id must be unique
function SelectChapterVerse({
  initialChapterNumber = "",
  initialVerseNumber = "",
  idSuffix = "",
}) {
  const [chapterNumber, setChapterNumber] = useState("");
  const [verseNumber, setVerseNumber] = useState("");

  // console.log("SCV: initialChapterNumber: ", initialChapterNumber);
  // console.log("SCV: initialVerseNumber: ", initialVerseNumber);
  // console.log("SCV: chapterNumber: ", chapterNumber);
  // console.log("SCV: verseNumber: ", verseNumber);

  useEffect(() => {
    setChapterNumber(initialChapterNumber);
    setVerseNumber(initialVerseNumber);
    // console.log(
    //   "SCV UseEffect: Set chapter and verse number state variables to passed & changed props"
    // );
  }, [initialChapterNumber, initialVerseNumber]);

  const { replace } = useRouter();

  function handleSubmit(e) {
    // console.log("SCV handleSubmit handler invoked.");
    e.preventDefault();
    const chapterErrorMessage =
      `For chapter (Ch.), please specify a number between ` +
      `${FIRST_CHAPTERNUMBER} and ${LAST_CHAPTERNUMBER}`;

    const valChapterNumber = getValNumericChapterNumber(chapterNumber);
    if (!valChapterNumber.valid) {
      alert(chapterErrorMessage);
      return;
    }
    const numericChapterNumber = valChapterNumber.numericChapterNumber;

    if (verseNumber.trim() === "") {
      replace(`/${chapterNumber}`);
      return;
    }
    const verseErrorMessage =
      `For verse (Ve.) in chapter (Ch.) ${numericChapterNumber}, please specify a number between ` +
      `${MIN_VERSE_NUMBER_IN_ALL_CHAPTERS} and ` +
      `${NUMBER_OF_VERSES_IN_CHAPTERS[numericChapterNumber - 1]}`;

    const valVerseNumber = getValNumericVerseNumber(
      verseNumber,
      numericChapterNumber
    );
    if (!valVerseNumber.valid) {
      alert(verseErrorMessage);
      return;
    }
    const numericVerseNumber = valVerseNumber.numericVerseNumber;
    const numericVerseId = calcNumericVerseId(
      numericChapterNumber,
      numericVerseNumber
    );
    replace(`/verse/${numericVerseId}`);
  }

  const idChapterNumber = `chapternumber${idSuffix}`;
  const idVerseNumber = `versenumber${idSuffix}`;

  return (
    <form className="SelectChapterVerse" onSubmit={handleSubmit}>
      <label htmlFor={idChapterNumber}>Ch.</label>
      <input
        className="border border-neutral-500 leading-none w-12 text-sm py-px px-0.5"
        // className="border-2 border-zinc-500 leading-none w-11"
        // className="border-2 border-black"
        type="number"
        id={idChapterNumber}
        size="2"
        min={FIRST_CHAPTERNUMBER}
        max={LAST_CHAPTERNUMBER}
        required
        value={chapterNumber}
        onChange={(e) => {
          setChapterNumber(e.target.value);
        }}
      />
      <label htmlFor={idVerseNumber}>Ve.</label>
      <input
        className="border border-neutral-500 leading-none w-12 text-sm py-px px-0.5"
        type="number"
        id={idVerseNumber}
        size="2"
        min={MIN_VERSE_NUMBER_IN_ALL_CHAPTERS}
        max={
          !chapterNumber || chapterNumber.trim() === ""
            ? MAX_VERSE_NUMBER_IN_ALL_CHAPTERS
            : getMaxVersesInChapter(chapterNumber)
        }
        value={verseNumber}
        onChange={(e) => {
          setVerseNumber(e.target.value);
        }}
      />
      <input type="submit" value="Go" className="text-sm" />
    </form>
  );
}
export default SelectChapterVerse;
