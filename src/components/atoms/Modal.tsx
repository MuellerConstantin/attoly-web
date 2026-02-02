import React from "react";
import {
  ModalOverlay,
  ModalOverlayProps,
  Modal as RACModal,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { motion, HTMLMotionProps } from "framer-motion";

const MotionModal = motion(RACModal);

export type ModalProps = HTMLMotionProps<"div"> &
  ModalOverlayProps & { placement?: "center" | "bottom" };

export function Modal(props: ModalProps) {
  const {
    placement = "center",
    className: modalClassName,
    children,
    ...overlayRest
  } = props;
  const isBottom = placement === "bottom";

  const overlayStyles = tv({
    base: "fixed top-0 left-0 w-full h-full isolate z-[120000] bg-black/[50%] p-4 backdrop-blur-none",
    variants: {
      isEntering: {
        true: "animate-in fade-in duration-200 ease-out",
      },
      isExiting: {
        true: "animate-out fade-out duration-200 ease-in",
      },
      isBottom: {
        true: "flex items-end justify-center",
        false: "flex items-center justify-center",
      },
    },
  });

  const modalStyles = tv({
    base: "w-full max-w-md max-h-full overflow-auto h-fit rounded-2xl bg-white dark:bg-slate-800/70 dark:backdrop-blur-2xl dark:backdrop-saturate-200 forced-colors:bg-[Canvas] text-left align-middle text-slate-700 dark:text-slate-300 shadow-2xl bg-clip-padding border border-black/10 dark:border-white/10",
    variants: {
      isEntering: {
        true: "animate-in zoom-in-105 ease-out duration-200",
      },
      isExiting: {
        true: "animate-out zoom-out-95 ease-in duration-200",
      },
    },
  });

  const modalProps = {
    children,
    initial: props.initial,
    animate: props.animate,
    exit: props.exit,
    transition: props.transition,
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="hidden">
      <ModalOverlay
        {...overlayRest}
        className={(renderProps) => overlayStyles({ ...renderProps, isBottom })}
      >
        <MotionModal
          {...modalProps}
          className={(renderProps) =>
            [modalStyles(renderProps), modalClassName].filter(Boolean).join(" ")
          }
        />
      </ModalOverlay>
    </div>
  );
}
