import {
  LAST_CHAPTERNUMBER,
  SCV_CHAPTER_LABEL,
  SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR,
} from "../constants/constants";
import COrVLB from "./corvlb";

function SetupCOrVLB({
  label = SCV_CHAPTER_LABEL, // Chapter or Verse label
  maxCORVNumber = LAST_CHAPTERNUMBER, // maxChapterORVerseNumber
  firstEntryBlank = false, // true/false
  selectedCORVNumberString,
  setSelectedCORVNumberString,
  firstEntryDisabled = false,
  listboxDisabled = false,
}: {
  label?: string;
  maxCORVNumber?: number;
  firstEntryBlank?: boolean;
  selectedCORVNumberString: string;
  setSelectedCORVNumberString: (selectedCORVNumberString: string) => void;
  firstEntryDisabled?: boolean;
  listboxDisabled?: boolean;
}) {
  let chaptersOrVerses = [];
  let CORVIndex = 0;

  if (firstEntryBlank) {
    chaptersOrVerses[0] = {
      id: 0,
      CORVNumberString: SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR,
    };
    CORVIndex = 1;
  }
  const maxCORVIndex = firstEntryBlank ? maxCORVNumber : maxCORVNumber - 1;
  for (; CORVIndex <= maxCORVIndex; CORVIndex++) {
    const entryNumber = firstEntryBlank ? CORVIndex : CORVIndex + 1;
    chaptersOrVerses[CORVIndex] = {
      id: entryNumber,
      CORVNumberString: entryNumber.toString(),
    };
  }

  return (
    <COrVLB
      chaptersOrVerses={chaptersOrVerses}
      label={label}
      selectedCORVNumberString={selectedCORVNumberString}
      setSelectedCORVNumberString={setSelectedCORVNumberString}
      firstEntryDisabled={firstEntryDisabled}
      listboxDisabled={listboxDisabled}
    />
  );
}
export default SetupCOrVLB;
