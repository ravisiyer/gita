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
  // const [checkedState, setCheckedState] = useState(initialCheckedLangaugeIds);

  useEffect(() => {
    let initialCheckedLangaugeIds: boolean[] = new Array(
      allGitaLanguages.length
    ).fill(false);
    const tmp = getCookie("selectedLangaugeIds");
    // const initialSelectedLangaugeIds: string = tmp ?? "";
    if (tmp) {
      const initialSelectedLangaugeIds: string[] = JSON.parse(
        tmp?.toString() ?? ""
      );
      allGitaLanguages.map(({ id, language }, index) => {
        if (
          id?.toString &&
          initialSelectedLangaugeIds.includes(id?.toString())
        ) {
          initialCheckedLangaugeIds[index] = true;
        }
      });
    }
    console.log(initialCheckedLangaugeIds);
    setCheckedState(initialCheckedLangaugeIds);
  }, []);
  // const [checkedState, setCheckedState] = useState(
  //   new Array(allGitaLanguages.length).fill(false)
  // );

  // allGitaLanguages.map(({ id, language }, index) => {
  //   if (initialSelectedLangaugeIds.includes(id?.toString()??"")) {

  //   }
  // }
  //   const [testsv, setTestsv] = useState(0);
  // const { replace } = useRouter();

  // function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   console.log(e.target);
  //   // replace("/testclientpage");
  //   replace("/verse/1");
  // }
  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    // setTestsv(testsv + 1);
  };

  //   const handleOnChange = (
  //     e: React.ChangeEvent<HTMLInputElement>,
  //     index: number
  //   ) => {};
  return (
    <div className="px-4 pb-4">
      <p className="text-lg">Settings - Client component</p>
      {/* <p>{`Testsv value: ${testsv}`}</p> */}
      <form className="my-4" action={createLanguageIdsCookie}>
        {/* <form className="my-4" onSubmit={handleSubmit}> */}
        <ul>
          {allGitaLanguages.map(({ id, language }, index) => {
            return (
              <li key={index}>
                <div className="left-section">
                  {/* <label
                    htmlFor={`custom-input-${index}`}
                  >{`languageId:`}</label> */}
                  <input
                    type="checkbox"
                    id={`custom-input-${index}`}
                    name={`custom-input-${index}`}
                    value={id?.toString()}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                    // onChange={(e) => handleOnChange(e, index)}
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
          //   value="Set & Go to Test Client Page"
          value="Set & Go to 1:1"
          className="px-1 ml-1 leading-normal border-black border  text-black  bg-white rounded-md cursor-pointer hover:text-black hover:bg-violet-400 active:scale-90 "
        />
      </form>
    </div>
  );
}
export default Page;
