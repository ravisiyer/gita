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
  DEFAULT_CHAPTER_PAGE_TRANSLATOR_AUTHOR_ID_STR,
  CHAPTER_PAGE_TRANSLATOR_FIELD_NAME,
  QMARK_TO_COMMA_FIELD_NAME,
  DEFAULT_QMARK_TO_COMMA_VALUE,
  DEFAULT_ENGLISH_LTS_CHECKED,
  DEFAULT_HINDI_LTS_CHECKED,
  ENGLISH_LTS_LANGUAGE_NAME,
  HINDI_LTS_LANGUAGE_NAME,
} from "../constants";
import {
  getAllLanguageTranslatorAuthors,
  setupDefaultSAFAL,
} from "../lib/settingsutil";
import ChapterPageTranslatorSelection from "./ChapterPageTranslatorSelection";
import QMarkIssueHack from "./QMarkIssueHack";
import LanguageTitleSummary from "./LanguageTitleSummary";

function Settings({
  authorsForAllLanguages,
  //SAFAL stands for SelectedAuthorsForAllLanguages
  sAFAL,
  initialChapterPageTranslatorAuthorIdStr = DEFAULT_CHAPTER_PAGE_TRANSLATOR_AUTHOR_ID_STR,
  initialQMarkToCommaChecked = DEFAULT_QMARK_TO_COMMA_VALUE,
  initialEnglishLTSChecked = DEFAULT_ENGLISH_LTS_CHECKED,
  initialHindiLTSChecked = DEFAULT_HINDI_LTS_CHECKED,
}: {
  authorsForAllLanguages: authorsForLanguageT[];
  sAFAL: Partial<authorsForLanguageT>[];
  initialChapterPageTranslatorAuthorIdStr?: string;
  initialQMarkToCommaChecked?: boolean;
  initialEnglishLTSChecked?: boolean;
  initialHindiLTSChecked?: boolean;
}) {
  const [formDataModified, setFormDataModified] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [qMarkToCommaChecked, setQMarkToCommaChecked] = useState(
    initialQMarkToCommaChecked
  );
  const [englishLTSChecked, setEnglishLTSChecked] = useState(
    initialEnglishLTSChecked
  );
  const [hindiLTSChecked, setHindiLTSChecked] = useState(
    initialHindiLTSChecked
  );
  const [
    chapterPageTranslatorAuthorIdStr,
    setChapterPageTranslatorAuthorIdStr,
  ] = useState(initialChapterPageTranslatorAuthorIdStr);

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

  const allLanguageTranslatorAuthors = getAllLanguageTranslatorAuthors(
    authorsForAllLanguages
  );
  let numChapterPageTranslatorAuthorId = parseInt(
    DEFAULT_CHAPTER_PAGE_TRANSLATOR_AUTHOR_ID_STR
  );
  if (chapterPageTranslatorAuthorIdStr) {
    const tmp = parseInt(chapterPageTranslatorAuthorIdStr);
    if (!Number.isNaN(tmp)) {
      numChapterPageTranslatorAuthorId = tmp;
    }
  }

  let selectedAuthorIndex = 0;
  allLanguageTranslatorAuthors.some((languageTranslatorAuthor, index) => {
    if (
      languageTranslatorAuthor.authorId === numChapterPageTranslatorAuthorId
    ) {
      selectedAuthorIndex = index;
      return true;
    } else {
      return false;
    }
  });
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

  function handleDefaultSettings(e: React.MouseEvent) {
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

    setQMarkToCommaChecked(DEFAULT_QMARK_TO_COMMA_VALUE);
    setEnglishLTSChecked(DEFAULT_ENGLISH_LTS_CHECKED);
    setHindiLTSChecked(DEFAULT_HINDI_LTS_CHECKED);
    setChapterPageTranslatorAuthorIdStr(
      DEFAULT_CHAPTER_PAGE_TRANSLATOR_AUTHOR_ID_STR
    );

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
      <h2 className="text-3xl">Settings</h2>
      <form className="my-4" action={createlSCookie}>
        <div className="border border-black p-2">
          <h3 className="text-2xl mb-4">Verse Page</h3>
          <div>
            <h4 className="text-lg mb-2">
              Select languages and associated translators and commentators
              {/* Select languages and associated translators and commentators shown
              in Verse page */}
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
                      setLanguageChecked={
                        languageSelectionData.setLanguageChecked
                      }
                      languageCheckBoxName={`${languageSelectionData.authorsForLanguage.languageId}${LANGUAGE_CHECKBOX_LSC_NAME_SUFFIX}`}
                      allTranslators={
                        languageSelectionData.authorsForLanguage
                          .translatorAuthors
                      }
                      selectedTranslators={
                        languageSelectionData.selectedTranslators!
                      }
                      setSelectedTranslators={
                        languageSelectionData.setSelectedTranslators
                      }
                      translatorsListBoxName={`${languageSelectionData.authorsForLanguage.languageId}${TRANSLATORS_LISTBOX_LSC_NAME_SUFFIX}`}
                      allCommentators={
                        languageSelectionData.authorsForLanguage
                          .commentatorAuthors
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
          </div>
          <QMarkIssueHack
            qMarkToCommaChecked={qMarkToCommaChecked}
            setQMarkToCommaChecked={setQMarkToCommaChecked}
            name={QMARK_TO_COMMA_FIELD_NAME}
            setSelectionChanged={setFormDataModified}
          />
        </div>
        <div className="border border-black p-2 mt-4">
          <h3 className="text-2xl mb-4">Chapter Page</h3>
          <ChapterPageTranslatorSelection
            allLanguageTranslatorAuthors={allLanguageTranslatorAuthors}
            selectedAuthorIndex={selectedAuthorIndex}
            name={CHAPTER_PAGE_TRANSLATOR_FIELD_NAME}
            setSelectionChanged={setFormDataModified}
            // Below key results in reset of state of ChapterPageTranslatorSelection component
            // when selectedAuthorIndex changes.
            // Ref: https://react.dev/learn/you-might-not-need-an-effect#resetting-all-state-when-a-prop-changes
            key={selectedAuthorIndex}
          />
        </div>
        <div className="border border-black p-2 mt-4">
          <h3 className="text-2xl mb-4">
            Home, Chapter and Chapter Summaries Pages
          </h3>
          <LanguageTitleSummary
            languageEnglishChecked={englishLTSChecked}
            setLanguageEnglishChecked={setEnglishLTSChecked}
            languageEnglishName={ENGLISH_LTS_LANGUAGE_NAME}
            languageHindiChecked={hindiLTSChecked}
            setLanguageHindiChecked={setHindiLTSChecked}
            languageHindiName={HINDI_LTS_LANGUAGE_NAME}
            setSelectionChanged={setFormDataModified}
          />
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
          onClick={(e) => handleDefaultSettings(e)}
        >
          Use default settings
        </button>
      </form>
    </div>
  );
}
export default Settings;
