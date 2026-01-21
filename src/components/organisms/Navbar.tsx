"use client";

import React, { use, useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import {
  Menu as MenuIcon,
  EllipsisVertical as EllipsisVerticalIcon,
  Languages as LanguagesIcon,
  LogOut as LogOutIcon,
  CircleUser as CircleUserIcon,
} from "lucide-react";
import { MenuTrigger } from "react-aria-components";
import { Button } from "@/components/atoms/Button";
import { Link } from "@/components/atoms/Link";
import { Switch } from "@/components/atoms/Switch";
import { Menu, MenuItem } from "@/components/molecules/Menu";
import { Popover } from "@/components/atoms/Popover";
import { useAppSelector, useAppDispatch } from "@/store";
import usabilitySlice from "@/store/slices/usability";
import { useRouter, usePathname } from "@/i18n/navigation";
import { signOut, useSession } from "next-auth/react";
import { ListBox, ListBoxItem } from "@/components/atoms/ListBox";
import useSWR from "swr";
import { api } from "@/api";
import { AxiosError } from "axios";
import { ApiError } from "@/lib/types/error";
import { Me } from "@/lib/types/users";

export function Navbar() {
  const t = useTranslations("Navbar");

  const navigation = useMemo(() => {
    return [{ name: t("home"), href: "/home" }];
  }, [t]);

  return (
    <nav className="relative border-b border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
      <div className="relative flex items-center justify-between space-x-10 p-4">
        <div className="md:hidden">
          <MenuTrigger>
            <Button variant="icon">
              <MenuIcon className="h-6 w-6" />
            </Button>
            <Menu>
              {navigation.map((item) => (
                <MenuItem
                  key={item.name}
                  id={`nav-${item.name}`}
                  href={item.href}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Menu>
          </MenuTrigger>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:top-auto md:left-auto md:translate-x-0 md:translate-y-0">
          <Link href="/home" className="!no-underline">
            <div className="relative flex w-fit items-center justify-center md:space-x-4">
              <Image
                src="/images/logo.svg"
                width={42}
                height={32}
                className="block h-8 w-auto lg:hidden"
                alt="Attoly"
              />
              <Image
                src="/images/logo-text-dark.svg"
                width={42}
                height={32}
                className="hidden h-8 w-auto lg:block lg:dark:hidden"
                alt="Attoly"
              />
              <Image
                src="/images/logo-text-light.svg"
                width={42}
                height={32}
                className="hidden h-8 w-auto lg:dark:block"
                alt="Attoly"
              />
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <div className="hidden space-x-2 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium font-semibold !text-slate-800 !no-underline hover:bg-slate-200 dark:!text-white dark:hover:bg-slate-800"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex">
            <MenuTrigger>
              <Button variant="icon">
                <LanguagesIcon className="h-6 w-6" />
              </Button>
              <NavbarLanguagesMenu />
            </MenuTrigger>
            <NavbarOptionsMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavbarUnauthenticatedOptionsMenu() {
  const t = useTranslations("Navbar");
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.usability.darkMode);

  return (
    <Popover className="entering:animate-in entering:fade-in entering:placement-bottom:slide-in-from-top-1 entering:placement-top:slide-in-from-bottom-1 exiting:animate-out exiting:fade-out exiting:placement-bottom:slide-out-to-top-1 exiting:placement-top:slide-out-to-bottom-1 fill-mode-forwards origin-top-left overflow-auto rounded-lg bg-white p-2 shadow-lg ring-1 ring-black/10 outline-hidden dark:bg-slate-950 dark:ring-white/15">
      <div className="flex w-[15rem] flex-col gap-4 overflow-hidden p-2">
        <div className="flex flex-col items-center gap-4 overflow-hidden">
          <Link
            href="/signin"
            className="pressed:bg-orange-700 block w-full cursor-pointer rounded-lg border border-black/10 bg-orange-500 px-5 py-2 text-center text-sm text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition hover:bg-orange-600 dark:border-white/10 dark:text-white dark:shadow-none"
          >
            {t("signin")}
          </Link>
          <Link variant="secondary" className="text-sm" href="/signup">
            {t.rich("noAccount", {
              highlight: (chunks) => (
                <span className="text-sky-500">{chunks}</span>
              ),
            })}
          </Link>
        </div>
        <Switch
          isSelected={darkMode}
          onChange={(newDarkMode) =>
            dispatch(usabilitySlice.actions.setDarkMode(newDarkMode))
          }
        >
          Dark Mode
        </Switch>
      </div>
    </Popover>
  );
}

function NavbarAuthenticatedOptionsMenu() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const darkMode = useAppSelector((state) => state.usability.darkMode);

  const { data, error, isLoading } = useSWR<Me, AxiosError<ApiError>, string>(
    "/user/me",
    (url) => api.get(url).then((res) => res.data),
    {
      refreshInterval: 300000, // 5 minutes
    },
  );

  return (
    <Popover className="entering:animate-in entering:fade-in entering:placement-bottom:slide-in-from-top-1 entering:placement-top:slide-in-from-bottom-1 exiting:animate-out exiting:fade-out exiting:placement-bottom:slide-out-to-top-1 exiting:placement-top:slide-out-to-bottom-1 fill-mode-forwards origin-top-left overflow-auto rounded-lg bg-white p-2 shadow-lg ring-1 ring-black/10 outline-hidden dark:bg-zinc-950 dark:ring-white/15">
      <div className="flex w-[15rem] flex-col gap-4 overflow-hidden p-2">
        <div className="flex gap-4 overflow-hidden">
          <div className="flex flex-col gap-2 overflow-hidden">
            <div className="flex flex-col gap-1">
              {isLoading ? (
                <div className="h-5 w-32 animate-pulse truncate rounded-lg bg-slate-300 dark:bg-slate-700" />
              ) : error ? (
                <div className="h-5 w-32 truncate rounded-lg bg-red-300 dark:bg-red-800" />
              ) : (
                data && (
                  <div className="truncate text-[1rem] font-bold text-slate-900 dark:text-slate-100">
                    {session?.user?.id}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <Switch
          isSelected={darkMode}
          onChange={(newDarkMode) =>
            dispatch(usabilitySlice.actions.setDarkMode(newDarkMode))
          }
        >
          Dark Mode
        </Switch>
        <ListBox>
          <ListBoxItem onAction={() => signOut({ callbackUrl: "/signin" })}>
            <div className="flex w-full items-center gap-2">
              <LogOutIcon className="h-4 w-4" />
              <span>Logout</span>
            </div>
          </ListBoxItem>
        </ListBox>
      </div>
    </Popover>
  );
}

export function NavbarOptionsMenu() {
  const { data: session, status } = useSession();

  const isAuthenticated = useMemo(
    () => status !== "loading" && session,
    [session, status],
  );

  return (
    <MenuTrigger>
      <Button variant="icon">
        {isAuthenticated ? (
          <CircleUserIcon className="h-6 w-6" />
        ) : (
          <EllipsisVerticalIcon className="h-6 w-6" />
        )}
      </Button>
      {isAuthenticated ? (
        <NavbarAuthenticatedOptionsMenu />
      ) : (
        <NavbarUnauthenticatedOptionsMenu />
      )}
    </MenuTrigger>
  );
}

export function NavbarLanguagesMenu() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onLocaleChange = useCallback(
    (newLocale: string) => {
      router.replace(pathname, { locale: newLocale });
    },
    [pathname, router],
  );

  return (
    <Menu
      selectionMode="single"
      selectedKeys={[`locale-${locale}`]}
      onSelectionChange={(key) =>
        onLocaleChange([...(key as Set<string>)][0].split("-")[1])
      }
    >
      <MenuItem id={`locale-en`}>{t("languages.en")}</MenuItem>
      <MenuItem id={`locale-de`}>{t("languages.de")}</MenuItem>
    </Menu>
  );
}
