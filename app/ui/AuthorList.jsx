"use client";
// import Link from "next/link";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Checkbox,
  Field,
  Label,
} from "@headlessui/react";
// import { useState } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export function AuthorList({
  authorsLabel,
  allAuthors,
  selectedAuthors,
  setSelectedAuthors,
}) {
  // function handleSelectAllClick(e) {
  //   e.preventDefault();
  //   setSelectedAuthors([...allAuthors]);
  // }
  // function handleClearAllClick(e) {
  //   e.preventDefault();
  //   setSelectedAuthors([]);
  // }

  function handleSelectAllChange(value) {
    value ? setSelectedAuthors([...allAuthors]) : setSelectedAuthors([]);
    setSelectAll(value);
  }

  const [selectAll, setSelectAll] = useState(false);

  return (
    <Listbox value={selectedAuthors} onChange={setSelectedAuthors} multiple>
      <ListboxButton className="mb-2">{authorsLabel}</ListboxButton>
      <div>
        <Field className="flex items-center gap-2 ">
          <Checkbox
            checked={selectAll}
            onChange={handleSelectAllChange}
            // onChange={setSelectAll}
            className="group block size-4 rounded border border-black data-[checked]:bg-blue-500"
            // className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
          >
            {/* Checkmark icon */}
            <svg
              className="stroke-black opacity-0 group-data-[checked]:opacity-100"
              //   className="stroke-white opacity-0 group-data-[checked]:opacity-100"
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
          <Label>All</Label>
        </Field>

        {/* <button
          onClick={handleSelectAllClick}
          className="border border-black rounded-md p-1"
        >
          Select All
        </button>
        <button
          onClick={handleClearAllClick}
          className="border border-black rounded-md p-1 ml-4"
        >
          Clear All
        </button> */}
      </div>
      {
        <div className="mt-2">
          <ListboxOptions static>
            {allAuthors.map((author) => (
              <ListboxOption
                key={author.id}
                value={author}
                className="group flex data-[selected]:bg-orange-400"
              >
                {/* <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" /> */}
                <CheckIcon className="invisible size-4  group-data-[selected]:visible" />
                {author.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      }
    </Listbox>
  );
}

export default AuthorList;
