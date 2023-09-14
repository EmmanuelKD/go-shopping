"use client"
import { ReactNode } from "react";

export default function AuthLayout({children}:{children:ReactNode}){

    return( 
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        {
            children
        }
      </div>      
    );
}