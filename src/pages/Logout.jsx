import { useEffect } from "react";
import { useDispatch } from "react-redux";
import StackTemplate from "../components/templates/StackTemplate";
import Link from "../components/atoms/Link";
import authSlice from "../store/slices/auth";

import LogoutImage from "../assets/images/logout.svg";

export default function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "TaskCare | Logout";
  }, []);

  useEffect(() => {
    dispatch(authSlice.actions.clearAuthentication());
  }, [dispatch]);

  return (
    <StackTemplate>
      <div className="h-full bg-white dark:bg-gray-600 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0 justify-center items-center text-gray-800 dark:text-white">
            <div className="w-1/2 sm:w-1/3 md:w-2/3">
              <img className="w-full h-full" src={LogoutImage} alt="Logout" />
            </div>
            <div className="flex flex-col text-center md:text-left">
              <div className="text-4xl">Hope to see you soon</div>
              <div>
                You have been logged out. To log in again click&nbsp;
                <Link to="/login">here</Link>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </StackTemplate>
  );
}
