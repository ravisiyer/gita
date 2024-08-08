"use client";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Checkbox,
  Field,
  Label,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

export function AuthorList({
  authorsLabel,
  allAuthors,
  selectedAuthors,
  setSelectedAuthors,
}) {
  function handleSelectAllChange(value) {
    value ? setSelectedAuthors([...allAuthors]) : setSelectedAuthors([]);
  }
  // const selectAll = false;

  return (
    <Listbox value={selectedAuthors} onChange={setSelectedAuthors} multiple>
      <ListboxButton className="mb-2">{authorsLabel}</ListboxButton>
      <div>
        <Field className="flex items-center gap-2 ">
          <Checkbox
            defaultChecked={selectedAuthors.length === allAuthors.length}
            // defaultChecked={selectAll}
            onChange={handleSelectAllChange}
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
          <Label>All</Label>
        </Field>
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
