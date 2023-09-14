'use client'
import { ReactNode, createContext, useMemo } from "react";

type AppContextType = {};
export const AppContext = createContext<AppContextType>({});

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AppContext.Provider value={useMemo(() => ({
        
    }), [])}>
      {children}
    </AppContext.Provider>
  );
}
export const AppConsumer=AppContext.Consumer;