"use client";
import Header from "@/components/header";
import { ReactNode } from "react";
import { Tab } from "@headlessui/react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <Header />
      {children}
    </div>
  );
}
