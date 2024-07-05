import {
  FIRST_CHAPTERNUMBER,
  LAST_CHAPTERNUMBER,
  MIN_VERSE_NUMBER_IN_ALL_CHAPTERS,
  MAX_VERSE_NUMBER_IN_ALL_CHAPTERS,
  NUMBER_OF_VERSES_IN_CHAPTERS,
  FIRST_VERSEID,
  LAST_VERSEID,
} from "@/app/constants";

export function getValNumericChapterNumber(chapterNumber: string) {
  if (isNaN(Number(chapterNumber))) {
    return { valid: false, numericChapterNumber: 0 };
  }
  const numericChapterNumber = Number(chapterNumber);
  if (
    !Number.isInteger(numericChapterNumber) ||
    numericChapterNumber < FIRST_CHAPTERNUMBER ||
    numericChapterNumber > LAST_CHAPTERNUMBER
  ) {
    return { valid: false, numericChapterNumber };
  }
  return { valid: true, numericChapterNumber };
}

export function getValNumericVerseNumber(
  verseNumber: string,
  numericChapterNumber: number
) {
  if (isNaN(Number(verseNumber))) {
    return { valid: false, numericVerseNumber: 0 };
  }
  const numericVerseNumber = Number(verseNumber);
  if (
    !Number.isInteger(numericVerseNumber) ||
    numericVerseNumber < MIN_VERSE_NUMBER_IN_ALL_CHAPTERS ||
    numericVerseNumber > NUMBER_OF_VERSES_IN_CHAPTERS[numericChapterNumber - 1]
  ) {
    return { valid: false, numericVerseNumber };
  }
  return { valid: true, numericVerseNumber };
}

export function getValNumericVerseId(verseId: string) {
  if (isNaN(Number(verseId))) {
    return { valid: false, numericVerseId: 0 };
  }
  const numericVerseId = Number(verseId);
  if (
    !Number.isInteger(numericVerseId) ||
    numericVerseId < FIRST_VERSEID ||
    numericVerseId > LAST_VERSEID
  ) {
    return { valid: false, numericVerseId };
  }
  return { valid: true, numericVerseId };
}

export function calcNumericVerseId(
  numericChapterNumber: number,
  numericVerseNumber: number
) {
  let numericVerseId = 0;
  if (numericChapterNumber > 1) {
    const numVersesInChapters = NUMBER_OF_VERSES_IN_CHAPTERS.slice(
      0,
      numericChapterNumber - 1
    );
    for (let i = 0; i < numVersesInChapters.length; i++) {
      numericVerseId += numVersesInChapters[i];
    }
  }
  numericVerseId += numericVerseNumber;
  return numericVerseId;
}

export function getMaxVersesInChapter(chapterNumber: string) {
  const valChapterNumber = getValNumericChapterNumber(chapterNumber);
  if (!valChapterNumber.valid) {
    // Log the error but rather than return an error, return a safe value
    console.log(
      "getMaxVersesInChapter(): " +
        `Argument chapterNumber has invalid value of: ${chapterNumber}. ` +
        `As error is non-fatal, returning safe value of MAX_VERSE_NUMBER_IN_ALL_CHAPTERS: ` +
        `${MAX_VERSE_NUMBER_IN_ALL_CHAPTERS}.`
    );
    return MAX_VERSE_NUMBER_IN_ALL_CHAPTERS;
  }
  return NUMBER_OF_VERSES_IN_CHAPTERS[
    valChapterNumber.numericChapterNumber - 1
  ];
}

export function getCVNumbersFromVerseId(verseId: string) {
  if (isNaN(Number(verseId))) {
    return { chapterNumber: "", verseNumber: "" };
  }
  const numericVerseId = Number(verseId);
  if (
    !Number.isInteger(numericVerseId) ||
    numericVerseId < FIRST_VERSEID ||
    numericVerseId > LAST_VERSEID
  ) {
    return { chapterNumber: "", verseNumber: "" };
  }
  let tempNumericVerseId = numericVerseId;
  for (
    let numericChapterNumber = FIRST_CHAPTERNUMBER;
    numericChapterNumber <= LAST_CHAPTERNUMBER;
    numericChapterNumber++
  ) {
    if (
      tempNumericVerseId <=
      NUMBER_OF_VERSES_IN_CHAPTERS[numericChapterNumber - 1]
    ) {
      return {
        chapterNumber: `${numericChapterNumber}`,
        verseNumber: `${tempNumericVerseId}`,
      };
    } else {
      tempNumericVerseId -=
        NUMBER_OF_VERSES_IN_CHAPTERS[numericChapterNumber - 1];
    }
  }
  console.log(
    "function getCVNumbersFromVerseId() error as code should not come to this point."
  );
  return { chapterNumber: "", verseNumber: "" };
}

export function capitalizeFirstLetter(word: string) {
  if (!word || word.length < 1) {
    return word;
  } else if (word.length === 1) {
    return word.charAt(0).toUpperCase() + "";
  }

  return word.charAt(0).toUpperCase() + word.slice(1);
}
