"use client";
import Header from "@/components/header";
import HomeFooter from "@/components/home-footer";
import SiteMap from "@/components/site-map";
import { ReactNode } from "react";

export default function AppLayout({
  children,
  isLanding = false,
}: {
  children: ReactNode;
  isLanding?: boolean;
}) {
  return (
    <div className=" relative">
      <Header />
      <main className={"mt-44"}>{children}</main>
      {isLanding && <SiteMap />}
      <HomeFooter isLanding={isLanding} />
    </div>
  );
}
