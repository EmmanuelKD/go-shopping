import AuthLayout from "@/app/layouts/auth-layout";
import Logo from "@/components/logo";
import { routes } from "@/config";
import Link from "next/link";

export default function Login() {
  return (
    <AuthLayout>
      <div className="w-full max-w-sm space-y-10">
        <div>
          <Logo />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login in to your account
          </h2>
        </div>
        <form className="space-y-6" action="#" method="POST">
          <div className="relative -space-y-px rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300"></div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset  focus:text-secondary-dark  sm:text-sm sm:leading-6"
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
                className="relative block w-full
                 rounded-b-md border-0 py-1.5 text-gray-900 ring-1 
                 ring-inset ring-gray-100 placeholder:text-gray-400
              
                  focus:z-10 focus:ring-2 focus:ring-inset     focus:text-secondary-dark sm:text-sm sm:leading-6"
                placeholder="Password"
              />
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

            <div className="text-sm leading-6">
              <a
                href="#"
                className="font-semibold text-secondary hover:text-secondary-dark"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <Link href={routes.home.index}>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md    bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </Link>
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
