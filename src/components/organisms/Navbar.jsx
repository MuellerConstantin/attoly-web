import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Disclosure } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NavbarMenu from "./NavbarMenu";
import LanguageSelector from "./LanguageSelector";
import Link from "../atoms/Link";

import Logo from "../../assets/images/logo.svg";
import LogoTextLight from "../../assets/images/logo-text-light.svg";
import LogoTextDark from "../../assets/images/logo-text-dark.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const location = useLocation();
  const { t } = useTranslation();

  const principal = useSelector((state) => state.auth.principal);

  const navigation = [
    { name: t("components.navbar.navigation.home"), path: "/home" },
    {
      name: t("components.navbar.navigation.get-started"),
      path: "/get-started",
    },
    { name: t("components.navbar.navigation.about"), path: "/about" },
  ];

  return (
    <Disclosure as="nav" className="bg-white dark:bg-gray-800">
      {({ open }) => (
        <>
          <div className="px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white focus:outline-none">
                  <span className="sr-only">
                    {t("components.navbar.menu.open-menu")}
                  </span>
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
                      src={LogoTextDark}
                      alt="Attoly Logo"
                    />
                    <img
                      className="hidden lg:dark:block h-8 w-auto"
                      src={LogoTextLight}
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
                              ? "text-gray-800 dark:text-white"
                              : "text-gray-500 hover:text-orange-500",
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
                <LanguageSelector />
                {!principal && (
                  <div className="hidden md:flex space-x-4 items-center justify-between">
                    <Link
                      to="/login"
                      className="!text-gray-800 dark:!text-white"
                    >
                      {t("components.navbar.navigation.login")}
                    </Link>
                    <Link to="/register" type="button" className="rounded-full">
                      {t("components.navbar.navigation.register")}
                    </Link>
                  </div>
                )}
                <NavbarMenu />
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
