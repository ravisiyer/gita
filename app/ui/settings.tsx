"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createlSCookie } from "../lib/actions";
import { SubmitButton } from "../ui/submit-button";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import LanguageSelections from "../ui/LanguageSelections";
import { authorsForLanguageT, authorIdNameT } from "../lib/addltypes-d";
import {
  LANGUAGE_CHECKBOX_LSC_NAME_SUFFIX,
  TRANSLATORS_LISTBOX_LSC_NAME_SUFFIX,
  COMMENTATORS_LISTBOX_LSC_NAME_SUFFIX,
} from "../constants";
import { setupDefaultSAFAL } from "../lib/settingsutil";

function Settings({
  authorsForAllLanguages,
  //SAFAL stands for SelectedAuthorsForAllLanguages
  sAFAL,
}: {
  authorsForAllLanguages: authorsForLanguageT[];
  sAFAL: Partial<authorsForLanguageT>[];
}) {
  const [formDataModified, setFormDataModified] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  // Below code is not great. I don't know how to create an array of useState variables in
  // React functional components, and so below code. Note that Headless UI ListBox when used
  // in controlled component way (which is what we need for better UI handling),
  // needs a state variable to be passed to it.
  // Further note that useState variable holding an array is no problem. But we need an
  // array of useState variables.
  const [selectedTranslators0, setSelectedTranslators0] = useState(
    sAFAL[0].translatorAuthors
  );
  const [selectedCommentators0, setSelectedCommentators0] = useState(
    sAFAL[0].commentatorAuthors
  );
  const [language0Checked, setLanguage0Checked] = useState(
    sAFAL[0].translatorAuthors?.length || sAFAL[0].commentatorAuthors?.length
      ? true
      : false
  );

  const [selectedTranslators1, setSelectedTranslators1] = useState(
    sAFAL[1].translatorAuthors
  );
  const [selectedCommentators1, setSelectedCommentators1] = useState(
    sAFAL[1].commentatorAuthors
  );
  const [language1Checked, setLanguage1Checked] = useState(
    sAFAL[1].translatorAuthors?.length || sAFAL[1].commentatorAuthors?.length
      ? true
      : false
  );

  const [selectedTranslators2, setSelectedTranslators2] = useState(
    sAFAL[2].translatorAuthors
  );
  const [selectedCommentators2, setSelectedCommentators2] = useState(
    sAFAL[2].commentatorAuthors
  );
  const [language2Checked, setLanguage2Checked] = useState(
    sAFAL[2].translatorAuthors?.length || sAFAL[2].commentatorAuthors?.length
      ? true
      : false
  );

  // Below code sets up allLanguageSelectsionData array which we can then iterate through without
  // having to refer to specific state variables like selectedTranslators0.
  // Once again, the code is not great and the cause, as mentioned earlier, is that I don't know how to
  // define an array of useState variables in React functional components.
  //
  type allLanguageSelectionsDataT = {
    authorsForLanguage: authorsForLanguageT;
    languageChecked: boolean;
    setLanguageChecked: (languageChecked: boolean) => void;
    selectedTranslators: authorIdNameT[] | undefined;
    setSelectedTranslators: (
      selectedTranslators: authorIdNameT[] | undefined
    ) => void;
    selectedCommentators: authorIdNameT[] | undefined;
    setSelectedCommentators: (
      selectedCommentators: authorIdNameT[] | undefined
    ) => void;
  };

  let allLanguageSelectionsData: allLanguageSelectionsDataT[] = [];
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

  const router = useRouter();

  function handleBack(e: React.MouseEvent) {
    e.preventDefault();
    if (formDataModified) {
      setDialogMessage("You have modified the settings but not saved them.");
      setIsDialogOpen(true);
    } else {
      router.back();
    }
  }

  function handleDefaultLS(e: React.MouseEvent) {
    e.preventDefault();

    //SAFAL stands for SelectedAuthorsForAllLanguages
    const defaultSAFAL = setupDefaultSAFAL();

    // Below code sets the specific state variables like language0Checked, selectedTranslators0, selectedCommentators0.
    // Once again, the code is not great and the cause, as mentioned earlier, is that I don't know how to
    // define an array of useState variables in React functional components.
    //
    setLanguage0Checked(
      defaultSAFAL[0].translatorAuthors?.length ||
        defaultSAFAL[0].commentatorAuthors?.length
        ? true
        : false
    );
    setSelectedTranslators0(defaultSAFAL[0].translatorAuthors);
    setSelectedCommentators0(defaultSAFAL[0].commentatorAuthors);
    setLanguage1Checked(
      defaultSAFAL[1].translatorAuthors?.length ||
        defaultSAFAL[1].commentatorAuthors?.length
        ? true
        : false
    );
    setSelectedTranslators1(defaultSAFAL[1].translatorAuthors);
    setSelectedCommentators1(defaultSAFAL[1].commentatorAuthors);
    setLanguage2Checked(
      defaultSAFAL[2].translatorAuthors?.length ||
        defaultSAFAL[2].commentatorAuthors?.length
        ? true
        : false
    );
    setSelectedTranslators2(defaultSAFAL[2].translatorAuthors);
    setSelectedCommentators2(defaultSAFAL[2].commentatorAuthors);
    setFormDataModified(true);
  }

  function handleForcedBack() {
    setIsDialogOpen(false);
    router.back();
  }

  function handleCancel() {
    setIsDialogOpen(false);
  }

  function isAtLeastOneLanguageChecked() {
    let atLeastOneLanguageChecked = allLanguageSelectionsData.some(
      (languageSelectionData) => languageSelectionData.languageChecked
    );
    // console.log(
    //   `In isAllLanguageSelectionsValid: atLeastOneLanguageChecked is: ${atLeastOneLanguageChecked}`
    // );
    return atLeastOneLanguageChecked;
  }
  // Below function is a callback passed to SubmitButton component. It is not directly invoked by this component's code
  function handleSubmitButtonClickCB() {
    if (!isAtLeastOneLanguageChecked()) {
      setDialogMessage("Please select at least one language.");
      setIsDialogOpen(true);
      return false; // Don't proceed to save settings
    } else {
      setIsDialogOpen(false);
      return true; // Proceed to save settings
    }
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
            <p className="mt-2 text-white">{dialogMessage}</p>
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
      <form className="my-4" action={createlSCookie}>
        <h4 className="text-lg mb-4">
          Select languages and associated translators and commentators shown in
          Verse page
        </h4>
        <div className="flex justify-start flex-wrap gap-x-4 gap-y-4">
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
                  languageChecked={languageSelectionData.languageChecked}
                  setLanguageChecked={languageSelectionData.setLanguageChecked}
                  languageCheckBoxName={`${languageSelectionData.authorsForLanguage.languageId}${LANGUAGE_CHECKBOX_LSC_NAME_SUFFIX}`}
                  allTranslators={
                    languageSelectionData.authorsForLanguage.translatorAuthors
                  }
                  selectedTranslators={
                    languageSelectionData.selectedTranslators!
                  }
                  setSelectedTranslators={
                    languageSelectionData.setSelectedTranslators
                  }
                  translatorsListBoxName={`${languageSelectionData.authorsForLanguage.languageId}${TRANSLATORS_LISTBOX_LSC_NAME_SUFFIX}`}
                  allCommentators={
                    languageSelectionData.authorsForLanguage.commentatorAuthors
                  }
                  selectedCommentators={
                    languageSelectionData.selectedCommentators!
                  }
                  setSelectedCommentators={
                    languageSelectionData.setSelectedCommentators
                  }
                  commentatorsListBoxName={`${languageSelectionData.authorsForLanguage.languageId}${COMMENTATORS_LISTBOX_LSC_NAME_SUFFIX}`}
                  setSelectionChanged={setFormDataModified}
                />
              </div>
            );
          })}
        </div>

        <SubmitButton
          btnLabel="Save settings as browser cookie"
          TWclasses="px-1 mt-2 leading-normal border-black border  text-black  bg-white rounded-md cursor-pointer hover:text-black hover:bg-violet-400 active:scale-90 "
          formDataModified={formDataModified}
          setFormDataModified={setFormDataModified}
          submitSaveMsg="Settings sent to browser as cookie."
          onSubmitButtonClick={handleSubmitButtonClickCB}
        />
        <button
          className="block px-1 mt-4 leading-normal border-black border  text-black  bg-white rounded-md cursor-pointer hover:text-black hover:bg-violet-400 active:scale-90 "
          onClick={(e) => handleBack(e)}
        >
          Back
        </button>
        <button
          className="block px-1 mt-4 leading-normal border-black border  text-black  bg-white rounded-md cursor-pointer hover:text-black hover:bg-violet-400 active:scale-90 "
          onClick={(e) => handleDefaultLS(e)}
        >
          Use default languages settings
        </button>
      </form>
    </div>
  );
}
export default Settings;
