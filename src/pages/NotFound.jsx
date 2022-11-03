import { useEffect } from "react";
import { Link } from "react-router-dom";
import StackTemplate from "../components/templates/StackTemplate";

import NotFoundImage from "../assets/images/not-found.svg";

export default function NotFound() {
  useEffect(() => {
    document.title = "Attoly | 404";
  }, []);

  return (
    <StackTemplate>
      <div className="h-full bg-white dark:bg-gray-600 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0 justify-center items-center text-gray-800 dark:text-white">
            <div className="w-1/2 sm:w-1/3 md:w-2/3">
              <img
                className="w-full h-full"
                src={NotFoundImage}
                alt="Not Found"
              />
            </div>
            <div className="flex flex-col text-center md:text-left">
              <div className="text-4xl">Oops! Page not found.</div>
              <div>
                The page you are looking for was not found. You may return
                to&nbsp;
                <Link
                  className="text-sky-500 font-semibold hover:brightness-110 hover:underline"
                  to="/"
                >
                  home page
                </Link>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    </StackTemplate>
  );
}
