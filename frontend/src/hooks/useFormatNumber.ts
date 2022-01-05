import { useCallback } from "react";

import { useLocales } from "./useLocales";

export const useFormatNumber = () => {
  const { formatCurrency } = useLocales();

  const formatNumberThousandSep = useCallback(
    (formatValue: string | number, leftOrRight: "left" | "right") => {
      if (formatValue == "") return 0;
      let thousandSep = ".";
      let decimalSep = ",";
      if (leftOrRight == "left") {
        thousandSep = ",";
        decimalSep = ".";
      }
      if (typeof formatValue == typeof 1) formatValue = (formatValue as number).toString();
      formatValue = formatValue.toString().replaceAll(thousandSep, "");
      formatValue = parseInt(formatValue.split(decimalSep)[0]);
      formatValue = Math.max(0, Math.min(1000000000, formatValue));
      const retVal = formatCurrency(formatValue).numberPartsOnly.split(decimalSep)[0];
      return retVal == "NaN" ? 0 : retVal;
    },
    [formatCurrency]
  );

  const parseFormat = useCallback((formatValue: string | number, leftOrRight: "left" | "right") => {
    if (formatValue == "") return 0;
    let thousandSep = ".";
    let decimalSep = ",";
    if (leftOrRight == "left") {
      thousandSep = ",";
      decimalSep = ".";
    }
    if (typeof formatValue == typeof 1) formatValue = (formatValue as number).toString();
    formatValue = formatValue.toString().replaceAll(thousandSep, "");
    formatValue = parseInt(formatValue.split(decimalSep)[0]);
    formatValue = Math.max(0, Math.min(1000000000, formatValue));
    return formatValue;
  }, []);

  const formatNumberThousandSepDecimal = useCallback(
    (formatValue: number) => {
      return formatCurrency(formatValue).numberPartsOnly;
    },
    [formatCurrency]
  );

  return {
    formatNumberThousandSep,
    formatNumberThousandSepDecimal,
    parseFormat
  };
};
