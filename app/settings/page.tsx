"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { allGitaLanguages } from "../alllanguages";
import { createLanguageIdsCookie } from "../lib/actions";
import { getCookie } from "cookies-next";
import { SubmitButton } from "../ui/submit-button";
import { capitalizeFirstLetter } from "../lib/util";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import ListAuthors from "../ui/listauthors";
import LanguageSelections from "../ui/LanguageSelections";
import { allAuthorsByLanguageId } from "../allauthorsbylanguageid";
import { GitaAuthor } from "../lib/gqltypes-d";
import { Island_Moments } from "next/font/google";

function validateLanguagesData() {
  const MAX_LANGUAGES_SUPPORTED = 3; // Program code limitation as of now
  if (
    !allGitaLanguages.length ||
    allGitaLanguages.length > MAX_LANGUAGES_SUPPORTED
  ) {
    return false;
  }
  if (allGitaLanguages.length !== allAuthorsByLanguageId.length) {
    return false;
  }
  // Not only do both these variables (constants) have to have same number of
  // entries, but the order of the entries of both should be in languageId order
  // and the languageIds should match.
  allGitaLanguages.map((gitaLanguage, index) => {
    if (gitaLanguage.id !== allAuthorsByLanguageId[index].languageId) {
      return false;
    }
  });
  return true;
}

type authorsForLanguageT = {
  languageId: number;
  languageName: string;
  commentatorAuthors: Partial<GitaAuthor>[];
  translatorAuthors: Partial<GitaAuthor>[];
  // commentatorNames: string[];
  // translatorNames: string[];
};

function setupAuthorsForAllLanguages() {
  let authorsForAllLanguages: authorsForLanguageT[] | undefined = [];
  allAuthorsByLanguageId.map((authorByLanguageId, index) => {
    let numCommentators = 0;
    let numTranslators = 0;
    let commentatorAuthors: Partial<GitaAuthor>[] = Array(0);
    let translatorAuthors: Partial<GitaAuthor>[] = Array(0);
    // let commentatorNames = Array(0);
    // let translatorNames = Array(0);
    authorByLanguageId.allGitaAuthorsForLanguageId.map((gitaAuthor) => {
      if (gitaAuthor?.gitaCommentariesByAuthorId?.totalCount) {
        // commentatorNames.push(gitaAuthor.name);
        commentatorAuthors.push({ id: gitaAuthor.id, name: gitaAuthor.name });
        numCommentators++;
      }
      if (gitaAuthor?.gitaTranslationsByAuthorId?.totalCount) {
        // translatorNames.push(gitaAuthor.name);
        translatorAuthors.push({ id: gitaAuthor.id, name: gitaAuthor.name });
        numTranslators++;
      }
    });
    let authorsForLanguage: authorsForLanguageT = {
      languageId: authorByLanguageId.languageId,
      languageName: allGitaLanguages[index].language!,
      commentatorAuthors,
      translatorAuthors,
      // commentatorNames,
      // translatorNames,
    };
    authorsForAllLanguages.push(authorsForLanguage);
  });
  return authorsForAllLanguages;
}

function Page() {
  const [checkedState, setCheckedState] = useState(
    new Array(allGitaLanguages.length).fill(false)
  );
  const [formDataModified, setFormDataModified] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  let isLanguagesDataValid = validateLanguagesData();
  let authorsForAllLanguages;
  if (isLanguagesDataValid) {
    authorsForAllLanguages = setupAuthorsForAllLanguages();
    if (authorsForAllLanguages === undefined) {
      isLanguagesDataValid = false;
    }
  }

  // I can split this into two components but I want to know if this code works.
  if (!isLanguagesDataValid) {
    return (
      <div className="px-4 pb-4">
        <p>
          Sorry! Web app. error! Languages data is not valid. This page cannot
          be shown.
        </p>
      </div>
    );
  }

  const [selectedTranslators0, setSelectedTranslators0] = useState(
    authorsForAllLanguages === undefined ||
      authorsForAllLanguages[0] === undefined
      ? []
      : // : authorsForAllLanguages[0].translatorNames
        authorsForAllLanguages[0].translatorAuthors
  );
  const [selectedCommentators0, setSelectedCommentators0] = useState(
    authorsForAllLanguages === undefined ||
      authorsForAllLanguages[0] === undefined
      ? []
      : authorsForAllLanguages[0].commentatorAuthors
  );
  const [language0Selected, setLanguage0Selected] = useState(true);

  const [selectedTranslators1, setSelectedTranslators1] = useState(
    authorsForAllLanguages === undefined ||
      authorsForAllLanguages[1] === undefined
      ? []
      : authorsForAllLanguages[1].translatorAuthors
  );
  const [selectedCommentators1, setSelectedCommentators1] = useState(
    authorsForAllLanguages === undefined ||
      authorsForAllLanguages[1] === undefined
      ? []
      : authorsForAllLanguages[1].commentatorAuthors
  );
  const [language1Selected, setLanguage1Selected] = useState(true);

  const [selectedTranslators2, setSelectedTranslators2] = useState(
    authorsForAllLanguages === undefined ||
      authorsForAllLanguages[2] === undefined
      ? []
      : authorsForAllLanguages[2].translatorAuthors
  );
  const [selectedCommentators2, setSelectedCommentators2] = useState(
    authorsForAllLanguages === undefined ||
      authorsForAllLanguages[2] === undefined
      ? []
      : authorsForAllLanguages[2].commentatorAuthors
  );
  const [language2Selected, setLanguage2Selected] = useState(true);

  let allLanguageSelectionsData = [];
  allLanguageSelectionsData[0] = {
    authorsForLanguage: authorsForAllLanguages[0],
    languageSelected: language0Selected,
    setLanguageSelected: setLanguage0Selected,
    selectedTranslators: selectedTranslators0,
    setSelectedTranslators: setSelectedTranslators0,
    selectedCommentators: selectedCommentators0,
    setSelectedCommentators: setSelectedCommentators0,
  };
  allLanguageSelectionsData[1] = {
    authorsForLanguage: authorsForAllLanguages[1],
    languageSelected: language1Selected,
    setLanguageSelected: setLanguage1Selected,
    selectedTranslators: selectedTranslators1,
    setSelectedTranslators: setSelectedTranslators1,
    selectedCommentators: selectedCommentators1,
    setSelectedCommentators: setSelectedCommentators1,
  };
  allLanguageSelectionsData[2] = {
    authorsForLanguage: authorsForAllLanguages[2],
    languageSelected: language2Selected,
    setLanguageSelected: setLanguage2Selected,
    selectedTranslators: selectedTranslators2,
    setSelectedTranslators: setSelectedTranslators2,
    selectedCommentators: selectedCommentators2,
    setSelectedCommentators: setSelectedCommentators2,
  };

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

  return isLanguagesDataValid ? (
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
        {/* <div className="flex flex-col lg:flex-row lg:gap-8"> */}
        <div className="flex justify-start flex-wrap gap-x-8">
          {/* <div className="flex justify-center flex-wrap gap-x-8"> */}
          {allLanguageSelectionsData.map((languageSelectionData, index) => {
            return (
              <div key={index}>
                <LanguageSelections
                  languageId={
                    languageSelectionData.authorsForLanguage.languageId
                  }
                  languageName={
                    languageSelectionData.authorsForLanguage.languageName
                  }
                  languageSelected={languageSelectionData.languageSelected}
                  setLanguageSelected={
                    languageSelectionData.setLanguageSelected
                  }
                  allTranslators={
                    languageSelectionData.authorsForLanguage.translatorAuthors
                  }
                  selectedTranslators={
                    languageSelectionData.selectedTranslators
                  }
                  setSelectedTranslators={
                    languageSelectionData.setSelectedTranslators
                  }
                  allCommentators={
                    languageSelectionData.authorsForLanguage.commentatorAuthors
                  }
                  selectedCommentators={
                    languageSelectionData.selectedCommentators
                  }
                  setSelectedCommentators={
                    languageSelectionData.setSelectedCommentators
                  }
                />
                <hr className="border border-black w-60 my-2 lg:hidden" />
              </div>
            );
          })}
        </div>

        {/* <ul className="mt-4">
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
        </ul> */}
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
  ) : (
    <div className="px-4 pb-4">
      <p>
        Sorry! Web app. error! Languages data is not valid. This page cannot be
        shown.
      </p>
    </div>
  );
}
export default Page;
