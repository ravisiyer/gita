"use client";
import { createContext, useState } from "react";
import { ReactNode } from "react";

export interface AppSettingsType {
  languageIds: number[];
  setLanguageIds: any;
}
export const AppSettingsContext = createContext<AppSettingsType>({
  languageIds: [1, 2, 3],
  setLanguageIds: () => {},
});

function Providers({ children }: { children: ReactNode }) {
  const [languageIds, setLanguageIds] = useState([1]);
  // const [languageIds, setLanguageIds] = useState([1, 2, 3]);
  // const [languageIds, setLanguageIds] = useState([]);
  let AppSettings: AppSettingsType = {
    languageIds: languageIds,
    setLanguageIds: setLanguageIds,
  };
  return (
    <AppSettingsContext.Provider value={AppSettings}>
      {children}
    </AppSettingsContext.Provider>
  );
}

export default Providers;
