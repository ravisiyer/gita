"use client";
import "@/app/ui/global.css";
import Link from "next/link";
import {
  FIRST_CHAPTERNUMBER,
  LAST_CHAPTERNUMBER,
  FIRST_VERSEID,
  LAST_VERSEID,
  MAIN_CONTAINER_MAX_WIDTH_TAILWIND,
  SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR,
} from "@/app/constants/constants";
import SelectChapterVerse from "./selectchapver";
import { usePathname } from "next/navigation";
import {
  getValNumericChapterNumber,
  getValNumericVerseId,
  getCVNumbersFromVerseId,
} from "../lib/util";
import { useEffect, useState } from "react";
import { GrLinkUp, GrPrevious, GrNext } from "react-icons/gr";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IconType } from "react-icons";
import { IoMdSettings } from "react-icons/io";

function MenuLink({
  href,
  clickHandler,
  icon,
  text = "",
  disabled = false,
  mdLeftMargin = false,
}: {
  href: string;
  clickHandler: () => void;
  icon: IconType;
  text: string;
  disabled?: boolean;
  mdLeftMargin?: boolean;
}) {
  const MenuIcon = icon;
  return (
    <li
      className={
        "flex justify-center items-center w-full h-full  md:w-auto md:h-auto" +
        (mdLeftMargin ? " md:ml-3" : "")
      }
    >
      <Link
        href={href}
        className={
          "flex justify-center items-center w-full h-full md:w-auto md:h-auto pr-2 hover:opacity-80" +
          (disabled ? " text-neutral-500 pointer-events-none " : " text-white")
        }
        onClick={clickHandler}
      >
        <MenuIcon className="size-6" />
        {text.length ? <p>{text}</p> : ""}
      </Link>
    </li>
  );
}

// idSuffix is used to differentiate between Navbar child component SelectChapterVerse's input element ids
// if two Navbar components are used on same page - e.g. at top of page and bottom of page.
// Note that HTML spec. states that each element id must be unique
function Navbar({ idSuffix = "" }) {
  const [nextHref, setNextHref] = useState("");
  const [prevHref, setPrevHref] = useState("");
  const [upHref, setUpHref] = useState("");

  const [chapterNumber, setChapterNumber] = useState(
    SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR
  );
  const [verseNumber, setVerseNumber] = useState(
    SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  function closeMobileMenuIfOpen(): void {
    isMobileMenuOpen ? setIsMobileMenuOpen(false) : null;
  }

  const pathname = usePathname();

  // Code in useEffect to try to avoid unnecessary repeated execution.
  useEffect(() => {
    const pathSegments = pathname.split("/");
    if (pathSegments.length === 3 && pathSegments[1] === "chapter") {
      const pathChapterNumber = pathSegments[2];
      // console.log("In Navbar, pathChapterNumber:", pathChapterNumber);
      const valChapterNumber = getValNumericChapterNumber(pathChapterNumber);
      if (valChapterNumber.valid) {
        const numericChapterNumber = valChapterNumber.numericChapterNumber;
        if (numericChapterNumber > 0) {
          setChapterNumber(pathChapterNumber);
          setVerseNumber(SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR);
          setUpHref("/");
          if (numericChapterNumber > FIRST_CHAPTERNUMBER) {
            setPrevHref(`/chapter/${numericChapterNumber - 1}`);
          } else {
            setPrevHref("");
          }
          if (numericChapterNumber < LAST_CHAPTERNUMBER) {
            setNextHref(`/chapter/${numericChapterNumber + 1}`);
          } else {
            setNextHref("");
          }
        }
      }
    } else if (pathSegments.length === 3 && pathSegments[1] === "verse") {
      const pathVerseId = pathSegments[2];
      // console.log("In Navbar, pathVerseId:", pathVerseId);
      const valVerseId = getValNumericVerseId(pathVerseId);
      if (valVerseId.valid) {
        const numericVerseId = valVerseId.numericVerseId;
        if (numericVerseId > 0) {
          const chapVerseNumbers = getCVNumbersFromVerseId(pathVerseId);
          setChapterNumber(chapVerseNumbers.chapterNumber);
          setVerseNumber(chapVerseNumbers.verseNumber);
          setUpHref(`/chapter/${chapVerseNumbers.chapterNumber}`);
          if (numericVerseId > FIRST_VERSEID) {
            setPrevHref(`/verse/${numericVerseId - 1}`);
          } else {
            setPrevHref("");
          }
          if (numericVerseId < LAST_VERSEID) {
            setNextHref(`/verse/${numericVerseId + 1}`);
          } else {
            setNextHref("");
          }
        }
      }
    } else {
      setChapterNumber(SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR);
      setVerseNumber(SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR);
      setUpHref("");
      setPrevHref("");
      setNextHref("");
    }
    // console.log("In Navbar useEffect(): Just before exiting");
  }, [pathname]);

  // console.log("Just before rendering Navbar div");
  // console.log("href values:", prevHref, nextHref, upHref);
  return (
    <header className="leading-5 sticky top-0 z-10 bg-blue-800">
      <section
        className={
          "mx-auto flex justify-between items-center p-2 " +
          MAIN_CONTAINER_MAX_WIDTH_TAILWIND
        }
      >
        <h1 className="text-xl font-bold">
          <Link
            href="/"
            className="flex justify-center items-center w-full h-full md:w-auto md:h-auto pr-2 text-orange-400 hover:opacity-70"
          >
            <span className="hidden min-[440px]:inline">Bhagavad&nbsp;</span>
            {/* <span className="hidden sm:inline">Bhagavad&nbsp;</span> */}
            Gita
          </Link>
        </h1>
        <nav>
          <div className="flex justify-between items-center gap-x-10">
            <ul className="flex flex-row gap-x-3 h-auto pb-0 md:hidden">
              <MenuLink
                href={prevHref}
                clickHandler={closeMobileMenuIfOpen}
                icon={GrPrevious}
                text=""
                disabled={prevHref === ""}
              />
              <MenuLink
                href={nextHref}
                clickHandler={closeMobileMenuIfOpen}
                icon={GrNext}
                text=""
                disabled={nextHref === ""}
              />
              <MenuLink
                href={upHref}
                clickHandler={closeMobileMenuIfOpen}
                icon={GrLinkUp}
                text=""
                disabled={upHref === ""}
              />
              <MenuLink
                href="/settings"
                clickHandler={closeMobileMenuIfOpen}
                icon={IoMdSettings}
                text=""
              />
            </ul>
            <button
              className={"block cursor-pointer bg-blue-800 md:hidden"}
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span
                className={
                  "block w-6 h-[3px] mx-auto my-[5px] cursor-pointer caret-transparent bg-white transition-all" +
                  (isMobileMenuOpen ? " translate-y-2 rotate-45" : "")
                }
              ></span>
              <span
                className={
                  "block w-6 h-[3px] mx-auto my-[5px] cursor-pointer caret-transparent bg-white transition-all" +
                  (isMobileMenuOpen ? " opacity-0" : "")
                }
              ></span>
              <span
                className={
                  "block w-6 h-[3px] mx-auto my-[5px] cursor-pointer caret-transparent bg-white transition-all" +
                  (isMobileMenuOpen ? " -translate-y-2 -rotate-45" : "")
                }
              ></span>
            </button>
          </div>
          <ul
            className={
              "grid grid-cols-1 absolute w-full h-[40vh] pb-4 text-3xl leading-4 list-none md:flex md:flex-row md:static md:h-auto md:pb-0 md:text-base " +
              (isMobileMenuOpen
                ? " top-full left-0 bg-black text-white md:bg-blue-800"
                : " top-[-9999px] left-0 bg-blue-800 text-white")
            }
          >
            <MenuLink
              href={prevHref}
              clickHandler={closeMobileMenuIfOpen}
              icon={GrPrevious}
              text="Prev"
              disabled={prevHref === ""}
            />
            <MenuLink
              href={nextHref}
              clickHandler={closeMobileMenuIfOpen}
              icon={GrNext}
              text="Next"
              disabled={nextHref === ""}
            />
            <MenuLink
              href={upHref}
              clickHandler={closeMobileMenuIfOpen}
              icon={GrLinkUp}
              text="Up"
              disabled={upHref === ""}
            />
            <MenuLink
              href="/settings"
              clickHandler={closeMobileMenuIfOpen}
              icon={IoMdSettings}
              text="Settings"
            />
            <li className="flex justify-center items-center w-full h-full md:w-auto md:h-auto">
              <SelectChapterVerse
                initialChapterNumber={chapterNumber}
                initialVerseNumber={verseNumber}
                idSuffix={idSuffix}
                closeMobileMenuIfOpen={closeMobileMenuIfOpen}
              />
            </li>
            <MenuLink
              href="/about"
              clickHandler={closeMobileMenuIfOpen}
              icon={IoInformationCircleOutline}
              text="About"
              mdLeftMargin={true}
            />
          </ul>
        </nav>
      </section>
    </header>
  );
}
export default Navbar;
