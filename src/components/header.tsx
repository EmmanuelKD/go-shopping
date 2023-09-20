"use client";
import { routes } from "@/config";
import { AuthContext } from "@/context/auth";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useContext, useEffect, useState } from "react";
import Logo from "./logo";
import { useDrawer } from "@/hook/use-drawer";
import Cart from "./cart";
import UpperHeader from "./upper-head";
import { currencies, navigation } from "@/data";
import FilterSection from "./filter-section";

export default function Header() {
  const { isAuthorized } = useContext(AuthContext);

  const [isShowing, setIsShowing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartDrawer = useDrawer();
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="fixed w-full z-50 top-0">
      <header>
        <nav className="lg:bg-primary">
          <UpperHeader />
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 bg-primary">
            <div className="relative flex  flex-row flex-nowrap h-16 items-center justify-between">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0 ">
                  <Link href={routes.home.index}>
                    <Logo variant="white" />
                  </Link>
                </div>
              </div>

              <div className="flex flex-1 items-center gap-2 md:gap-5 justify-center px-2 lg:ml-6 lg:justify-end flex-row flex-nowrap">
                {/* open search */}
                <div className="w-full max-w-lg  ">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>

                <div className="lg:flex items-center hidden z-10 ">
                  <div className="relative ml-4 flex-shrink-0">
                    {isAuthorized ? (
                      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Link
                          href={routes.auth.login}
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Log in <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </div>
                    ) : (
                      <Popover className="relative">
                        {({ open }: { open: boolean }) => (
                          <>
                            <Popover.Button>
                              <div className="w-full h-full">
                                <span className="absolute -inset-1.5"></span>
                                <span className="sr-only">Open user menu</span>
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  alt=""
                                />
                              </div>
                            </Popover.Button>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel className="">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                  <div
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                    tabIndex={-1}
                                  >
                                    <Link
                                      role="menuitem"
                                      tabIndex={-1}
                                      id="user-menu-item-0"
                                      href={routes.home.profile}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-light hover:text-white"
                                    >
                                      Your Profile
                                    </Link>

                                    <a
                                      href="#"
                                      className="block px-4 py-2 text-sm text-gray-700"
                                      role="menuitem"
                                      tabIndex={-1}
                                      id="user-menu-item-1"
                                    >
                                      Settings
                                    </a>
                                    <a
                                      href="#"
                                      className="block px-4 py-2 text-sm text-gray-700"
                                      role="menuitem"
                                      tabIndex={-1}
                                      id="user-menu-item-2"
                                    >
                                      Sign out
                                    </a>
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    cartDrawer.handleOpen();
                  }}
                  className="border-transparent cursor-pointer text-white   group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>

                  <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-green ring-1 ring-inset ring-gray-400/20">
                    20
                  </span>
                </button>

                <div className="flex lg:hidden">
                  <button
                    type="button"
                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                    onClick={() => {
                      setIsShowing(!isShowing);
                    }}
                  >
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Open main menu</span>

                    <svg
                      className="block h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>

                    <svg
                      className="hidden h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Transition
            show={isShowing}
            enter="transition-transform duration-300 ease-in-out"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform duration-300 ease-in-out"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="lg:hidden bg-primary h-screen" id="mobile-menu">
              <div className="space-y-1 px-2 pb-3 pt-2">
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Team
                </a>
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Projects
                </a>
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Calendar
                </a>
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      Tom Cook
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      tom@example.com
                    </div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">View notifications</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Link
                    href={
                      isAuthorized ? routes.home.profile : routes.auth.login
                    }
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400  w-full hover:text-white hover:bg-primary-light"
                  >
                    Your Profile
                  </Link>
                  <a
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </Transition>
        </nav>
        <Cart open={cartDrawer.open} setOpen={cartDrawer.handleClose} />
      </header>
      {/* filter - section */}
      <FilterSection />
    </div>
  );
}
