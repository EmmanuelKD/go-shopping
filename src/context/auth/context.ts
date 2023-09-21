"use client"
import { User } from 'firebase/auth';
import React from 'react';
 import { AuthContextType } from './types';
 
export const AuthContext = React.createContext<AuthContextType>({
    loadUserToState: (_?: AppUser) => {},
    user: undefined,
    isUserLoggedIn: () => false,
 });
