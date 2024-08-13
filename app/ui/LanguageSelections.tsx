"use client";
import { Checkbox, Field, Label } from "@headlessui/react";
import AuthorList from "./AuthorList";
import { authorIdNameT } from "../lib/addltypes-d";
import { useEffect } from "react";

function LanguageSelections({
  languageId,
  languageName,
  languageChecked,
  setLanguageChecked,
  languageCheckBoxName,
  allTranslators,
  selectedTranslators,
  setSelectedTranslators,
  translatorsListBoxName,
  allCommentators,
  selectedCommentators,
  setSelectedCommentators,
  commentatorsListBoxName,
  setSelectionChanged,
}: {
  languageId: number;
  languageName: string;
  languageChecked: boolean;
  setLanguageChecked: (languageChecked: boolean) => void;
  languageCheckBoxName: string;
  allTranslators: authorIdNameT[];
  selectedTranslators: authorIdNameT[];
  setSelectedTranslators: (
    selectedTranslators: authorIdNameT[] | undefined
  ) => void;
  translatorsListBoxName: string;
  allCommentators: authorIdNameT[];
  selectedCommentators: authorIdNameT[];
  setSelectedCommentators: (
    selectedCommentators: authorIdNameT[] | undefined
  ) => void;
  commentatorsListBoxName: string;
  setSelectionChanged: (selectionChanged: boolean) => void;
}) {
  useEffect(() => {
    !selectedTranslators.length &&
      !selectedCommentators.length &&
      setLanguageChecked(false);
    // if (selectedTranslators.length === 0 && selectedCommentators.length === 0) {
    //   setLanguageChecked(false);
    // }
  }, [selectedTranslators, selectedCommentators]);

  function handleLanguageCheckedChange(value: boolean) {
    setLanguageChecked(value);
    if (value && !selectedTranslators.length && !selectedCommentators.length) {
      setSelectedTranslators(allTranslators);
      setSelectedCommentators(allCommentators);
    }
    setSelectionChanged && setSelectionChanged(true);
  }
  return (
    <div className="border border-black p-2">
      <Field className="flex items-center gap-2 ">
        <Checkbox
          checked={languageChecked}
          onChange={handleLanguageCheckedChange}
          name={languageCheckBoxName}
          className="group block size-4 rounded border border-black data-[checked]:bg-blue-500"
        >
          {/* Checkmark icon */}
          <svg
            className="stroke-black opacity-0 group-data-[checked]:opacity-100"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M3 8L6 11L11 3.5"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Checkbox>
        <Label className="text-2xl">{`${languageName}`}</Label>
      </Field>
      <div className="flex flex-col sm:flex-row sm:gap-4">
        {allTranslators.length ? (
          <div>
            <AuthorList
              authorsLabel={"Translators"}
              allAuthors={allTranslators}
              selectedAuthors={selectedTranslators}
              setSelectedAuthors={setSelectedTranslators}
              name={translatorsListBoxName}
              disabled={!languageChecked}
              setSelectionChanged={setSelectionChanged}
            />
            <hr className="border border-black w-60 my-2 sm:hidden" />
          </div>
        ) : null}
        {allCommentators.length ? (
          <div>
            <AuthorList
              authorsLabel={"Commentators"}
              allAuthors={allCommentators}
              selectedAuthors={selectedCommentators}
              setSelectedAuthors={setSelectedCommentators}
              name={commentatorsListBoxName}
              disabled={!languageChecked}
              setSelectionChanged={setSelectionChanged}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default LanguageSelections;
