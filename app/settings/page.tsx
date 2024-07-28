"use client";
import { AppSettingsType, AppSettingsContext } from "../providers";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";

const NUMBER_LANGUAGES = 3;

function Page() {
  const AppSettings: AppSettingsType = useContext(AppSettingsContext);
  let languageIds = new Array(NUMBER_LANGUAGES);
  for (let i = 0; i < NUMBER_LANGUAGES; i++) {
    if (i < AppSettings.languageIds.length) {
      languageIds[i] = AppSettings.languageIds[i].toString();
    } else {
      languageIds[i] = "0";
    }
  }
  const [formLanguageIds, setFormLanguageIds] = useState(languageIds);

  const { replace } = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log(formLanguageIds);
    let languageIds = Array(0);
    let j = 0;
    for (let i = 0; i < NUMBER_LANGUAGES; i++) {
      const numericLanguageId = Number(formLanguageIds[i]);
      if (numericLanguageId > 0) {
        languageIds[j] = Math.floor(numericLanguageId);
        j++;
      }
    }
    AppSettings.setLanguageIds(languageIds);
    replace("/verse/1");
  }

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let tempLanguageIds = [...formLanguageIds];
    tempLanguageIds[index] = e.target.value;
    setFormLanguageIds(tempLanguageIds);
  };
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
