"use client";
import AuthLayout from "@/app/layouts/auth-layout";
import Logo from "@/components/logo";
import { routes } from "@/config";
import { AuthContext } from "@/context/auth/context";
import { NotificationContext } from "@/context/notification/context";
import { AuthClass } from "@/firebase/auth";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import * as Yup from "yup";
const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email().required("Your email  is required"),
  password: Yup.string()
    // .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
export default function Login() {
  let router = useRouter();
  let authContext = useContext(AuthContext);
  let notificationContext = useContext(NotificationContext);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async ({ email, password }) => {
      // Handle form submission here
 
      let auth = new AuthClass();
      await auth.loginWithEmailAndPassword({
        email,
        password,
        navigate:router,
        authContext,
        notificationContext,

      });
    },
  });
  return (
    <AuthLayout>
      <div className="w-full max-w-sm space-y-10">
        <div>
          <Logo />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login in to your account
          </h2>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-6" action="#" method="POST">
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
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm leading-6">
                <a
                  href="#"
                  className="font-semibold text-secondary hover:text-secondary-dark"
                >
                  Forgot password?
                </a>
              </div>
            </div>

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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-secondary focus:text-secondary-dark"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm leading-6 text-gray-900"
              >
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md    bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="text-center text-sm leading-6 text-gray-500">
          dont have an account ?{" "}
          <Link
            href={routes.auth.signup}
            className="font-semibold text-secondary hover:text-secondary-dark"
          >
            sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
