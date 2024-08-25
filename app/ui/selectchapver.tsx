"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  getValNumericChapterNumber,
  getValNumericVerseNumber,
  calcNumericVerseId,
  getMaxVersesInChapter,
  getValNumericVerseId,
  getCVNumbersFromVerseId,
} from "../lib/util";
import {
  FIRST_CHAPTERNUMBER,
  LAST_CHAPTERNUMBER,
  MIN_VERSE_NUMBER_IN_ALL_CHAPTERS,
  MAX_VERSE_NUMBER_IN_ALL_CHAPTERS,
  NUMBER_OF_VERSES_IN_CHAPTERS,
  SCV_VERSE_LABEL,
  SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR,
} from "../constants/constants";
import SetupCOrVLB from "./setupcorvlb";
import clsx from "clsx";
import NProgress from "nprogress";

// idSuffix is used to differentiate between SelectChapterVerse's input element ids if two parent
// Navbar components are used on same page - e.g. at top of page and bottom of page.
// Note that HTML spec. states that each element id must be unique
function SelectChapterVerse({
  initialChapterNumber = SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR,
  initialVerseNumber = SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR,
  idSuffix = "",
  closeMobileMenuIfOpen,
}: {
  initialChapterNumber: string;
  initialVerseNumber: string;
  idSuffix: string;
  closeMobileMenuIfOpen: () => void;
}) {
  const [sCVChapterNumber, setSCVChapterNumber] = useState(
    SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR
  );
  const [sCVVerseNumber, setSCVVerseNumber] = useState(
    SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR
  );
  //Below onlyUIVerseNumberReset state variable is a hack to handle specific condition; Later refactor to avoid hack
  // const [onlyUIVerseNumberReset, setOnlyUIVerseNumberReset] = useState(false);
  // const [disableGo, setDisableGo] = useState(false);
  const [disableGo, setDisableGo] = useState(true);

  // console.log("SCV: initialChapterNumber: ", initialChapterNumber);
  // console.log("SCV: initialVerseNumber: ", initialVerseNumber);
  // console.log("SCV: sCVChapterNumber: ", sCVChapterNumber);
  // console.log("SCV: sCVVerseNumber: ", sCVVerseNumber);

  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    setSCVChapterNumber(initialChapterNumber);
    setSCVVerseNumber(initialVerseNumber);
    // console.log(
    //   `SCV UseEffect: Set chapter and verse number state variables to passed & changed props: initialChapterNumber: ${initialChapterNumber}, initialVerseNumber :${initialVerseNumber}`
    // );
  }, [initialChapterNumber, initialVerseNumber]);

  useEffect(() => {
    const pathSegments = pathname.split("/");
    let pathChapterNumber;
    let pathVerseId;
    let valPathVerseId;
    let pathChapVerseNumbers;
    if (pathSegments.length === 3 && pathSegments[1] === "chapter") {
      pathChapterNumber = pathSegments[2];
      if (sCVChapterNumber === pathChapterNumber) {
        if (sCVVerseNumber === SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR) {
          //We are already on the required chapter page
          // console.log(
          //   "In SCV sCVChapterNumber useEffect: We are already on the required chapter page. Disable Go and return"
          // );
          setDisableGo(true);
          return;
        } else {
          // User seems to have clicked on a valid verse number ... We should go to that chapter + verse
          // As of now, we don't do anything as user has to press Go button
        }
      } else {
        // User may have chosen a different chapter than we are on currently
        const valChapterNumber = getValNumericChapterNumber(sCVChapterNumber);
        if (valChapterNumber.valid) {
          if (sCVVerseNumber !== SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR) {
            const valVerseNumber = getValNumericVerseNumber(
              sCVVerseNumber,
              valChapterNumber.numericChapterNumber
            );
            if (!valVerseNumber.valid) {
              setSCVVerseNumber(SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR);
              // Now we have to wait for user to click Go button. So return
              return;
            }
          }
          // below else is for SCV verse number i.e. list box verse number  not specified
          // we don't have to do anything now. If user wants to go to the chapter he has
          // specified, he clicks on Go button
          // else {
          // }
        }
        // below else is for invalid SCV Chapter Number. I think that may not happen here
        // as SCV Chapter Number may be invalid only for non /chapter/ links. Here we
        // are handling /chapter/ links
        // else {}
      }
    } else if (pathSegments.length === 3 && pathSegments[1] === "verse") {
      pathVerseId = pathSegments[2];
      valPathVerseId = getValNumericVerseId(pathVerseId);
      if (valPathVerseId.valid) {
        const numericVerseId = valPathVerseId.numericVerseId;
        pathChapVerseNumbers = getCVNumbersFromVerseId(pathVerseId);
        if (
          sCVChapterNumber === pathChapVerseNumbers.chapterNumber &&
          sCVVerseNumber === pathChapVerseNumbers.verseNumber
        ) {
          //We are already on the required chapter and verse page
          // console.log(
          //   "In SCV chapterNumber useEffect: We are already on the required chapter and verse page. Disable Go and return"
          // );
          setDisableGo(true);
          return;
        } else {
          //If path chapter number is 18 and path verse is 78 but chapterNumber is 1 (as user chose it), we may come here
          //As verse no. 78 is invalid for chap. 1, we should reset verse number if verse number is invalid
          const numericChapterNumber = parseInt(sCVChapterNumber);
          if (numericChapterNumber) {
            const tmp = getValNumericVerseNumber(
              sCVVerseNumber,
              numericChapterNumber
            );
            if (!tmp.valid) {
              setSCVVerseNumber(SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR);
            }
            // Below else is for valid SCV Verse number. We need not do anything now for it
            // else {}
          }
          // Below else may be unreachable.
          // else {}
          // Now we have to wait for user to click Go button.
        }
      } else {
        // Will we come here? I think yes, when user types in url like /verse/1000
        // We need not do anything here
      }
    }
    // below else condition would match home page, about page etc.
    else {
      if (sCVChapterNumber === SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR) {
        setDisableGo(true);
        return;
      }
    }

    // Here we need to check if we need to go to a particular chapter or verse and do so if needed.
    // But in intial version we can wait for Go button press.
    setDisableGo(false);
  }, [sCVChapterNumber, pathname, sCVVerseNumber]);

  function checkAndGoToChapterVerse() {
    const valChapterNumber = getValNumericChapterNumber(sCVChapterNumber);
    if (valChapterNumber.valid) {
      const valVerseNumber = getValNumericVerseNumber(
        sCVVerseNumber,
        valChapterNumber.numericChapterNumber
      );
      if (valVerseNumber.valid) {
        goToChapterVerse();
      } else {
        setSCVVerseNumber(SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR);
        goToChapterVerse(true); //ignoreVerse set to true
      }
    }
  }

  function goToChapterVerse(ignoreVerse = false) {
    const chapterErrorMessage =
      `For chapter (Ch.), please specify a number between ` +
      `${FIRST_CHAPTERNUMBER} and ${LAST_CHAPTERNUMBER}`;

    const valChapterNumber = getValNumericChapterNumber(sCVChapterNumber);
    if (!valChapterNumber.valid) {
      alert(chapterErrorMessage);
      return;
    }
    const numericChapterNumber = valChapterNumber.numericChapterNumber;

    if (
      ignoreVerse ||
      sCVVerseNumber.trim() === SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR
    ) {
      replace(`/chapter/${sCVChapterNumber}`);
      setDisableGo(true);
      closeMobileMenuIfOpen();
      return;
    }
    const verseErrorMessage =
      `For verse (Ve.) in chapter (Ch.) ${numericChapterNumber}, please specify a number between ` +
      `${MIN_VERSE_NUMBER_IN_ALL_CHAPTERS} and ` +
      `${NUMBER_OF_VERSES_IN_CHAPTERS[numericChapterNumber - 1]}`;

    const valVerseNumber = getValNumericVerseNumber(
      sCVVerseNumber,
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
    setDisableGo(true);
    closeMobileMenuIfOpen();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // console.log("SCV handleSubmit handler invoked.");
    e.preventDefault();
    NProgress.start();
    checkAndGoToChapterVerse();
  }

  const idChapterNumber = `chapternumber${idSuffix}`;
  const idVerseNumber = `versenumber${idSuffix}`;

  return (
    <form className="inline" onSubmit={handleSubmit}>
      <div className="flex gap-x-1 justify-center items-center">
        {/* Chapter LB (by default) */}
        <SetupCOrVLB
          firstEntryBlank={true}
          selectedCORVNumberString={sCVChapterNumber}
          setSelectedCORVNumberString={setSCVChapterNumber}
          firstEntryDisabled={true}
          key={`Ch.${sCVChapterNumber}`}
        />
        {/* Verse LB */}
        <SetupCOrVLB
          label={SCV_VERSE_LABEL}
          maxCORVNumber={
            getValNumericChapterNumber(sCVChapterNumber).valid
              ? getMaxVersesInChapter(sCVChapterNumber)
              : MAX_VERSE_NUMBER_IN_ALL_CHAPTERS
          }
          firstEntryBlank={true}
          selectedCORVNumberString={sCVVerseNumber}
          setSelectedCORVNumberString={setSCVVerseNumber}
          firstEntryDisabled={false}
          listboxDisabled={
            sCVChapterNumber === SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR
              ? true
              : false
          }
          key={`Ve.${sCVVerseNumber}`}
        />
        <input
          type="submit"
          value="Go"
          disabled={disableGo ? true : false}
          className={clsx(
            "px-1 leading-normal  text-black md:text-lg  bg-orange-400 rounded-md cursor-pointer hover:text-black hover:bg-violet-50 active:scale-90 disabled:bg-gray-500 disabled:pointer-events-none"
          )}
        />
      </div>
    </form>
  );
}
export default SelectChapterVerse;
