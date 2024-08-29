"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Checkbox,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Label,
} from "@headlessui/react";
import LanguageSelections from "../ui/LanguageSelections";
import { authorsForLanguageT, authorIdNameT } from "../lib/addltypes-d";
import {
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
  FULL_WINDOW_WIDTH_FIELD_NAME,
  DEFAULT_FULL_WINDOW_WIDTH_CHECKED,
  TAILWIND_MD_BREAKPOINT,
} from "../constants/constants";
import {
  getAllLanguageTranslatorAuthors,
  setupDefaultSAFAL,
} from "../lib/settingsutil";
import ChapterPageTranslatorSelection from "./ChapterPageTranslatorSelection";
import QMarkIssueHack from "./QMarkIssueHack";
import LanguageTitleSummary from "./LanguageTitleSummary";
import FullWindowWidth from "./FullWindowWidth";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import useMediaQuery from "../hooks/usemediaquery";
import { createGitaAppCookie } from "../lib/cookieutil";
import { revalidateAppPaths } from "../lib/actions";

function Settings({
  authorsForAllLanguages,
  //SAFAL stands for SelectedAuthorsForAllLanguages
  sAFAL,
  initialChapterPageTranslatorAuthorIdStr = DEFAULT_CHAPTER_PAGE_TRANSLATOR_AUTHOR_ID_STR,
  initialQMarkToCommaChecked = DEFAULT_QMARK_TO_COMMA_VALUE,
  initialEnglishLTSChecked = DEFAULT_ENGLISH_LTS_CHECKED,
  initialHindiLTSChecked = DEFAULT_HINDI_LTS_CHECKED,
  initialFullWindowWidthChecked = DEFAULT_FULL_WINDOW_WIDTH_CHECKED,
}: {
  authorsForAllLanguages: authorsForLanguageT[];
  sAFAL: Partial<authorsForLanguageT>[];
  initialChapterPageTranslatorAuthorIdStr?: string;
  initialQMarkToCommaChecked?: boolean;
  initialEnglishLTSChecked?: boolean;
  initialHindiLTSChecked?: boolean;
  initialFullWindowWidthChecked?: boolean;
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
  const [fullWindowWidthChecked, setFullWindowWidthChecked] = useState(
    initialFullWindowWidthChecked
  );

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

  const [selectedTranslators1, setSelectedTranslators1] = useState(
    sAFAL[1].translatorAuthors
  );
  const [selectedCommentators1, setSelectedCommentators1] = useState(
    sAFAL[1].commentatorAuthors
  );

  const [selectedTranslators2, setSelectedTranslators2] = useState(
    sAFAL[2].translatorAuthors
  );
  const [selectedCommentators2, setSelectedCommentators2] = useState(
    sAFAL[2].commentatorAuthors
  );

  const [submitInvokedOnce, setSubmitInvokedOnce] = useState(false);

  // Below code sets up allLanguageSelectsionData array which we can then iterate through without
  // having to refer to specific state variables like selectedTranslators0.
  // Once again, the code is not great and the cause, as mentioned earlier, is that I don't know how to
  // define an array of useState variables in React functional components.
  //
  type allLanguageSelectionsDataT = {
    authorsForLanguage: authorsForLanguageT;
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
    selectedTranslators: selectedTranslators0,
    setSelectedTranslators: setSelectedTranslators0,
    selectedCommentators: selectedCommentators0,
    setSelectedCommentators: setSelectedCommentators0,
  };
  allLanguageSelectionsData[1] = {
    authorsForLanguage: authorsForAllLanguages[1],
    selectedTranslators: selectedTranslators1,
    setSelectedTranslators: setSelectedTranslators1,
    selectedCommentators: selectedCommentators1,
    setSelectedCommentators: setSelectedCommentators1,
  };
  allLanguageSelectionsData[2] = {
    authorsForLanguage: authorsForAllLanguages[2],
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

    // Below code sets the specific state variables like selectedTranslators0, selectedCommentators0.
    // Once again, the code is not great and the cause, as mentioned earlier, is that I don't know how to
    // define an array of useState variables in React functional components.
    //
    setSelectedTranslators0(defaultSAFAL[0].translatorAuthors);
    setSelectedCommentators0(defaultSAFAL[0].commentatorAuthors);
    setSelectedTranslators1(defaultSAFAL[1].translatorAuthors);
    setSelectedCommentators1(defaultSAFAL[1].commentatorAuthors);
    setSelectedTranslators2(defaultSAFAL[2].translatorAuthors);
    setSelectedCommentators2(defaultSAFAL[2].commentatorAuthors);

    setQMarkToCommaChecked(DEFAULT_QMARK_TO_COMMA_VALUE);
    setEnglishLTSChecked(DEFAULT_ENGLISH_LTS_CHECKED);
    setHindiLTSChecked(DEFAULT_HINDI_LTS_CHECKED);
    setChapterPageTranslatorAuthorIdStr(
      DEFAULT_CHAPTER_PAGE_TRANSLATOR_AUTHOR_ID_STR
    );
    setFullWindowWidthChecked(DEFAULT_FULL_WINDOW_WIDTH_CHECKED);

    setFormDataModified(true);
  }

  function handleForcedBack() {
    setIsDialogOpen(false);
    router.back();
  }

  function handleCancel() {
    setIsDialogOpen(false);
  }

  //TOrC below stands for Translator or Commentator
  function isAtLeastOneTOrCSelected() {
    return allLanguageSelectionsData.some(
      (languageSelectionData) =>
        languageSelectionData.selectedCommentators?.length! > 0 ||
        languageSelectionData.selectedTranslators?.length! > 0
    );
  }

  async function formActionWrapper(formData: FormData) {
    createGitaAppCookie(formData);
    setFormDataModified(false);
    await revalidateAppPaths(); // server action
  }

  function handleSubmit(e: React.FormEvent) {
    if (!isAtLeastOneTOrCSelected()) {
      setDialogMessage(
        "Please select at least one translator or commentator for verse page."
      );
      setIsDialogOpen(true);
      e.preventDefault(); // Don't proceed to save settings
      return;
    } else {
      setIsDialogOpen(false);
      setSubmitInvokedOnce(true);
      return; // Proceed to save settings
    }
  }

  const tailwindMDBreakpoint = useMediaQuery(TAILWIND_MD_BREAKPOINT);
  // True if min. window width is TAILWIND_MD_BREAKPOINT (768)

  return (
    <div className="px-2 pb-2">
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

      <form className="my-4" onSubmit={handleSubmit} action={formActionWrapper}>
        <TabGroup>
          <TabList className="flex gap-2">
            <Tab className="rounded-full py-1 px-3 font-semibold text-black border border-black focus:outline-none data-[selected]:bg-orange-400 data-[hover]:bg-orange-300 data-[selected]:data-[hover]:bg-orange-400 data-[focus]:outline-1 data-[focus]:outline-black">
              Verse
              <span className="hidden min-[440px]:inline">&nbsp;Page</span>
            </Tab>
            <Tab className="rounded-full py-1 px-3 font-semibold text-black border border-black focus:outline-none data-[selected]:bg-orange-400 data-[hover]:bg-orange-300 data-[selected]:data-[hover]:bg-orange-400 data-[focus]:outline-1 data-[focus]:outline-black">
              Chapter
              <span className="hidden min-[440px]:inline">&nbsp;Page</span>
            </Tab>
            <Tab className="rounded-full py-1 px-3 font-semibold text-black border border-black focus:outline-none data-[selected]:bg-orange-400 data-[hover]:bg-orange-300 data-[selected]:data-[hover]:bg-orange-400 data-[focus]:outline-1 data-[focus]:outline-black">
              <span className="hidden min-[440px]:inline">Entire&nbsp;</span>
              App
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel unmount={false}>
              <div className=" p-2 mt-3">
                <h4 className="text-lg mb-2 line-clamp-1">
                  Select translator(s) & commentator(s)
                </h4>
                <TabGroup>
                  <TabList className="flex gap-2 md:hidden">
                    {allLanguageSelectionsData.map(
                      (languageSelectionData, index) => {
                        return (
                          <Tab
                            key={index}
                            className="rounded-full py-1 px-3 font-semibold text-black border border-black focus:outline-none data-[selected]:bg-orange-400 data-[hover]:bg-orange-300 data-[selected]:data-[hover]:bg-orange-400 data-[focus]:outline-1 data-[focus]:outline-black"
                          >
                            {
                              <div className="flex items-center gap-2 ">
                                {/* <Checkbox className="group block size-4 rounded border border-black data-[checked]:bg-blue-500">
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
                                </Checkbox> */}
                                {
                                  languageSelectionData.authorsForLanguage
                                    .languageName
                                }
                              </div>
                            }
                          </Tab>
                        );
                      }
                    )}
                  </TabList>
                  <TabPanels>
                    <div className="flex justify-start flex-wrap gap-x-4 gap-y-4 mt-3">
                      {allLanguageSelectionsData.map(
                        (languageSelectionData, index) => {
                          return (
                            <TabPanel
                              key={index}
                              unmount={false}
                              static={tailwindMDBreakpoint ? true : false}
                            >
                              <div key={index}>
                                <LanguageSelections
                                  languageId={
                                    languageSelectionData.authorsForLanguage
                                      .languageId
                                  }
                                  languageName={
                                    languageSelectionData.authorsForLanguage
                                      .languageName
                                  }
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
                            </TabPanel>
                          );
                        }
                      )}
                    </div>
                  </TabPanels>
                </TabGroup>
              </div>
              <hr className="border border-gray-400 mt-2" />
              <div className="p-2">
                <QMarkIssueHack
                  qMarkToCommaChecked={qMarkToCommaChecked}
                  setQMarkToCommaChecked={setQMarkToCommaChecked}
                  name={QMARK_TO_COMMA_FIELD_NAME}
                  setSelectionChanged={setFormDataModified}
                />
              </div>
            </TabPanel>
            <TabPanel unmount={false}>
              <div className="min-h-80 p-2 mt-3">
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
            </TabPanel>
            <TabPanel unmount={false}>
              <div className="flex flex-wrap gap-4 min-h-80 p-2 mt-3">
                <LanguageTitleSummary
                  languageEnglishChecked={englishLTSChecked}
                  setLanguageEnglishChecked={setEnglishLTSChecked}
                  languageEnglishName={ENGLISH_LTS_LANGUAGE_NAME}
                  languageHindiChecked={hindiLTSChecked}
                  setLanguageHindiChecked={setHindiLTSChecked}
                  languageHindiName={HINDI_LTS_LANGUAGE_NAME}
                  setSelectionChanged={setFormDataModified}
                />
                <FullWindowWidth
                  fullWindowWidthChecked={fullWindowWidthChecked}
                  setFullWindowWidthChecked={setFullWindowWidthChecked}
                  name={FULL_WINDOW_WIDTH_FIELD_NAME}
                  setSelectionChanged={setFormDataModified}
                />
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>

        <div className="ml-2">
          <button
            type="submit"
            disabled={!formDataModified}
            className={
              "px-1 mt-2 leading-normal border-black border  text-black  bg-white rounded-md cursor-pointer hover:text-black hover:bg-violet-400 active:scale-90 " +
              (formDataModified
                ? " pointer-events-auto"
                : " disabled:bg-slate-500 pointer-events-none")
            }
          >
            Save settings
          </button>
          {submitInvokedOnce && !formDataModified && (
            <span className="ml-4"> Settings saved </span>
          )}

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
        </div>
      </form>
    </div>
  );
}
export default Settings;
