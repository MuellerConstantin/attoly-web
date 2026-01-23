import { useLocale } from "next-intl";
import { createApi } from "../api/index";

export function useApi() {
  const locale = useLocale();

  return createApi(locale);
}
