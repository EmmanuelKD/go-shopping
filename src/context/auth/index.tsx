'use client'
import { ReactNode, createContext, useMemo } from "react";

type AuthContextType = {
  isAuthorized:boolean
};
export const AuthContext = createContext<AuthContextType>({
  isAuthorized:false
});

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={useMemo(() => ({
        

isAuthorized:false
    }), [])}>
      {children}
    </AuthContext.Provider>
  );
}

export const AuthConsumer=AuthContext.Consumer;