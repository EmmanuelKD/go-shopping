"use client";
import Header from "@/components/header";
import { Fragment, ReactNode, useEffect, useMemo, useState } from "react";
import { Tab } from "@headlessui/react";

export type TapOptions = "Profile" | "Listing" | "Sales";
export type TapPannel = {
  child: ReactNode;
  icon: ReactNode;
};

export default function AccountLayout({
  pannels,
}: {
  pannels: Map<string, TapPannel>;
}) {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const keys = useMemo(() => Array.from(pannels.keys()), [pannels]);
  return (
    <div>
      <Header />

      <div className="">
        <Tab.Group
          as="div"
          // @ts-ignore
          className={
            "max-w-7xl w-full mx-auto w-7xl  lg:px-8  flex items-start justify-start flex-col flex-nowrap"
          }
        >
          <Tab.List className="flex w-full mx-5  sm:px-0  md:py-10   md:gap-10  py-5   gap-5">
            {keys.map((key) => (
              <Tab
                as="a"
                // @ts-ignore
                className={({ selected }: { selected: boolean }) => {
                  return classNames(
                    "border-transparent cursor-pointer text-gray-500  hover:text-gray-700 group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium ",
                    selected
                      ? " border-indigo-500 text-indigo-600 group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium] "
                      : "text-primary  hover:text-primary-dark hover:border-gray-300"
                  );
                }}
                key={key}
              >
                {pannels.get(key)?.icon}
                <span>{key}</span>
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {keys.map((key) => (
              <Tab.Panel key={key}>{pannels.get(key)?.child}</Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
