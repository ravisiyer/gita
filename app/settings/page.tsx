"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { allGitaLanguages } from "../alllanguages";
import { createLanguageIdsCookie } from "../lib/actions";
import { getCookie } from "cookies-next";
import { SubmitButton } from "./submit-button";
import { capitalizeFirstLetter } from "../lib/util";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

function Page() {
  const [checkedState, setCheckedState] = useState(
    new Array(allGitaLanguages.length).fill(false)
  );
  const [formDataModified, setFormDataModified] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  function handleBack(e: React.MouseEvent) {
    e.preventDefault();
    formDataModified ? setIsDialogOpen(true) : router.back();
  }

  function handleForcedBack() {
    setIsDialogOpen(false);
    router.back();
  }

  function handleCancel() {
    setIsDialogOpen(false);
  }

  return (
    <div className="px-4 pb-4">
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border border-white bg-gray-700 p-4">
            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
              Settings Not Saved
            </DialogTitle>
            <p className="mt-2 text-white">
              You have modified the settings but not saved them.
            </p>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <button
                // className="rounded-md bg-black border border-white p-2 text-white"
                className="w-24 block px-1 mt-4 leading-normal border-black border  text-black  bg-white rounded-md cursor-pointer hover:text-black hover:bg-violet-400 active:scale-90 "
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                // className="rounded-md bg-black border border-white p-2 text-white"
                className="w-60 block px-1 mt-4 leading-normal border-black border  text-black  bg-white rounded-md cursor-pointer hover:text-black hover:bg-violet-400 active:scale-90 "
                onClick={handleForcedBack}
              >
                Back Without Saving Settings
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      <h2 className="text-2xl">Settings</h2>
      <form className="my-4" action={createLanguageIdsCookie}>
        <h4 className="text-lg">
          Select languages for translations and commentaries in Verse page
        </h4>
        <ul className="mt-4">
          {allGitaLanguages.map(({ id, language }, index) => {
            return (
              <li key={index}>
                <div className="truncate ...">
                  <input
                    type="checkbox"
                    id={`custom-input-${index}`}
                    name={`custom-input-${index}`}
                    value={id?.toString()}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                    className="ml-2"
                    // className="ml-4 w-8"
                  />
                  <label htmlFor={`custom-input-${index}`} className="ml-2">
                    {capitalizeFirstLetter(language!)}{" "}
                  </label>
                  {index ? (
                    ""
                  ) : (
                    <>
                      <span> - Default language</span>
                      <span className="hidden sm:inline">
                        {" "}
                        if no language is selected
                      </span>
                    </>
                  )}
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
          onClick={(e) => handleBack(e)}
        >
          Back
        </button>
      </form>
    </div>
  );
}
export default Page;
