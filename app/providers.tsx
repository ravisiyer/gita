"use client";
import { createContext, useState } from "react";
import { ReactNode } from "react";

export interface AppSettingsType {
  languageId: number;
}
// type LanguageIdType = number;
export const AppSettingsContext = createContext<AppSettingsType>({
  languageId: 1,
});

function Providers({ children }: { children: ReactNode }) {
  // const [languageId, setLanguageId] = useState<LanguageIdType>(1);
  const [languageId, setLanguageId] = useState(1);
  let AppSettings: AppSettingsType = { languageId: languageId };
  // let  AppSettings:AppSettingsType = {languageId}
  return (
    <AppSettingsContext.Provider value={AppSettings}>
      {/* <AppSettingsContext.Provider value={{ languageId, setLanguageId }}> */}
      {children}
    </AppSettingsContext.Provider>
  );
}

export default Providers;
