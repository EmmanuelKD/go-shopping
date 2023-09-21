"use client";
import { routes } from "@/config";
import { AuthContext } from "@/context/auth/context";
import { useDrawer } from "@/hook/use-drawer";
import Link from "next/link";
import { useContext, useState } from "react";

const currencies = ["IPAM", "FBC", "LIMKOKWING", "UNIMTEC", "BLUE CREST"];

export default function UpperHeader() {
  const { isUserLoggedIn } = useContext(AuthContext);

  const [isShowing, setIsShowing] = useState(false);

  const cartDrawer = useDrawer();

  return (
    <div className="bg-gray-900">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Currency selector */}
        <form className="hidden lg:block lg:flex-1">
          <div className="flex">
            <label htmlFor="desktop-currency" className="sr-only">
              Currency
            </label>
            <div className="group relative -ml-2 rounded-md border-transparent bg-gray-900 focus-within:ring-2 focus-within:ring-white">
              <select
                id="desktop-currency"
                name="currency"
                className="flex items-center rounded-md border-transparent bg-gray-900 bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-white focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-100"
              >
                {currencies.map((currency) => (
                  <option key={currency}>{currency}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                <svg
                  width={24}
                  height={18}
                  viewBox="0 0 24 18"
                  aria-hidden="true"
                  className="flex-shrink-0 text-gray-300"
                >
                  <path
                    d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        </form>

        <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">
          Get free delivery on orders over $100
        </p>

        {!isUserLoggedIn() && (
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
            <Link
              href={routes.auth.signup}
              className="text-sm font-medium text-white hover:text-gray-100"
            >
              Create an account
            </Link>
            {/* <span className="h-6 w-px bg-gray-600" aria-hidden="true" /> */}
            {/* <a
            href="#"
            className="text-sm font-medium text-white hover:text-gray-100"
          >
            Sign in
          </a> */}
          </div>
        )}
      </div>
    </div>
  );
}
