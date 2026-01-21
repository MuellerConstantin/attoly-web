"use client";

import React from "react";
import {
  Link as AriaLink,
  LinkProps as AriaLinkProps,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "@/components/utils";

interface LinkProps extends AriaLinkProps {
  variant?: "primary" | "secondary";
}

const styles = tv({
  extend: focusRing,
  base: "hover:underline cursor-pointer aria-disabled:no-underline disabled:pointer-events-none disabled:cursor-default forced-colors:disabled:text-[GrayText] transition rounded-xs",
  variants: {
    variant: {
      primary:
        "text-orange-500 dark:text-orange-600 decoration-orange-500/60 hover:decoration-orange-500 dark:decoration-orange-600/60 dark:hover:decoration-orange-600",
      secondary:
        "text-slate-700 dark:text-slate-300 decoration-slate-700/50 hover:decoration-slate-700 dark:decoration-slate-300/70 dark:hover:decoration-slate-300",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export function Link(props: LinkProps) {
  return (
    <AriaLink
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className, variant: props.variant }),
      )}
    />
  );
}
