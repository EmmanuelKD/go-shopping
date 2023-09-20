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
  currentTabIndex=0
}: {
  pannels: Map<string, TapPannel>;
  currentTabIndex:number
}) {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  console.log(currentTabIndex)

  const keys = useMemo(() => Array.from(pannels.keys()), [pannels]);
  return (
    <div>

      <div className="">
        <Tab.Group
          as="div"
          tabIndex={2}
          // @ts-ignore
          className={
            "max-w-7xl w-full mx-auto w-7xl  lg:px-8  flex items-center justify-center flex-col flex-nowrap"
          }
        >
          <Tab.List className="flex w-full mx-5  sm:px-0  md:py-10   md:gap-10  py-5   gap-5  px-3 border-b border-gray-900/10">
            {keys.map((key) => (
              <Tab
                as="a"
                // @ts-ignore
                className={({ selected }: { selected: boolean }) => {
                  return classNames(
                    "border-transparent px-2 rounded-md cursor-pointer text-gray-500 group inline-flex items-center border-b-2 py-2  text-sm font-medium ",
                    selected
                      ? " bg-primary hover:bg-primary-dark text-white"
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
