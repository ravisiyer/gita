"use client";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { SCV_CHAPTER_LABEL, SCV_VERSE_LABEL } from "../constants/constants";

export default function COrVLB({
  chaptersOrVerses,
  label,
  selectedCORVNumberString,
  setSelectedCORVNumberString,
  firstEntryDisabled = false,
  listboxDisabled = false,
}: {
  chaptersOrVerses: {
    id: number;
    CORVNumberString: string;
  }[];
  label: string;
  selectedCORVNumberString: string;
  setSelectedCORVNumberString: (selectedCORVNumberString: string) => void;
  firstEntryDisabled?: boolean;
  listboxDisabled?: boolean;
}) {
  return (
    <div className="z-20">
      <Listbox
        value={selectedCORVNumberString}
        onChange={setSelectedCORVNumberString}
        disabled={listboxDisabled}
      >
        <ListboxButton className="border border-white flex justify-between items-center w-[120px] md:w-[72px] h-12 md:h-auto py-px px-0.5 select-none data-[disabled]:opacity-40">
          {`${label} ${selectedCORVNumberString}`}
          <ChevronDownIcon className="size-4 " />
        </ListboxButton>
        <ListboxOptions
          anchor={{
            to: "bottom",
            offset: label === SCV_VERSE_LABEL ? -40 : 0,
          }}
          className="border border-black bg-yellow-200 z-20"
        >
          <div
            className={clsx(
              "grid ",
              label === SCV_CHAPTER_LABEL && "grid-cols-3",
              label === SCV_VERSE_LABEL && "grid-cols-6"
            )}
          >
            {chaptersOrVerses.map((cOrV, index) => (
              <ListboxOption
                key={cOrV.id}
                value={cOrV.CORVNumberString}
                disabled={firstEntryDisabled && index === 0}
                className="group flex cursor-default items-center p-1 select-none data-[focus]:bg-orange-400 data-[disabled]:opacity-40 data-[disabled]:bg-gray-500"
              >
                <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
                {cOrV.CORVNumberString}
              </ListboxOption>
            ))}
          </div>
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
