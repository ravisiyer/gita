"use client";
import "@/app/ui/global.css";
import Link from "next/link";
import {
  FIRST_CHAPTERNUMBER,
  LAST_CHAPTERNUMBER,
  FIRST_VERSEID,
  LAST_VERSEID,
} from "@/app/constants";
import SelectChapterVerse from "./selectchapver";
import { usePathname } from "next/navigation";
import {
  getValNumericChapterNumber,
  getValNumericVerseId,
  getCVNumbersFromVerseId,
} from "../lib/util";
import { useEffect, useState } from "react";
import { GrLinkUp, GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IconType } from "react-icons";
import { AiFillHome } from "react-icons/ai";

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

  const [chapterNumber, setChapterNumber] = useState("");
  const [verseNumber, setVerseNumber] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  function closeMobileMenuIfOpen(): void {
    isMobileMenuOpen ? setIsMobileMenuOpen(false) : null;
  }
  const menuLinkClickHandler = () =>
    isMobileMenuOpen ? setIsMobileMenuOpen(false) : null;

  const pathname = usePathname();

  // Code in useEffect to try to avoid unnecessary repeated execution.
  useEffect(() => {
    if (pathname === "/") {
      setChapterNumber("");
      setVerseNumber("");
      setUpHref("");
      setPrevHref("");
      setNextHref("");
    } else {
      const pathSegments = pathname.split("/");
      if (pathSegments.length === 2) {
        const pathChapterNumber = pathSegments[1];
        // console.log("In Navbar, pathChapterNumber:", pathChapterNumber);
        const valChapterNumber = getValNumericChapterNumber(pathChapterNumber);
        if (valChapterNumber.valid) {
          const numericChapterNumber = valChapterNumber.numericChapterNumber;
          if (numericChapterNumber > 0) {
            setChapterNumber(pathChapterNumber);
            setVerseNumber("");
            setUpHref("/");
            if (numericChapterNumber > FIRST_CHAPTERNUMBER) {
              setPrevHref(`/${numericChapterNumber - 1}`);
            } else {
              setPrevHref("");
            }
            if (numericChapterNumber < LAST_CHAPTERNUMBER) {
              setNextHref(`/${numericChapterNumber + 1}`);
            } else {
              setNextHref("");
            }
          }
        }
      } else if (pathSegments.length === 3) {
        const pathVerseId = pathSegments[2];
        // console.log("In Navbar, pathVerseId:", pathVerseId);
        const valVerseId = getValNumericVerseId(pathVerseId);
        if (valVerseId.valid) {
          const numericVerseId = valVerseId.numericVerseId;
          if (numericVerseId > 0) {
            const chapVerseNumbers = getCVNumbersFromVerseId(pathVerseId);
            setChapterNumber(chapVerseNumbers.chapterNumber);
            setVerseNumber(chapVerseNumbers.verseNumber);
            setUpHref(`/${chapVerseNumbers.chapterNumber}`);
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
      }
    }
    // console.log("In Navbar useEffect(): Just before exiting");
  }, [pathname]);

  // console.log("Just before rendering Navbar div");
  // console.log("href values:", prevHref, nextHref, upHref);
  return (
    <header className="leading-5 sticky top-0 z-10 bg-blue-800">
      <section className="mx-auto flex justify-between items-center max-w-4xl p-4">
        <h1 className="text-2xl font-bold">
          <Link
            href="/"
            className="flex justify-center items-center w-full h-full md:w-auto md:h-auto pr-2 text-orange-400 hover:opacity-70"
          >
            <span className="hidden min-[440px]:inline">Bhagavad&nbsp;</span>
            Gita
          </Link>
        </h1>
        <nav>
          <div className="flex justify-between items-center gap-x-10">
            <ul className="flex flex-row gap-x-3 h-auto pb-0 text-lg md:hidden">
              {/* <MenuLink
                href="/"
                clickHandler={menuLinkClickHandler}
                icon={AiFillHome}
                text=""
              /> */}
              <MenuLink
                href={prevHref}
                clickHandler={menuLinkClickHandler}
                icon={GrLinkPrevious}
                text=""
                disabled={prevHref === ""}
              />
              <MenuLink
                href={nextHref}
                clickHandler={menuLinkClickHandler}
                icon={GrLinkNext}
                text=""
                disabled={nextHref === ""}
              />
              <MenuLink
                href={upHref}
                clickHandler={menuLinkClickHandler}
                icon={GrLinkUp}
                text=""
                disabled={upHref === ""}
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
              "grid grid-cols-1 absolute w-full h-[40vh] pb-4 text-3xl leading-4 list-none md:flex md:flex-row md:static md:h-auto md:pb-0 md:text-lg " +
              (isMobileMenuOpen
                ? " top-full left-0 bg-black text-white md:bg-blue-800"
                : " top-[-9999px] left-0 bg-blue-800 text-white")
            }
          >
            <MenuLink
              href="/"
              clickHandler={menuLinkClickHandler}
              icon={AiFillHome}
              text="Home"
            />
            <MenuLink
              href={prevHref}
              clickHandler={menuLinkClickHandler}
              icon={GrLinkPrevious}
              text="Prev"
              disabled={prevHref === ""}
            />
            <MenuLink
              href={nextHref}
              clickHandler={menuLinkClickHandler}
              icon={GrLinkNext}
              text="Next"
              disabled={nextHref === ""}
            />
            <MenuLink
              href={upHref}
              clickHandler={menuLinkClickHandler}
              icon={GrLinkUp}
              text="Up"
              disabled={upHref === ""}
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
              clickHandler={menuLinkClickHandler}
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
