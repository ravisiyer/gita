"use client";
import { getAppSettings } from "../providers";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { link } from "fs";

const NUMBER_LANGUAGES = 3;

function Page() {
  const AppSettings = getAppSettings();
  let languageIds = new Array(NUMBER_LANGUAGES);
  for (let i = 0; i < NUMBER_LANGUAGES; i++) {
    if (i < AppSettings.languageIds.length) {
      languageIds[i] = AppSettings.languageIds[i].toString();
    } else {
      languageIds[i] = "0";
    }
  }
  const [formLanguageIds, setFormLanguageIds] = useState(languageIds);
  // const [formLanguageIds, setFormLanguageIds] = useState<number[]>(
  //   AppSettings.languageIds
  // );

  const { replace } = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formLanguageIds);
    let languageIds = Array(0);
    let j = 0;
    for (let i = 0; i < NUMBER_LANGUAGES; i++) {
      const numericLanguageId = Number(formLanguageIds[i]);
      if (numericLanguageId > 0) {
        languageIds[j] = Math.floor(numericLanguageId);
        j++;
      }
    }
    // if (j < AppSettings.languageIds.length) {
    //   AppSettings.languageIds.splice(j);
    // }

    AppSettings.setLanguageIds(languageIds);
    replace("/verse/1");
  }

  const handleOnChange = (e, index) => {
    let tempLanguageIds = [...formLanguageIds];
    tempLanguageIds[index] = e.target.value;
    setFormLanguageIds(tempLanguageIds);
  };
  // const [test, setTest] = useState("0");
  // const [test, setTest] = useState(0);
  return (
    <div className="px-4 pb-4">
      <p className="text-lg">Settings - Client component</p>

      <form className="my-4" onSubmit={handleSubmit}>
        <ul>
          {formLanguageIds.map((languageId, index) => {
            return (
              <li key={index}>
                <div className="left-section">
                  <label
                    htmlFor={`custom-input-${index}`}
                  >{`languageId:`}</label>
                  {/* <label htmlFor={`custom-input-${index}`}>{`languageId${
                    index + 1
                  }:`}</label> */}
                  <input
                    type="number"
                    id={`custom-input-${index}`}
                    name={languageId.toString()}
                    value={languageId}
                    onChange={(e) => handleOnChange(e, index)}
                    className="ml-4 w-8"
                  />
                </div>
              </li>
            );
          })}
          {/* <li>
            <div className="left-section">
              <label htmlFor="test">test</label>
              <input
                type="number"
                // type="checkbox"
                id="test"
                // name={languageId.toString()}
                value={test}
                // checked={languageId > 0}
                onChange={(e) => setTest(Number(e.target.value))}
                // onChange={(e) => setTest(e.target.value)}
              />
            </div>
          </li> */}
        </ul>
        <input
          type="submit"
          value="Set & Go to 1:1"
          // value="Set & Go Home"
          className="px-1 ml-1 leading-normal border-black border  text-black  bg-white rounded-md cursor-pointer hover:text-black hover:bg-violet-400 active:scale-90 "
        />
      </form>
    </div>
  );
}
export default Page;
