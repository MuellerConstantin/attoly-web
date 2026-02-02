import React from "react";
import { AnimatePresence } from "framer-motion";
import { Modal, ModalProps } from "../atoms/Modal";

export function AnimatedDialogModal(props: ModalProps) {
  return (
    <AnimatePresence>
      {props.isOpen && (
        <Modal
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          {...props}
        >
          {props.children}
        </Modal>
      )}
    </AnimatePresence>
  );
}
