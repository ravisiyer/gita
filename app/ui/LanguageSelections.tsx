"use client";
import { Field, Label } from "@headlessui/react";
import AuthorList from "./AuthorList";
import { authorIdNameT } from "../lib/addltypes-d";
import { useEffect } from "react";

function LanguageSelections({
  languageId,
  languageName,
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
    !selectedTranslators.length && !selectedCommentators.length;
  }, [selectedTranslators, selectedCommentators]);

  return (
    <div className="border border-black p-2">
      <Field className="hidden md:flex md:items-center md:gap-2">
        <Label className="text-2xl">{`${languageName} language`}</Label>
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
              setSelectionChanged={setSelectionChanged}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default LanguageSelections;
