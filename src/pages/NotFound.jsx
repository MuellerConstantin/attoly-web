import { useEffect } from "react";
import StackTemplate from "../components/templates/StackTemplate";
import Link from "../components/atoms/Link";

import NotFoundImage from "../assets/images/not-found.svg";

export default function NotFound() {
  useEffect(() => {
    document.title = "Attoly | 404";
  }, []);

  return (
    <StackTemplate>
      <div className="h-full bg-gray-50 dark:bg-gray-600 flex items-center justify-center px-4 py-12">
        <div className="w-full md:max-w-2xl lg:max-w-4xl 2xl:max-w-6xl 2xl:max-w-[100rem]">
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0 justify-center items-center text-gray-800 dark:text-white">
            <div className="w-1/2 sm:w-1/3 md:w-2/3 xl:w-1/2">
              <img
                className="w-full h-full"
                src={NotFoundImage}
                alt="Not Found"
              />
            </div>
            <div className="flex flex-col text-center md:text-left">
              <div className="text-xl sm:text-2xl lg:text-4xl">
                Oops! Page not found.
              </div>
              <div>
                The page you are looking for was not found. You may return
                to&nbsp;
                <Link to="/">home page</Link>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </StackTemplate>
  );
}
