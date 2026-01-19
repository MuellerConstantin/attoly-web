import React from "react";
import {
  composeRenderProps,
  Button as RACButton,
  ButtonProps as RACButtonProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "@/components/utils";

export interface ButtonProps extends RACButtonProps {
  variant?: "primary" | "secondary" | "icon";
}

const button = tv({
  extend: focusRing,
  base: "px-5 py-2 text-sm text-center transition rounded-lg border border-black/10 dark:border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-none cursor-pointer",
  variants: {
    variant: {
      primary:
        "bg-orange-500 hover:bg-orange-600 pressed:bg-orange-700 text-white",
      secondary:
        "bg-gray-100 hover:bg-gray-200 pressed:bg-gray-300 text-gray-800 dark:bg-slate-600 dark:hover:bg-slate-500 dark:pressed:bg-slate-400 dark:text-slate-100",
      icon: "border-0 p-1 flex items-center justify-center text-gray-600 hover:bg-black/[5%] pressed:bg-black/10 dark:text-slate-400 dark:hover:bg-white/10 dark:pressed:bg-white/20 disabled:bg-transparent",
    },
    isDisabled: {
      true: "bg-gray-100 dark:bg-slate-800 text-gray-300 dark:text-slate-600 forced-colors:text-[GrayText] border-black/5 dark:border-white/5",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export function Button(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({ ...renderProps, variant: props.variant, className }),
      )}
    />
  );
}
