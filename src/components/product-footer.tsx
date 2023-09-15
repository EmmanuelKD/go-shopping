"use client";
import { routes } from "@/config";
import { AuthContext } from "@/context/auth";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useContext, useEffect, useState } from "react";
import Logo from "./logo";
import { useDrawer } from "@/hook/use-drawer";
import Cart from "./cart";

export default function Header() {
  const { isAuthorized } = useContext(AuthContext);

  const [isShowing, setIsShowing] = useState(false);

  const cartDrawer=useDrawer();

   return (
  <></>
  );
}
