"use client";
import {
  Listbox,
  ListboxOption,
  ListboxOptions,
  Checkbox,
  Field,
  Label,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { authorIdNameT } from "../lib/addltypes-d";

export function AuthorList({
  authorsLabel,
  allAuthors,
  selectedAuthors,
  setSelectedAuthors,
  name,
  disabled = false,
  setSelectionChanged,
}: {
  authorsLabel: string;
  allAuthors: authorIdNameT[];
  selectedAuthors: authorIdNameT[];
  setSelectedAuthors: (selectedAuthors: authorIdNameT[] | undefined) => void;
  name: string;
  disabled: boolean;
  setSelectionChanged: (selectionChanged: boolean) => void;
}) {
  const [selectAll, setSelectAll] = useState(
    selectedAuthors.length === allAuthors.length
  );
  useEffect(() => {
    selectedAuthors.length === allAuthors.length
      ? setSelectAll(true)
      : setSelectAll(false);
  }, [selectedAuthors, allAuthors.length]);

  function handleSelectAllChange(value: boolean) {
    value ? setSelectedAuthors([...allAuthors]) : setSelectedAuthors([]);
    setSelectAll(value);
    setSelectionChanged && setSelectionChanged(true);
  }
  function handleListboxChange(value: authorIdNameT[]) {
    value.length === allAuthors.length
      ? setSelectAll(true)
      : setSelectAll(false);
    setSelectedAuthors(value);
    setSelectionChanged && setSelectionChanged(true);
  }

  return (
    <Listbox
      value={selectedAuthors}
      onChange={handleListboxChange}
      name={name}
      multiple
    >
      <p className="text-lg">{authorsLabel}</p>
      <div>
        <Field disabled={disabled} className="flex items-center gap-2 ">
          <Checkbox
            checked={selectAll}
            onChange={handleSelectAllChange}
            className="group block size-4 rounded border border-black data-[checked]:bg-blue-500 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500"
          >
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
          <Label className="data-[disabled]:opacity-50">All</Label>
        </Field>
      </div>
      {
        <div className="mt-2">
          <ListboxOptions static>
            {allAuthors.map((author) => (
              <ListboxOption
                key={author.id}
                disabled={disabled}
                value={author}
                className="group flex cursor-default items-center px-1 data-[selected]:bg-orange-400 data-[disabled]:opacity-50"
              >
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
