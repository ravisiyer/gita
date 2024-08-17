"use client";
import { Checkbox, Field, Label } from "@headlessui/react";
import Link from "next/link";

function QMarkIssueHack({
  qMarkToCommaChecked,
  setQMarkToCommaChecked,
  name,
  setSelectionChanged,
}: {
  qMarkToCommaChecked: boolean;
  setQMarkToCommaChecked: (qMarkToCommaChecked: boolean) => void;
  name: string;
  setSelectionChanged: (selectionChanged: boolean) => void;
}) {
  function handleqMarkToCommaCheckedChange(value: boolean) {
    setQMarkToCommaChecked(value);
    setSelectionChanged && setSelectionChanged(true);
  }
  return (
    <div className="border border-black w-fit p-2 mt-2">
      <p className="text-lg mb-2">
        Fix for ? character issue for commentaries data{" "}
        <Link href="../qmarkissue" className="underline">
          More Info
        </Link>
      </p>
      <Field className="flex items-center gap-2 ">
        <Checkbox
          checked={qMarkToCommaChecked}
          onChange={handleqMarkToCommaCheckedChange}
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
        <Label>Replace ? with ,</Label>
      </Field>
    </div>
  );
}
export default QMarkIssueHack;
