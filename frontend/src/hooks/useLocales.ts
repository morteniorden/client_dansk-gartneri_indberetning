import "ts-array-ext/reduceAsync";

import { Locale } from "i18n/Locale";
import { useRouter } from "next/router";
import { useI18n } from "next-rosetta";
import { useCallback, useMemo, useState } from "react";

import { useEffectAsync } from "./useEffectAsync";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useLocales = () => {
  const [localeNameMap, setLocaleNameMap] = useState<Record<string, string>>();
  const [localeFlagMap, setLocaleFlagMap] = useState<Record<string, string>>();
  const { locale, locales } = useRouter();

  const { t } = useI18n<Locale>();

  useEffectAsync(async () => {
    const localeNameMap = await locales.reduceAsync<Record<string, string>>(async (acc, cur) => {
      const localeFile = await require("../i18n/" + cur);

      acc[cur] = (localeFile.table as Locale).locale;

      return acc;
    }, {});

    const localeFlagMap = await locales.reduceAsync<Record<string, string>>(async (acc, cur) => {
      const localeFile = await require("../i18n/" + cur);

      acc[cur] = (localeFile.table as Locale).flagUrl;

      return acc;
    }, {});

    setLocaleNameMap(localeNameMap);
    setLocaleFlagMap(localeFlagMap);
  }, []);

  const numberFormatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        maximumFractionDigits: 2
      }),
    [locale]
  );

  const currencyFormatter = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: t("currencyCode") }),
    [locale, t]
  );

  const formatCurrency = useCallback(
    (number: number) => {
      const parts = currencyFormatter.formatToParts(number);

      const currencyIndex = parts.findIndex(x => x.type === "currency");

      const numberPartsOnly = parts
        .filter((_, i) => i != currencyIndex)
        .map(x => x.value)
        .join("")
        .trim();

      const leftOrRight: "left" | "right" = parts.length / 2 > currencyIndex ? "left" : "right";

      const currency = parts[currencyIndex].value;

      return {
        numberPartsOnly,
        leftOrRight,
        currency
      };
    },
    [currencyFormatter]
  );

  return {
    t,
    locale,
    locales,
    localeNameMap,
    localeFlagMap,
    numberFormatter,
    currencyFormatter,
    formatCurrency
  };
};
