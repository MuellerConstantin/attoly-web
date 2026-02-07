"use client";
import React from "react";
import {
  composeRenderProps,
  Button as RACButton,
  ButtonProps as RACButtonProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "@/components/utils";

export interface ButtonProps extends RACButtonProps {
  /** @default 'primary' */
  variant?: "primary" | "secondary" | "destructive" | "icon";
}

let button = tv({
  extend: focusRing,
  base: "relative inline-flex items-center border-0 font-sans text-sm text-center transition rounded-md cursor-default p-1 flex items-center justify-center text-slate-600 bg-transparent hover:bg-black/[5%] pressed:bg-black/10 dark:text-slate-400 dark:hover:bg-white/10 dark:pressed:bg-white/20 disabled:bg-transparent [-webkit-tap-highlight-color:transparent]",
  variants: {
    isDisabled: {
      true: "bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 forced-colors:text-[GrayText] border-black/5 dark:border-white/5",
    },
  },
});

export function FieldButton(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({ ...renderProps, className }),
      )}
    >
      {props.children}
    </RACButton>
  );
}
