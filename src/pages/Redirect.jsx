import { useEffect, useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StackTemplate from "../components/templates/StackTemplate";
import Link from "../components/atoms/Link";
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
    window.location.href = shortcut.url;
    return null;
  }

  if (error) {
    return (
      <div className="h-full bg-white dark:bg-gray-600 flex items-center justify-center px-4 py-12">
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
