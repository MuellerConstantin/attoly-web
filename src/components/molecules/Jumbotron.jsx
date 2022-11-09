import Link from "../atoms/Link";

import JumbotronImage from "../../assets/images/jumbotron.svg";

export default function Jumbotron() {
  return (
    <div className="relative bg-white dark:bg-gray-800">
      <div className="max-w-[100rem] z-10 mx-auto relative overflow-hidden flex flex-col">
        <div className="w-full lg:w-1/2 order-2">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 w-full lg:pb-28 xl:pb-32">
            <svg
              className="absolute hidden lg:block inset-y-0 right-0 h-full w-48 translate-x-1/2 transform text-white"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon
                points="50,0 100,0 50,100 0,100"
                className="fill-white dark:fill-gray-800"
              />
            </svg>

            <div className="mx-auto p-4 sm:p-6">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Possibility to simplify your&nbsp;
                  <span className="text-sky-500">URL sharing</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                  Attoly allows creating short links as aliases for long URLs,
                  which are easier to embed in websites, chats and documents.
                  Stop using URLs that are far too long and prone to errors and
                  get your personal Attoly Shortcut now.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/get-started"
                      type="button"
                      className="w-full px-8 py-3 md:py-4 md:px-10 md:text-lg"
                    >
                      Get started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/register"
                      type="button"
                      className="w-full px-8 py-3 md:py-4 md:px-10 md:text-lg !bg-orange-500 !focus:outline-orange-500"
                    >
                      Register now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full object-scale-down p-6 lg:p-12"
            src={JumbotronImage}
            alt="Jumbotron"
          />
        </div>
      </div>
      <div className="order-1 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-100 dark:bg-gray-700" />
    </div>
  );
}
