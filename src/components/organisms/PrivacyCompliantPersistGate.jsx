import { useEffect } from "react";
import { useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import CookieBanner from "./CookieBanner";

export default function PrivacyCompliantPersistGate({
  children,
  persistor,
  loading,
}) {
  const webStorageAllowed = useSelector(
    (state) => state.privacy.webStorageAllowed
  );

  useEffect(() => {
    if (webStorageAllowed) {
      persistor.persist();
    }
  }, [webStorageAllowed, persistor]);

  return (
    <PersistGate persistor={persistor} loading={loading}>
      {children}
      <CookieBanner persistor={persistor} />
    </PersistGate>
  );
}
