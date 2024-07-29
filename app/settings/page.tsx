"use client";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { allGitaLanguages } from "../alllanguages";
import { createLanguageIdsCookie } from "../lib/actions";
import { getCookie } from "cookies-next";
function Page() {
  const [checkedState, setCheckedState] = useState(
    new Array(allGitaLanguages.length).fill(false)
  );

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
        if (
          id?.toString &&
          initialSelectedLanguageIds.includes(id?.toString())
        ) {
          initialCheckedLanguageIds[index] = true;
        }
      });
    }
    console.log(initialCheckedLanguageIds);
    setCheckedState(initialCheckedLanguageIds);
  }, []);

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  return (
    <div className="px-4 pb-4">
      <p className="text-lg">Settings - Client component</p>
      <form className="my-4" action={createLanguageIdsCookie}>
        <ul>
          {allGitaLanguages.map(({ id, language }, index) => {
            return (
              <li key={index}>
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-input-${index}`}
                    name={`custom-input-${index}`}
                    value={id?.toString()}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                    className="ml-4 w-8"
                  />
                  <label htmlFor={`custom-input-${index}`}>{language}</label>
                </div>
              </li>
            );
          })}
        </ul>
        <input
          type="submit"
          value="Set & Go to 1:1"
          className="px-1 ml-1 leading-normal border-black border  text-black  bg-white rounded-md cursor-pointer hover:text-black hover:bg-violet-400 active:scale-90 "
        />
      </form>
    </div>
  );
}
export default Page;
