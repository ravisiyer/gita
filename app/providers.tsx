"use client";
import { createContext, useState } from "react";
import { ReactNode } from "react";

export interface AppSettingsType {
  languageId: number;
}
export const AppSettingsContext = createContext<AppSettingsType>({
  languageId: 1,
});

function Providers({ children }: { children: ReactNode }) {
  const [languageId, setLanguageId] = useState(1);
  let AppSettings: AppSettingsType = { languageId: languageId };
  return (
    <AppSettingsContext.Provider value={AppSettings}>
      {children}
    </AppSettingsContext.Provider>
  );
}

export default Providers;
