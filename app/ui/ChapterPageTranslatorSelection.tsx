"use client";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { languageTranslatorAuthorT } from "../lib/addltypes-d";
import { useState } from "react";

function ChapterPageTranslatorSelection({
  allLanguageTranslatorAuthors,
  selectedAuthorIndex = 0,
  name,
  setSelectionChanged,
}: {
  allLanguageTranslatorAuthors: languageTranslatorAuthorT[];
  selectedAuthorIndex: number;
  name: string;
  setSelectionChanged: (selectionChanged: boolean) => void;
}) {
  const [
    selectedLanguageTranslatorAuthor,
    setSelectedLanguageTranslatorAuthor,
  ] = useState(allLanguageTranslatorAuthors[selectedAuthorIndex]);
  function handleListboxChange(value: languageTranslatorAuthorT) {
    setSelectedLanguageTranslatorAuthor(value);
    setSelectionChanged && setSelectionChanged(true);
  }

  return (
    <div className="border border-black w-80 p-2 mt-2">
      <Listbox
        value={selectedLanguageTranslatorAuthor}
        name={name}
        onChange={handleListboxChange}
      >
        <p className="text-lg">Select Translator</p>
        <ListboxButton className="border border-black flex justify-between items-center w-72 px-1 my-2 bg-orange-400 ">
          {selectedLanguageTranslatorAuthor.languageTranslator}
          <ChevronDownIcon className="size-4 ml-4" />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          className="border border-black bg-yellow-100 my-2 py-1"
        >
          {allLanguageTranslatorAuthors.map(
            (languageTranslatorAuthor, index) => (
              <ListboxOption
                key={languageTranslatorAuthor.authorId}
                value={languageTranslatorAuthor}
                className="group flex cursor-default items-center px-1 select-none data-[focus]:bg-orange-400"
              >
                <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
                {languageTranslatorAuthor.languageTranslator}
              </ListboxOption>
            )
          )}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
export default ChapterPageTranslatorSelection;
