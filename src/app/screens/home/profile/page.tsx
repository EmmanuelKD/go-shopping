"use client";
import AccountLayout from "@/app/layouts/account-layout";
import AppLayout from "@/app/layouts/app-layout";
import Dropzone from "@/components/dropzone";
import { PagnationNav } from "@/components/pagnation";
import ProductListingCard from "@/components/product-listing-card";
import { routes } from "@/config";
import { AuthContext } from "@/context/auth/context";
import { NotificationContext } from "@/context/notification/context";
import { products } from "@/data";
import { AuthClass } from "@/firebase/auth";
import { UsersClass } from "@/firebase/collections/users";
import { FileStorage } from "@/firebase/storage";
import { useDialog } from "@/hook/use-dialog";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";

type productCattigory =
  | "Vehicles"
  | "Home and Garden"
  | "Electronics"
  | "Clothing and Accessories"
  | "Hobbies and Toys"
  | "Classifieds"
  | "Entertainment"
  | "Family"
  | "Free Stuff"
  | "Home Sales"
  | "Jewelry and Accessories"
  | "Pets"
  | "Sports and Outdoors"
  | "Tools"
  | "Art and Collectibles"
  | "Books"
  | "Crafts"
  | "Videogames"
  | "Business and Industrial"
  | "Health and Beauty"
  | "Tickets"
  | "Other";

function switchTabIndex(tab: string) {
  switch (tab) {
    case "profile":
      return 0;
    case "listing":
      return 1;
    case "setting":
      return 2;
  }
  return 0;
}
export default function Profile() {
  // const router = useRouter();
  const [fragment, setFragment] = useState("");

  useEffect(() => {
    // Get the fragment from window.location.hash
    let frag = window.location.hash.slice(1);
    console.log(frag);
    setFragment(frag);
  }, []);

  const pages = useMemo(() => {
    let pageMap = new Map();
    pageMap.set("Profile", {
      child: <ProfileView index="1" />,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="text-inherit -ml-0.5 mr-2 h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    });
    pageMap.set("Listings", {
      child: <ListingView index="2" />,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="text-inherit -ml-0.5 mr-2 h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
          />
        </svg>
      ),
    });
    pageMap.set("Settings", {
      child: <SettingView index="2" />,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="text-inherit -ml-0.5 mr-2 h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    });
    return pageMap;
  }, []);
  return (
    <AppLayout>
      <AccountLayout
        pannels={pages}
        currentTabIndex={switchTabIndex(fragment)}
      />
    </AppLayout>
  );
}

const validationSchema = Yup.object({
  fname: Yup.string().required("First name is required"),
  lname: Yup.string().required("First name is required"),
  email: Yup.string().email().required("Your email  is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

function imgSkeliton() {
  //   <div
  //   role="status"
  //   className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
  // >
  //   <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
  //     <svg
  //       className="w-10 h-10 text-gray-200 dark:text-gray-600"
  //       aria-hidden="true"
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="currentColor"
  //       viewBox="0 0 20 18"
  //     >
  //       <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
  //     </svg>
  //   </div>
  //   <div className="w-full">
  //     <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
  //     <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
  //     <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
  //     <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
  //     <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
  //     <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
  //   </div>
  //   <span className="sr-only">Loading...</span>
  // </div>
}

function ProfileView({ index }: { index: string }) {
  const { user } = useContext(AuthContext);
  const { addNotification } = useContext(NotificationContext);

  const [initialValues, setInitialValues] = useState<{
    fname: string;
    lname: string;
    email: string;
    imageUrl: string;
  }>({
    fname: "",
    lname: "",
    email: "",
    imageUrl: "",
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async ({ email, lname, fname, imageUrl }) => {
      // Handle form submission here
      // let auth = new AuthClass();
      // let user = new User();
      // await auth.createUserWithEmailAndPassword({
      //   email,
      //   password,
      //   authContext,
      //   navigate: router,
      //   notificationContext,
      //   lname,
      //   fname,
      // });
    },
  });

  useEffect(() => {
    if (initialValues.fname == "" || (initialValues.lname == "" && user)) {
      // console.log(user)
      let vlaues = {
        fname: user?.fname ?? "",
        lname: user?.lname ?? "",
        email: user?.email ?? "",
        imageUrl: user?.photoRef ?? "",
      };
      setInitialValues(vlaues);
      formik.setValues(vlaues);
    }
  }, [user, initialValues]);

  const [isImgUploading, setImageUploading] = useState<boolean>(false); // Use an empty state value

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    multiple: false,
    accept: {
      "image/*": [],
    },
    onDrop: async (acceptedFiles) => {
      let usersClass = new UsersClass();
      let storage = new FileStorage();

      const file = acceptedFiles[0];

      if (file) {
        setImageUploading(true);
        if (user?.objectId) {
          let imageRef = await storage.addUsersProfileToStorage(
            file,
            user.objectId
          );
          user.photoRef = imageRef;
          formik.setFieldValue("imageUrl", imageRef);
          await usersClass.updateUsersData(user).then((added) => {
            if (added) {
              addNotification({
                message: "Payment Image added successfully",
                variant: "success",
              });
            } else {
              addNotification({
                message: "Error: unable to save image",
                variant: "error",
              });
            }
            setImageUploading(false);
          });
        }
      }
    },
  });

  return (
    <div className="divide-y divide-black/5">
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-4 md:py-8 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 text-black">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            Use a permanent address where you can receive mail.
          </p>
        </div>
        {/* {JSON.stringify(user)} */}

        <form onSubmit={formik.handleSubmit} className="md:col-span-2">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div className="col-span-full flex items-center gap-x-8">
              {isImgUploading ? (
                <div role="status" className="h-24 w-24   animate-pulse  ">
                  <div className=" flex items-center justify-center flex-none h-24 w-24  rounded-lg bg-gray-800 object-cover">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>

                  <span className="sr-only">Loading...</span>
                </div>
              ) : formik.values.imageUrl ? (
                <img
                  src={formik.values.imageUrl}
                  alt=""
                  className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                />
              ) : (
                <div className=" flex items-center justify-center flex-none h-24 w-24  rounded-lg bg-gray-800 object-cover">
                  <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
              )}

              <div>
                <button
                  type="button"
                  onClick={open}
                  className="rounded-md bg-black/10 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-black/20"
                >
                  Change avatar
                </button>

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  JPG, GIF or PNG. 1MB max.
                </p>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="fname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="fname"
                  type="text"
                  autoCapitalize="given-name"
                  {...formik.getFieldProps("fname")}
                  className={
                    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset   ring-1ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  focus:text-secondary-dark sm:text-sm sm:leading-6" +
                    "focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " +
                    (formik.errors["fname"] && formik.touched["fname"]
                      ? "border-red-500" // You can add a specific className for error state
                      : "")
                  }
                />
                {formik.errors["fname"] && formik.touched["fname"] && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors["fname"]}
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="lname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lname"
                  {...formik.getFieldProps("lname")}
                  type="text"
                  autoComplete="family-name"
                  className={
                    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset   ring-1ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  focus:text-secondary-dark sm:text-sm sm:leading-6" +
                    "focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " +
                    (formik.errors["lname"] && formik.touched["lname"]
                      ? "border-red-500" // You can add a specific className for error state
                      : "")
                  }
                />
                {formik.errors["lname"] && formik.touched["lname"] && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors["lname"]}
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...formik.getFieldProps("email")}
                  className={
                    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset   ring-1ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  focus:text-secondary-dark sm:text-sm sm:leading-6" +
                    "focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " +
                    (formik.errors["email"] && formik.touched["email"]
                      ? "border-red-500" // You can add a specific className for error state
                      : "")
                  }
                />
                {formik.errors["email"] && formik.touched["email"] && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors["email"]}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex">
              <button
                type="submit"
                className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function ListingView({ index }: { index: string }) {
  useEffect(() => {}, []);
  return (
    <div className="bg-white">
      <main className="pb-24">
        {/* Filters */}
        <Disclosure
          as="section"
          aria-labelledby="filter-heading"
          className="grid items-center border-b border-t border-gray-200"
        >
          <h2 id="filter-heading" className="sr-only">
            My Products
          </h2>

          <Disclosure.Panel className="border-t border-gray-200 py-10">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8"></div>
          </Disclosure.Panel>
          <div className="col-start-1 row-start-1 py-4">
            <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
              <Menu as="div" className="relative inline-block">
                <div className="flex">
                  <AddItemAction />
                </div>
              </Menu>
            </div>
          </div>
        </Disclosure>

        {/* Product grid */}
        <section
          aria-labelledby="products-heading"
          className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8"
        >
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductListingCard product={product} />
            ))}
          </div>
        </section>

        {/* Pagination */}
        <PagnationNav dataLength={0} />
      </main>
    </div>
  );
}

function SettingView({ index }: { index: string }) {
  return (
    <div>
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 text-black">
            Change password
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            Update your password associated with your account.
          </p>
        </div>

        <form className="md:col-span-2">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="current-password"
                className="block text-sm font-medium leading-6 text-black"
              >
                Current password
              </label>
              <div className="mt-2">
                <input
                  id="current-password"
                  name="current_password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="new-password"
                className="block text-sm font-medium leading-6 text-black"
              >
                New password
              </label>
              <div className="mt-2">
                <input
                  id="new-password"
                  name="new_password"
                  type="password"
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium leading-6 text-black"
              >
                Confirm password
              </label>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  name="confirm_password"
                  type="password"
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex">
            <button
              type="submit"
              className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 text-black">
            Log out other sessions
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            Please enter your password to confirm you would like to log out of
            your other sessions across all of your devices.
          </p>
        </div>

        <form className="md:col-span-2">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="logout-password"
                className="block text-sm font-medium leading-6 text-black"
              >
                Your password
              </label>
              <div className="mt-2">
                <input
                  id="logout-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex">
            <button
              type="submit"
              className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Log out other sessions
            </button>
          </div>
        </form>
      </div>

      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 text-black">
            Delete account
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            No longer want to use our service? You can delete your account here.
            This action is not reversible. All information related to this
            account will be deleted permanently.
          </p>
        </div>

        <form className="flex items-start md:col-span-2">
          <button
            type="submit"
            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
          >
            Yes, delete my account
          </button>
        </form>
      </div>
    </div>
  );
}

function AddItemAction() {
  // let dialog = useDialog();

  return (
    <Menu.Button
      as={Link}
      href={routes.home.addProductListing}
      className="p-3 group inline-flex justify-center text-sm font-medium text-primary hover:text-primary-dark py-3 px-2"
    >
      <b>Add</b>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 "
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
          clip-rule="evenodd"
        />
      </svg>
    </Menu.Button>
  );
}

function AddProductDialog({
  handleClose,
  open,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const FORM_KEY = "product_form";
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* max-w-md  */}
              <Dialog.Panel className="mx-auto grid transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 py-2"
                >
                  Add Product
                </Dialog.Title>
                <form
                  key={FORM_KEY}
                  className="space-y-12  max-h-96  max-w-7xl overflow-y-scroll "
                >
                  <div className="border-b border-gray-900/10 pb-12 ">
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      This information will be displayed publicly so be careful
                      what you share.
                    </p>

                    <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Product Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Product Price
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="carigories"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Carigories
                        </label>
                        <div className="mt-2">
                          <select
                            id="carigories"
                            name="carigories"
                            autoComplete="carigories"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option value={"Vehicles"}>Vehicles</option>

                            {/* <option value={"Home and Garden"}>
                              Home and Garden
                            </option> */}
                            <option value={"Electronics"}>Electronics</option>
                            <option value={"Clothing and Accessories"}>
                              Clothing and Accessories
                            </option>
                            {/* <option value={"Hobbies and Toys"}>
                              Hobbies and Toys
                            </option> */}
                            {/* <option value={"Classifieds"}>Classifieds</option> */}
                            <option value={"Entertainment"}>
                              Entertainment
                            </option>
                            {/* <option value={"Family"}>Family</option> */}
                            {/* <option value={"Free Stuff"}>Free Stuff</option> */}
                            {/* <option value={"Home Sales"}>Home Sales</option> */}
                            <option value={"Jewelry and Accessories"}>
                              Jewelry and Accessories
                            </option>
                            <option value={"Pets"}>Pets</option>
                            <option value={"Sports and Outdoors"}>
                              Sports and Outdoors
                            </option>
                            <option value={"Tools"}>Tools</option>
                            <option value={"Art and Collectibles"}>
                              Art and Collectibles
                            </option>
                            <option value={"Books"}>Books</option>
                            <option value={"Crafts"}>Crafts</option>
                            <option value={"Videogames"}>Videogames</option>
                            <option value={"Business and Industrial"}>
                              Business and Industrial
                            </option>
                            <option value={"Health and Beauty"}>
                              Health and Beauty
                            </option>
                            <option value={"Tickets"}>Tickets</option>
                            <option value={"Other"}>Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Description
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className={
                              "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm " +
                              "ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 " +
                              "focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            }
                          />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">
                          Write a few sentences about your product.
                        </p>
                      </div>

                      {/* dropzone */}
                      <Dropzone />
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <ProductListingCard
                          product={products[0]}
                          isSingle={true}
                        />
                      </div>
                    </div>
                  </div>
                </form>
                <Dialog.Panel>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      onClick={handleClose}
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      form={FORM_KEY}
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
