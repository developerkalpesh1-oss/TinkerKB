import { getRequestConfig } from "next-intl/server";

import { defaultLocale } from "@/i18n/config";

// TinkerKB is English-only: ignore any saved locale cookie or Accept-Language.
export default getRequestConfig(async () => {
  const locale = defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    onError(error) {
      if (process.env.NODE_ENV !== "production") console.error(error);
    },
    getMessageFallback({ namespace, key }) {
      return [namespace, key].filter(Boolean).join(".");
    },
  };
});
