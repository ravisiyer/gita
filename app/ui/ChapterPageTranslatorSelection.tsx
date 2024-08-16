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
  defaultAuthorIndex = 0,
  name,
  setSelectionChanged,
}: {
  allLanguageTranslatorAuthors: languageTranslatorAuthorT[];
  defaultAuthorIndex: number;
  name: string;
  setSelectionChanged: (selectionChanged: boolean) => void;
}) {
  const [
    selectedLanguageTranslatorAuthor,
    setSelectedLanguageTranslatorAuthor,
  ] = useState(allLanguageTranslatorAuthors[defaultAuthorIndex]);
  function handleListboxChange(value: languageTranslatorAuthorT) {
    setSelectedLanguageTranslatorAuthor(value);
    setSelectionChanged && setSelectionChanged(true);
  }

  return (
    <div className="border border-black w-fit p-2 mt-2">
      <Listbox
        value={selectedLanguageTranslatorAuthor}
        name={name}
        onChange={handleListboxChange}
      >
        <p className="text-lg">Select Translator</p>
        {/* <p className="text-lg">Select Translator for Chapter Page</p> */}
        <ListboxButton className="border border-black flex justify-between items-center w-full px-1 my-2 bg-orange-400 ">
          {/* Below code is from or based on Headless UI docs. Above code is my version, simplified. */}
          {/* <ListboxButton className="border border-black flex justify-between items-center w-full px-1 my-2 bg-orange-400 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"> */}
          {selectedLanguageTranslatorAuthor.languageTranslator}
          <ChevronDownIcon className="size-4 ml-4" />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          className="border border-black bg-yellow-100 my-2 py-1"
          // Below code is from or based on Headless UI docs. Above code is my version, simplified.
          // className="border border-black bg-yellow-100 my-2 py-1 focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
        >
          {allLanguageTranslatorAuthors.map(
            (languageTranslatorAuthor, index) => (
              <ListboxOption
                key={languageTranslatorAuthor.authorId}
                value={languageTranslatorAuthor}
                className="group flex cursor-default items-center px-1 select-none data-[focus]:bg-orange-400"
                // Below code is from or based on Headless UI docs. Above code is my version, simplified.
                // className="group flex cursor-default items-center px-1 data-[selected]:bg-orange-400 select-none data-[focus]:bg-white/10"
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
