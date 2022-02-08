import "ts-array-ext/reduceAsync";

import { Locale } from "i18n/Locale";
import { useRouter } from "next/router";
import { useI18n } from "next-rosetta";
import { useCallback, useMemo, useState } from "react";

import { useMemoAsync } from "./useMemoAsync";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useLocales = () => {
  const { locale, locales } = useRouter();

  const { t, table } = useI18n<Locale>();

  const formats = useMemo(() => {
    return (table(locale) as Locale)?.formats;
  }, [locale, table]);

  const localeNameMap = useMemoAsync<Record<string, string>>(
    async () => {
      return await locales.reduceAsync<Record<string, string>>(async (acc, cur) => {
        const localeFile = await require("../i18n/" + cur);
        acc[cur] = (localeFile.table as Locale).locale;
        return acc;
      }, {});
    },
    [],
    {}
  );

  const localeFlagMap = useMemoAsync<Record<string, string>>(
    async () => {
      return await locales.reduceAsync<Record<string, string>>(async (acc, cur) => {
        const localeFile = await require("../i18n/" + cur);
        acc[cur] = (localeFile.table as Locale).locale;
        return acc;
      }, {});
    },
    [],
    {}
  );

  const numberFormatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        maximumFractionDigits: 2
      }),
    [locale]
  );

  const currencyFormatter = useMemo(() => {
    const currency = t("currencyCode") || "USD";
    return new Intl.NumberFormat(locale, { style: "currency", currency });
  }, [locale, t]);

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
    formats,
    locale,
    locales,
    localeNameMap,
    localeFlagMap,
    numberFormatter,
    currencyFormatter,
    formatCurrency
  };
};
