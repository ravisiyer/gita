"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createLanguageIdsCookie } from "../lib/actions";
import { getCookie } from "cookies-next";
import { SubmitButton } from "../ui/submit-button";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import LanguageSelections from "../ui/LanguageSelections";
import { authorsForLanguageT } from "../lib/addltypes-d";

const languageCheckboxLSC_NameSuffix = "check";
const translatorsListBoxLSC_NameSuffix = "Transl";
const commentatorsListBoxLSC_NameSuffix = "Commnt";

function Settings({
  authorsForAllLanguages,
  selectedAuthorsForAllLanguages,
}: {
  authorsForAllLanguages: authorsForLanguageT[];
  selectedAuthorsForAllLanguages: Partial<authorsForLanguageT>[];
}) {
  const [formDataModified, setFormDataModified] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Below code is not great. I don't know how to create an array of useState variables in
  // React functional components, and so below code. Note that Headless UI ListBox when used
  // in controlled component way (which is what we need for better UI handling),
  // needs a state variable to be passed to it.
  // Further note that useState variable holding an array is no problem. But we need an
  // array of useState variables.
  const [selectedTranslators0, setSelectedTranslators0] = useState(
    // selectedAuthorsForAllLanguages[0] === undefined
    //   ? []
    //   : selectedAuthorsForAllLanguages[0].translatorAuthors
    selectedAuthorsForAllLanguages[0].translatorAuthors
  );
  const [selectedCommentators0, setSelectedCommentators0] = useState(
    // authorsForAllLanguages[0] === undefined
    //   ? []
    //   : authorsForAllLanguages[0].commentatorAuthors
    selectedAuthorsForAllLanguages[0].commentatorAuthors
  );
  const [language0Checked, setLanguage0Checked] = useState(
    selectedAuthorsForAllLanguages[0].translatorAuthors?.length ||
      selectedAuthorsForAllLanguages[0].commentatorAuthors?.length
      ? true
      : false
  );
  //   const [language0Checked, setLanguage0Checked] = useState(true);

  const [selectedTranslators1, setSelectedTranslators1] = useState(
    // authorsForAllLanguages[1] === undefined
    //   ? []
    //   : authorsForAllLanguages[1].translatorAuthors
    selectedAuthorsForAllLanguages[1].translatorAuthors
  );
  const [selectedCommentators1, setSelectedCommentators1] = useState(
    // authorsForAllLanguages[1] === undefined
    //   ? []
    //   : authorsForAllLanguages[1].commentatorAuthors
    selectedAuthorsForAllLanguages[1].commentatorAuthors
  );
  const [language1Checked, setLanguage1Checked] = useState(
    selectedAuthorsForAllLanguages[1].translatorAuthors?.length ||
      selectedAuthorsForAllLanguages[1].commentatorAuthors?.length
      ? true
      : false
  );
  //   const [language1Checked, setLanguage1Checked] = useState(true);

  const [selectedTranslators2, setSelectedTranslators2] = useState(
    // authorsForAllLanguages[2] === undefined
    //   ? []
    //   : authorsForAllLanguages[2].translatorAuthors
    selectedAuthorsForAllLanguages[2].translatorAuthors
  );
  const [selectedCommentators2, setSelectedCommentators2] = useState(
    // authorsForAllLanguages[2] === undefined
    //   ? []
    //   : authorsForAllLanguages[2].commentatorAuthors
    selectedAuthorsForAllLanguages[2].commentatorAuthors
  );
  const [language2Checked, setLanguage2Checked] = useState(
    selectedAuthorsForAllLanguages[2].translatorAuthors?.length ||
      selectedAuthorsForAllLanguages[2].commentatorAuthors?.length
      ? true
      : false
  );
  //   const [language2Checked, setLanguage2Checked] = useState(true);

  const [showData, setShowData] = useState("");

  // Below code sets up allLanguageSelectsionData array which we can then iterate through without
  // having to refer to specific state variables like selectedTranslators0.
  // Once again, the code is not great and the cause, as mentioned earlier, is that I don't know how to
  // define an array of useState variables in React functional components.
  //
  let allLanguageSelectionsData: any = [];
  allLanguageSelectionsData[0] = {
    authorsForLanguage: authorsForAllLanguages[0],
    languageChecked: language0Checked,
    setLanguageChecked: setLanguage0Checked,
    selectedTranslators: selectedTranslators0,
    setSelectedTranslators: setSelectedTranslators0,
    selectedCommentators: selectedCommentators0,
    setSelectedCommentators: setSelectedCommentators0,
  };
  allLanguageSelectionsData[1] = {
    authorsForLanguage: authorsForAllLanguages[1],
    languageChecked: language1Checked,
    setLanguageChecked: setLanguage1Checked,
    selectedTranslators: selectedTranslators1,
    setSelectedTranslators: setSelectedTranslators1,
    selectedCommentators: selectedCommentators1,
    setSelectedCommentators: setSelectedCommentators1,
  };
  allLanguageSelectionsData[2] = {
    authorsForLanguage: authorsForAllLanguages[2],
    languageChecked: language2Checked,
    setLanguageChecked: setLanguage2Checked,
    selectedTranslators: selectedTranslators2,
    setSelectedTranslators: setSelectedTranslators2,
    selectedCommentators: selectedCommentators2,
    setSelectedCommentators: setSelectedCommentators2,
  };

  // useEffect(() => {
  //   let initialCheckedLanguageIds: boolean[] = new Array(
  //     allGitaLanguages.length
  //   ).fill(false);
  //   const tmp = getCookie("selectedLanguageIds");
  //   if (tmp) {
  //     const initialSelectedLanguageIds: string[] = JSON.parse(
  //       tmp?.toString() ?? ""
  //     );
  //     allGitaLanguages.map(({ id, language }, index) => {
  //       initialCheckedLanguageIds[index] = id?.toString
  //         ? initialSelectedLanguageIds.includes(id?.toString())
  //         : false;
  //     });
  //   }
  //   // console.log(initialCheckedLanguageIds);
  //   setCheckedState(initialCheckedLanguageIds);
  // }, []);

  // const handleOnChange = (position: number) => {
  //   const updatedCheckedState = checkedState.map((item, index) =>
  //     index === position ? !item : item
  //   );
  //   setCheckedState(updatedCheckedState);
  //   setFormDataModified(true);
  // };

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

  function handleSubmit(e: any) {
    e.preventDefault();
    let msg = "";
    const form = e.target;
    const formData = new FormData(form);
    // allLanguageAuthors.map((languageAuthor, index) => {
    allLanguageSelectionsData.map((languageSelectionData: any, index: any) => {
      let countTranslatorKeys = 0;
      let countCommentatorKeys = 0;
      for (let key of formData.keys()) {
        key.startsWith(
          // `${languageAuthor.languageId}${translatorsListBoxLSC_Name}[`
          `${languageSelectionData.authorsForLanguage.languageId}${translatorsListBoxLSC_NameSuffix}[`
        )
          ? countTranslatorKeys++
          : key.startsWith(
              `${languageSelectionData.authorsForLanguage.languageId}${commentatorsListBoxLSC_NameSuffix}[`
            )
          ? countCommentatorKeys++
          : null;
      }
      let numTranslators = countTranslatorKeys
        ? Math.floor(countTranslatorKeys / 2)
        : 0;
      let numCommentators = countCommentatorKeys
        ? Math.floor(countCommentatorKeys / 2)
        : 0;

      msg +=
        `Language: ${languageSelectionData.authorsForLanguage.languageName} checkbox is ` +
        (formData.has(
          `${languageSelectionData.authorsForLanguage.languageId}${languageCheckboxLSC_NameSuffix}`
        )
          ? "checked. "
          : "unchecked. ");
      msg += "\n";
      msg += `${numTranslators} translator(s) selected: `;
      for (let i = 0; i < numTranslators; i++) {
        let key = `${languageSelectionData.authorsForLanguage.languageId}${translatorsListBoxLSC_NameSuffix}[${i}][name]`;
        msg += formData.get(key) + ", ";
      }
      msg += "\n";
      msg += `${numCommentators} commentator(s) selected: `;
      for (let i = 0; i < numCommentators; i++) {
        let key = `${languageSelectionData.authorsForLanguage.languageId}${commentatorsListBoxLSC_NameSuffix}[${i}][name]`;
        msg += formData.get(key) + ", ";
      }
      msg += "\n---------\n";
    });
    setShowData(msg);
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
      {/* <form className="my-4" action={createLanguageIdsCookie}> */}
      <form className="my-4" onSubmit={handleSubmit}>
        <h4 className="text-lg mb-4">
          Select languages and associated translators and commentators shown in
          Verse page
        </h4>
        <div className="flex justify-start flex-wrap gap-x-4 gap-y-4">
          {allLanguageSelectionsData.map(
            (languageSelectionData: any, index: any) => {
              return (
                <div key={index}>
                  <LanguageSelections
                    languageId={
                      languageSelectionData.authorsForLanguage.languageId
                    }
                    languageName={
                      languageSelectionData.authorsForLanguage.languageName
                    }
                    languageChecked={languageSelectionData.languageChecked}
                    setLanguageChecked={
                      languageSelectionData.setLanguageChecked
                    }
                    languageCheckBoxName={`${languageSelectionData.authorsForLanguage.languageId}${languageCheckboxLSC_NameSuffix}`}
                    allTranslators={
                      languageSelectionData.authorsForLanguage.translatorAuthors
                    }
                    selectedTranslators={
                      languageSelectionData.selectedTranslators
                    }
                    setSelectedTranslators={
                      languageSelectionData.setSelectedTranslators
                    }
                    translatorsListBoxName={`${languageSelectionData.authorsForLanguage.languageId}${translatorsListBoxLSC_NameSuffix}`}
                    allCommentators={
                      languageSelectionData.authorsForLanguage
                        .commentatorAuthors
                    }
                    selectedCommentators={
                      languageSelectionData.selectedCommentators
                    }
                    setSelectedCommentators={
                      languageSelectionData.setSelectedCommentators
                    }
                    commentatorsListBoxName={`${languageSelectionData.authorsForLanguage.languageId}${commentatorsListBoxLSC_NameSuffix}`}
                    setSelectionChanged={setFormDataModified}
                  />
                </div>
              );
            }
          )}
        </div>

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
      <div className="text-left ">
        <p className="mt-4">
          Page component showing data from LanguageSelectionsUcF components and
          each of its two AuthorListUcF children components above:
        </p>
        {showData.split("\n").map((line, index) => {
          return <p key={index}>{line}</p>;
        })}
      </div>
    </div>
  );
}
export default Settings;
