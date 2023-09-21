"use client"
import { User } from "firebase/auth";
import { ReactNode } from "react";

type AuthContextProp = {
  children: ReactNode;
};

type AuthContextState = {
  user?:  AppUser;
  userStorData?: InstitutionUsersType;
  authError?: string;
};

type AuthContextType = {
  loadUserToState: (user?: AppUser) => void;
  user?:  AppUser;
  isUserLoggedIn: () => boolean;
};
