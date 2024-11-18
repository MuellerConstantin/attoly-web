import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, LanguageIcon } from "@heroicons/react/20/solid";
import { usePopper } from "react-popper";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const languages = [
    { name: "English", code: "en" },
    { name: "Deutsch", code: "de" },
  ];

  const onChangeLanguage = (language) => {
    i18n.changeLanguage(language);
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
    <Listbox value={i18n.resolvedLanguage} onChange={onChangeLanguage}>
      <div className="relative mt-1">
        <Listbox.Button
          ref={setPopupButtonElement}
          className="p-1 rounded-full text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white focus:outline-none"
        >
          <LanguageIcon className="h-6 w-6" aria-hidden="true" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            ref={setPopupDialogElement}
            className="shadow-md py-1 border dark:border-gray-900 rounded-md z-50 w-screen max-w-[10rem] bg-white dark:bg-gray-600 text-gray-800 dark:text-white"
            style={styles.popper}
            {...attributes.popper}
          >
            {languages.map((language) => (
              <Listbox.Option
                key={language.code}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active
                      ? "text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700"
                      : "text-gray-800 dark:text-white"
                  }`
                }
                value={language.code}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {language.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-500">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
