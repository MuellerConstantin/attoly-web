import { useEffect, useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StackTemplate from "../components/templates/StackTemplate";
import Link from "../components/atoms/Link";
import ExternalLink from "../components/atoms/ExternalLink";
import { fetchShortcut } from "../api/shortcuts";

import ErrorImage from "../assets/images/error.svg";

function RedirectConfirmation() {
  const { tag } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [shortcut, setShortcut] = useState(null);

  const onLoad = useCallback(
    async (_tag) => {
      setShortcut(null);
      setError(null);

      try {
        const res = await fetchShortcut(_tag);

        setShortcut(res.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          navigate("/not-found");
        } else {
          setError("An unexpected error occurred, please retry!");
        }

        throw err;
      }
    },
    [navigate]
  );

  useEffect(() => {
    onLoad(tag);
  }, [tag, onLoad]);

  if (shortcut) {
    return (
      <div className="h-full flex flex-col">
        <div className="bg-sky-500 text-white dark:text-gray-800">
          <div className="mx-auto max-w-[100rem] py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Getting redirected...
              </h2>
              <p className="lg:w-1/2">
                Please note that we cannot accept any liability for the content
                of third parties. Links can always lead you to potentially
                unwanted content. We try to remove such links as best we can. In
                the end, however, the creator of the link you follow is liable
                and not our platform.
              </p>
            </div>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow w-full lg:w-fit">
                <ExternalLink
                  href={shortcut.url}
                  rel="noreferrer"
                  type="button"
                  className="w-full px-8 py-3 md:py-4 md:px-10 md:text-lg !bg-orange-500 !focus:outline-orange-500"
                >
                  Redirect me
                </ExternalLink>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full p-4 md:p-6 lg:p-8 xl:p-12">
          <div className="h-full">
            <div className="h-full rounded-lg border-4 border-dashed border-gray-200 dark:border-gray-800 flex justify-center items-center">
              <h2 className="text-gray-200 dark:text-gray-800 font-bold text-2xl text-center">
                Here could be your advertising
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center px-4 py-12">
        <div className="w-full md:max-w-2xl lg:max-w-4xl 2xl:max-w-6xl 2xl:max-w-[100rem]">
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0 justify-center items-center text-gray-800 dark:text-white">
            <div className="w-1/2 sm:w-1/3 md:w-2/3 xl:w-1/2">
              <img className="w-full h-full" src={ErrorImage} alt="Error" />
            </div>
            <div className="flex flex-col text-center md:text-left">
              <div className="text-xl sm:text-2xl lg:text-4xl">
                Oops! Something get wrong
              </div>
              <div>
                {error}&nbsp;To try again click&nbsp;
                <Link to="/verify-user">here</Link>.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center p-2 pt-6">
      <div className="w-10 h-10 border-b-2 border-sky-500 rounded-full animate-spin" />
    </div>
  );
}

export default function Redirect() {
  useEffect(() => {
    document.title = "Attoly | Verify User";
  }, []);

  return (
    <StackTemplate>
      <div className="h-full bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-white">
        <RedirectConfirmation />
      </div>
    </StackTemplate>
  );
}
