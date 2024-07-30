"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { allGitaLanguages } from "../alllanguages";
import { createLanguageIdsCookie } from "../lib/actions";
import { getCookie } from "cookies-next";
import { SubmitButton } from "./submit-button";
import { capitalizeFirstLetter } from "../lib/util";
function Page() {
  const [checkedState, setCheckedState] = useState(
    new Array(allGitaLanguages.length).fill(false)
  );
  const [formDataModified, setFormDataModified] = useState(false);

  useEffect(() => {
    let initialCheckedLanguageIds: boolean[] = new Array(
      allGitaLanguages.length
    ).fill(false);
    const tmp = getCookie("selectedLanguageIds");
    if (tmp) {
      const initialSelectedLanguageIds: string[] = JSON.parse(
        tmp?.toString() ?? ""
      );
      allGitaLanguages.map(({ id, language }, index) => {
        initialCheckedLanguageIds[index] = id?.toString
          ? initialSelectedLanguageIds.includes(id?.toString())
          : false;
      });
    }
    // console.log(initialCheckedLanguageIds);
    setCheckedState(initialCheckedLanguageIds);
  }, []);

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    setFormDataModified(true);
  };

  const router = useRouter();

  return (
    <div className="px-4 pb-4">
      <h2 className="text-2xl">Settings</h2>
      <form className="my-4" action={createLanguageIdsCookie}>
        <h4 className="text-lg">
          Select languages for translations and commentaries
        </h4>
        <ul className="mt-4">
          {allGitaLanguages.map(({ id, language }, index) => {
            return (
              <li key={index}>
                <div>
                  <input
                    type="checkbox"
                    id={`custom-input-${index}`}
                    name={`custom-input-${index}`}
                    value={id?.toString()}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                    className="ml-4 w-8"
                  />
                  <label htmlFor={`custom-input-${index}`}>
                    {capitalizeFirstLetter(language!)}
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
        <SubmitButton
          btnLabel="Save settings"
          TWclasses="px-1 mt-4 leading-normal border-black border  text-black  bg-white rounded-md cursor-pointer hover:text-black hover:bg-violet-400 active:scale-90 "
          formDataModified={formDataModified}
          setFormDataModified={setFormDataModified}
          submitSaveMsg="Settings saved."
        />
        <button
          className="block px-1 mt-4 leading-normal border-black border  text-black  bg-white rounded-md cursor-pointer hover:text-black hover:bg-violet-400 active:scale-90 "
          onClick={() => router.back()}
        >
          Back
        </button>
      </form>
    </div>
  );
}
export default Page;
