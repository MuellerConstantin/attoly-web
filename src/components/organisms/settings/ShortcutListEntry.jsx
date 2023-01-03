import { useState } from "react";
import {
  ClockIcon,
  ClipboardDocumentIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import DeleteShortcutDialog from "./DeleteShortcutDialog";

export default function ShortcutListEntry({ shortcut, onChange }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-700 relative flex rounded-lg p-3 shadow-md focus:outline-none text-gray-800 dark:text-white">
      <div className="flex w-full items-center justify-between space-x-2">
        <div className="flex flex-col w-full space-y-1">
          <p className="font-medium">{shortcut.tag}</p>
          <p className="text-sm text-gray-400 truncate">{shortcut.url}</p>
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <ClockIcon className="h-3" />
            <p>{new Date(shortcut.createdAt).toLocaleString()}</p>
            {shortcut.anonymous && (
              <>
                <span>&bull;</span>
                <p>Anonymous</p>
              </>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            className="p-1 rounded-full text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:text-white focus:outline-none"
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/redirect/${shortcut.tag}`
              );
            }}
          >
            <ClipboardDocumentIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <DeleteShortcutDialog
            onSubmit={() => {
              setShowDeleteModal(false);
              if (onChange) onChange();
            }}
            onClose={() => setShowDeleteModal(false)}
            isOpen={showDeleteModal}
            tag={shortcut.tag}
          />
          <button
            type="button"
            className="p-1 rounded-full text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:text-white focus:outline-none"
            onClick={() => setShowDeleteModal(true)}
          >
            <TrashIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ShortcutSkeletonListEntry({ error }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white relative flex rounded-lg p-3 shadow-md focus:outline-none">
      <div className="flex w-full items-center justify-between">
        <div
          className={`flex flex-col w-full space-y-1 ${
            !error && "animate-pulse"
          }`}
        >
          <div
            className={`w-1/3 h-4 rounded-lg ${
              error
                ? "bg-red-200 dark:bg-red-400"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          />
          <div
            className={`w-1/2 h-3 rounded-lg ${
              error
                ? "bg-red-200 dark:bg-red-400"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          />
          <div className="flex items-center space-x-1">
            <ClockIcon className="h-3" />
            <div
              className={`w-1/4 h-3 rounded-lg ${
                error
                  ? "bg-red-200 dark:bg-red-400"
                  : "bg-gray-200 dark:bg-gray-800"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
