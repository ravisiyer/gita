"use client";
import { Checkbox, Field, Label } from "@headlessui/react";
import { LTS_FIELD_NAME_SUFFIX } from "../constants/constants";

function LanguageTitleSummary({
  languageEnglishChecked,
  setLanguageEnglishChecked,
  languageEnglishName,
  languageHindiChecked,
  setLanguageHindiChecked,
  languageHindiName,
  setSelectionChanged,
}: {
  languageEnglishChecked: boolean;
  setLanguageEnglishChecked: (languageEnglishChecked: boolean) => void;
  languageEnglishName: string;
  languageHindiChecked: boolean;
  setLanguageHindiChecked: (languageHindiChecked: boolean) => void;
  languageHindiName: string;
  setSelectionChanged: (selectionChanged: boolean) => void;
}) {
  function handleLanguageEnglishCheckedChange(value: boolean) {
    if (!value && !languageHindiChecked) {
      // We need one language to be checked. So ignore this change
      return;
    }
    setLanguageEnglishChecked(value);
    setSelectionChanged && setSelectionChanged(true);
  }
  function handleLanguageHindiCheckedChange(value: boolean) {
    if (!value && !languageEnglishChecked) {
      // We need one language to be checked. So ignore this change
      return;
    }
    setLanguageHindiChecked(value);
    setSelectionChanged && setSelectionChanged(true);
  }
  type languageOptionsT = {
    languageName: string;
    languageChecked: boolean;
    setLanguageChecked: (languageChecked: boolean) => void;
    handleLanguageCheckedChange: (value: boolean) => void;
  };
  const allLanguageOptions: languageOptionsT[] = [
    {
      languageName: languageEnglishName,
      languageChecked: languageEnglishChecked,
      setLanguageChecked: setLanguageEnglishChecked,
      handleLanguageCheckedChange: handleLanguageEnglishCheckedChange,
    },
    {
      languageName: languageHindiName,
      languageChecked: languageHindiChecked,
      setLanguageChecked: setLanguageHindiChecked,
      handleLanguageCheckedChange: handleLanguageHindiCheckedChange,
    },
  ];

  // Sanity check and fix if needed
  if (
    !allLanguageOptions.find((languageOption) => languageOption.languageChecked)
  ) {
    allLanguageOptions[0].languageChecked = true;
  }

  return (
    <div className="border border-black w-fit p-2 mt-2">
      <p className="text-lg mb-2">
        Select at least one language for chapter summary
      </p>
      <div>
        {allLanguageOptions.map((languageOption, index) => {
          return (
            <Field className="flex items-center gap-2 " key={index}>
              <Checkbox
                checked={languageOption.languageChecked}
                onChange={languageOption.handleLanguageCheckedChange}
                name={`${languageOption.languageName}${LTS_FIELD_NAME_SUFFIX}`}
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
              <Label className="data-[disabled]:opacity-50">
                {languageOption.languageName}
              </Label>
            </Field>
          );
        })}
      </div>
    </div>
  );
}
export default LanguageTitleSummary;
