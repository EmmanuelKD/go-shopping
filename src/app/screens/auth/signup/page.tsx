"use client";
import AuthLayout from "@/app/layouts/auth-layout";
import Logo from "@/components/logo";
import { routes } from "@/config";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { AuthClass } from "@/firebase/auth";
import { useContext } from "react";
import { AuthContext } from "@/context/auth/context";
import { NotificationContext } from "@/context/notification/context";

const initialValues = {
  fname: "",
  lname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

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

export default function Login() {
  let router = useRouter();
  let authContext = useContext(AuthContext);
  let notificationContext = useContext(NotificationContext);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async ({ email, password, lname, fname }) => {
      // Handle form submission here
      let auth = new AuthClass();
      await auth.createUserWithEmailAndPassword({
        email,
        password,
        authContext,
        navigate: router,
        notificationContext,
        lname,
        fname,
      });
    },
  });

  return (
    <AuthLayout>
      <div className="w-full max-w-sm space-y-10">
        <div>
          <Logo />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up for an account
          </h2>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
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
                    ? "border-red-500" // You can add a specific class for error state
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
          <div>
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
                    ? "border-red-500" // You can add a specific class for error state
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
          <div>
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
                    ? "border-red-500" // You can add a specific class for error state
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
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                autoComplete="password"
                {...formik.getFieldProps("password")}
                className={
                  "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset   ring-1ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  focus:text-secondary-dark sm:text-sm sm:leading-6" +
                  "focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " +
                  (formik.errors["password"] && formik.touched["password"]
                    ? "border-red-500" // You can add a specific class for error state
                    : "")
                }
              />
              {formik.errors["password"] && formik.touched["password"] && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors["password"]}
                </div>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                type="password"
                {...formik.getFieldProps("confirmPassword")}
                className={
                  "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset   ring-1ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  focus:text-secondary-dark sm:text-sm sm:leading-6" +
                  "focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " +
                  (formik.errors["confirmPassword"] &&
                  formik.touched["confirmPassword"]
                    ? "border-red-500" // You can add a specific class for error state
                    : "")
                }
              />
              {formik.errors["confirmPassword"] &&
                formik.touched["confirmPassword"] && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors["confirmPassword"]}
                  </div>
                )}
            </div>
          </div>
          {/* <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:text-secondary-dark sm:text-sm sm:leading-6"
              placeholder="Email address"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:text-secondary-dark sm:text-sm sm:leading-6"
              placeholder="Password"
            />
          </div> */}

          <div>
            {/* <Link href={routes.home.index}> */}
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white hover::bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
            {/* </Link> */}
          </div>
        </form>

        <p className="text-center text-sm leading-6 text-gray-500">
          Already have an account ?{" "}
          <Link
            href={routes.auth.login}
            className="font-semibold text-secondary hover:text-secondary-dark"
          >
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
