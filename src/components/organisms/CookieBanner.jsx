import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation, Trans } from "react-i18next";
import Button from "../atoms/Button";
import Link from "../atoms/Link";
import privacySlice from "../../store/slices/privacy";

export default function CookieBanner() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const webStorageAllowed = useSelector(
    (state) => state.privacy.webStorageAllowed
  );

  const [open, setOpen] = useState(false);

  const allowCookies = () => {
    dispatch(privacySlice.actions.setWebStorageAllowed(true));
    setOpen(false);
  };

  const denyCookies = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!webStorageAllowed) {
      setOpen(true);
    }
  }, [webStorageAllowed]);

  if (open) {
    return (
      <div className="fixed bottom-0 right-0 p-4 z-50">
        <div className="w-full max-w-md overflow-hidden rounded-2xl bg-amber-100 text-gray-800 p-6 text-left align-middle shadow-xl">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              {t("components.cookie-banner.title")}
            </h2>

            <p className="text-sm">
              <Trans
                t={t}
                i18nKey="components.cookie-banner.description"
                components={{
                  hyperlink: <Link to="/privacy-policy" />,
                }}
              />
            </p>
            <Button className="!bg-amber-700 !w-full" onClick={allowCookies}>
              {t("components.cookie-banner.allow")}
            </Button>
            <div className="flex justify-center">
              <button
                type="button"
                className="text-xs hover:underline"
                onClick={denyCookies}
              >
                {t("components.cookie-banner.deny")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
