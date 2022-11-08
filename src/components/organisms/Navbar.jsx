import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Disclosure, Popover, Switch } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  EllipsisVerticalIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { usePopper } from "react-popper";
import Avatar from "../atoms/Avatar";
import Link from "../atoms/Link";
import themeSlice from "../../store/slices/theme";

import Logo from "../../assets/images/logo.svg";
import LogoTextLight from "../../assets/images/logo-text-light.svg";
import LogoTextDark from "../../assets/images/logo-text-dark.svg";

const navigation = [
  { name: "Home", path: "/home" },
  { name: "Get Started", path: "/get-started" },
  { name: "About", path: "/about" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();

  const principal = useSelector((state) => state.auth.principal);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const onThemeToggle = (value) => {
    dispatch(themeSlice.actions.setDarkMode(value));
  };

  const [popupButtonElement, setPopupButtonElement] = useState();
  const [popupDialogElement, setPopupDialogElement] = useState();
  const { styles, attributes } = usePopper(
    popupButtonElement,
    popupDialogElement,
    {
      placement: "bottom-end",
      modifiers: [
        {
          name: "flip",
          options: {
            fallbackPlacements: [
              "bottom-start",
              "top-end",
              "top-start",
              "left",
              "right",
            ],
          },
        },
      ],
    }
  );

  return (
    <Disclosure as="nav" className="bg-orange-500">
      {({ open }) => (
        <>
          <div className="px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-200 dark:text-gray-600 hover:text-white hover:dark:text-gray-800 focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/home">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src={Logo}
                      alt="Attoly Logo"
                    />
                    <img
                      className="hidden lg:block lg:dark:hidden h-8 w-auto"
                      src={LogoTextLight}
                      alt="Attoly Logo"
                    />
                    <img
                      className="hidden lg:dark:block h-8 w-auto"
                      src={LogoTextDark}
                      alt="Attoly Logo"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? "text-white dark:text-gray-800 bg-orange-600"
                              : "text-gray-200 dark:text-gray-600 hover:text-white dark:text-gray-800 hover:bg-orange-400",
                            "px-3 py-2 font-bold rounded-md"
                          )
                        }
                        aria-current={
                          location.pathname === item.path ? "page" : undefined
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-2">
                {!principal && (
                  <div className="hidden md:flex space-x-4 items-center justify-between">
                    <Link
                      to="/login"
                      className="!text-white dark:text-gray-800"
                    >
                      Login
                    </Link>
                    <Link to="/register" type="button">
                      Register
                    </Link>
                  </div>
                )}
                <Popover className="relative">
                  {() => (
                    <>
                      <Popover.Button
                        ref={setPopupButtonElement}
                        className="p-1 rounded-full text-gray-200 dark:text-gray-600 hover:text-white dark:text-gray-800 focus:outline-none"
                      >
                        {principal ? (
                          <div className="bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white p-2 rounded-full">
                            <div className="h-5 md:h-6 aspect-square rounded-md">
                              <Avatar value={principal} />
                            </div>
                          </div>
                        ) : (
                          <EllipsisVerticalIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Popover.Button>
                      <Popover.Panel
                        ref={setPopupDialogElement}
                        className="shadow-md border dark:border-gray-900 rounded-md z-10 w-screen max-w-xs sm:max-w-sm bg-white dark:bg-gray-600 text-gray-800 dark:text-white"
                        style={styles.popper}
                        {...attributes.popper}
                      >
                        {principal ? (
                          <div className="p-4 bg-gray-100 dark:bg-gray-800 flex space-x-4 items-center justify-between">
                            <div className="flex space-x-4 items-center overflow-hidden">
                              <div className="bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white p-2 rounded-full">
                                <div className="h-10 aspect-square rounded-md">
                                  <Avatar value={principal} />
                                </div>
                              </div>
                              <div className="space-y-1 overflow-hidden">
                                <div className="truncate">{principal}</div>
                              </div>
                            </div>
                            <div>
                              <Link
                                to="/logout"
                                className="p-1 rounded-full text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                              >
                                <ArrowLeftOnRectangleIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </Link>
                            </div>
                          </div>
                        ) : (
                          <div className="flex md:hidden flex-col">
                            <div className="p-4 bg-gray-100 dark:bg-gray-800 flex space-x-4 items-center justify-between">
                              <Link to="/login" type="button" className="grow">
                                Login
                              </Link>
                              <Link
                                to="/register"
                                type="button"
                                className="grow"
                              >
                                Register
                              </Link>
                            </div>
                          </div>
                        )}
                        <div className="p-2 text-gray-800 dark:text-white flex flex-col space-y-2">
                          <div className="flex justify-between items-center p-2 rounded">
                            <div className="text-sm">Dark Mode</div>
                            <div>
                              <Switch
                                checked={darkMode}
                                onChange={onThemeToggle}
                                className={`relative inline-flex flex-shrink-0 h-[24px] w-[44px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 ${
                                  darkMode
                                    ? "bg-green-500"
                                    : "bg-gray-100 dark:bg-gray-800"
                                }`}
                              >
                                <span className="sr-only">
                                  Toggle dark mode
                                </span>
                                <span
                                  aria-hidden="true"
                                  className={`pointer-events-none inline-block h-[20px] w-[20px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 ${
                                    darkMode
                                      ? "translate-x-[20px]"
                                      : "translate-x-0"
                                  }`}
                                />
                              </Switch>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </>
                  )}
                </Popover>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={NavLink}
                  to={item.path}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "text-white dark:text-gray-800 bg-orange-600"
                        : "text-gray-200 dark:text-gray-600 hover:text-white dark:text-gray-800 hover:bg-orange-400",
                      "block px-3 py-2 font-bold rounded-md"
                    )
                  }
                  aria-current={
                    location.pathname === item.path ? "page" : undefined
                  }
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
