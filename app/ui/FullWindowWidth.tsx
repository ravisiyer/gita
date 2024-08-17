"use client";
import { Checkbox, Field, Label } from "@headlessui/react";

function FullWindowWidth({
  fullWindowWidthChecked,
  setFullWindowWidthChecked,
  name,
  setSelectionChanged,
}: {
  fullWindowWidthChecked: boolean;
  setFullWindowWidthChecked: (fullWindowWidthChecked: boolean) => void;
  name: string;
  setSelectionChanged: (selectionChanged: boolean) => void;
}) {
  function handlefullWindowWidthCheckedChange(value: boolean) {
    setFullWindowWidthChecked(value);
    setSelectionChanged && setSelectionChanged(true);
  }
  return (
    <div className="border border-black w-fit p-2 mt-2">
      <p className="text-lg mb-2">
        For large window width devices like PC or Laptop
      </p>
      <Field className="flex items-center gap-2 ">
        <Checkbox
          checked={fullWindowWidthChecked}
          onChange={handlefullWindowWidthCheckedChange}
          name={name}
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
        <Label>Use full window width</Label>
      </Field>
    </div>
  );
}
export default FullWindowWidth;
