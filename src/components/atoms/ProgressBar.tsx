"use client";
import React from "react";
import {
  ProgressBar as AriaProgressBar,
  ProgressBarProps as AriaProgressBarProps,
} from "react-aria-components";
import { Label } from "./Field";
import { composeTailwindRenderProps } from "@/components/utils";

export interface ProgressBarProps extends AriaProgressBarProps {
  label?: string;
}

export function ProgressBar({ label, ...props }: ProgressBarProps) {
  return (
    <AriaProgressBar
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex w-64 max-w-full flex-col gap-2 font-sans",
      )}
    >
      {({ percentage, valueText, isIndeterminate }) => (
        <>
          <div className="flex justify-between gap-2">
            <Label>{label}</Label>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              {valueText}
            </span>
          </div>
          <div className="relative h-2 max-w-full overflow-hidden rounded-full bg-neutral-300 outline outline-1 -outline-offset-1 outline-transparent dark:bg-neutral-700">
            <div
              className={`absolute top-0 h-full rounded-full bg-orange-500 forced-colors:bg-[Highlight] ${isIndeterminate ? "animate-in slide-in-from-left-[20rem] repeat-infinite left-full duration-1000 ease-out" : "left-0"}`}
              style={{ width: (isIndeterminate ? 40 : percentage) + "%" }}
            />
          </div>
        </>
      )}
    </AriaProgressBar>
  );
}
