"use client";
import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

export interface AppSettingsType {
  languageIds: number[];
}
export const AppSettingsContext = createContext<AppSettingsType>({
  languageIds: [1, 2, 3],
});

function Providers({ children }: { children: ReactNode }) {
  const [languageIds, setLanguageIds] = useState([1]);
  // const [languageIds, setLanguageIds] = useState([1, 2, 3]);
  // const [languageIds, setLanguageIds] = useState([]);
  // const [languageIds, setLanguageIds] = useState(undefined);
  let AppSettings: AppSettingsType = { languageIds: languageIds };
  return (
    <AppSettingsContext.Provider value={AppSettings}>
      {children}
    </AppSettingsContext.Provider>
  );
}

export function getAppSettings() {
  const AppSettings: AppSettingsType = useContext(AppSettingsContext);
  return AppSettings;
}

export default Providers;
