"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { allGitaLanguages } from "../alllanguages";
import { createLanguageIdsCookie } from "../lib/actions";
import { getCookie } from "cookies-next";
import { SubmitButton } from "../ui/submit-button";
import { capitalizeFirstLetter } from "../lib/util";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { allAuthorsByLanguageId } from "../allauthorsbylanguageid";
import { GitaAuthor } from "../lib/gqltypes-d";
// import { match } from "assert";

function ListAuthors({
  languageId,
}: {
  languageId: GitaAuthor["id"] | undefined;
}) {
  let numCommentators = 0;
  let numTranslators = 0;
  let commentatorNames = Array(0);
  let translatorNames = Array(0);
  const matchedEntry = allAuthorsByLanguageId.find((entry) => {
    return entry.languageId === languageId;
  });
  matchedEntry &&
    matchedEntry.allGitaAuthorsForLanguageId.map((gitaAuthor) => {
      if (gitaAuthor?.gitaCommentariesByAuthorId?.totalCount) {
        commentatorNames.push(gitaAuthor.name);
        numCommentators++;
        // console.log(`Commentary by ${gitaAuthor.name}`);
      }
      if (gitaAuthor?.gitaTranslationsByAuthorId?.totalCount) {
        translatorNames.push(gitaAuthor.name);
        numTranslators++;
        // console.log(`Translation by ${gitaAuthor.name}`);
      }
    });
  return (
    <div className="text-base font-normal">
      {/* Hardcoded check for Sanskrit below; Change later to function without hardcoding. */}
      {languageId !== 3 && (
        <>
          {/* <p className="ml-12">{`Number of Translators: ${numTranslators}`}</p> */}
          {translatorNames.length && (
            <p className="ml-12 font-bold">Translators</p>
          )}
          {translatorNames.map((name, index) => {
            return (
              <p className="ml-14 line-clamp-1" key={`Transl${index}`}>
                {/* Below code could be made an ordered list. But I wanted to check this out. */}
                <span className="min-w-6 inline-block">{`${index + 1}. `}</span>
                {`${name}`}
              </p>
            );
          })}
        </>
      )}
      {/* <p className="ml-12">{`Number of Commentators: ${numCommentators}`}</p> */}
      {commentatorNames.length && (
        <p className="ml-12 font-bold">Commentators</p>
      )}
      {commentatorNames.map((name, index) => {
        return (
          <p className="ml-14 line-clamp-1" key={`Comment${index}`}>
            {/* Below code could be made an ordered list. But I wanted to check this out. */}
            <span className="min-w-6 inline-block">{`${index + 1}. `}</span>
            {`${name}`}
          </p>
        );
      })}
    </div>
  );
}

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
                className="w-24 block px-1 mt-4 leading-normal border-black border  text-black  bg-white rounded-md cursor-pointer hover:text-black hover:bg-violet-400 active:scale-90 "
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
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
          {/* <div className="truncate ..."> */}
          {allGitaLanguages.map(({ id, language }, index) => {
            return (
              <li key={index} className="mb-2">
                <div className="text-lg font-bold">
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
                  <ListAuthors languageId={id} />
                </div>
              </li>
            );
          })}
        </ul>
        <SubmitButton
          btnLabel="Save settings"
          TWclasses="px-1 mt-2 leading-normal border-black border  text-black  bg-white rounded-md cursor-pointer hover:text-black hover:bg-violet-400 active:scale-90 "
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
