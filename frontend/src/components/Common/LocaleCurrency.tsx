import { useLocales } from "hooks/useLocales";
import { forwardRef, ForwardRefRenderFunction } from "react";
import NumberFormat, { NumberFormatProps } from "react-number-format";

const LocaleCurrency: ForwardRefRenderFunction<
  any,
  Omit<
    NumberFormatProps<any>,
    "thousandSeparator" | "decimalSeparator" | "decimalScale" | "prefix" | "suffix"
  >
> = (props, ref) => {
  const { formats } = useLocales();

  return (
    <NumberFormat
      thousandSeparator={formats.number.thousandSeparator}
      decimalSeparator={formats.number.decimalSeparator}
      decimalScale={formats.currency.maxDecimals}
      ref={ref}
      {...props}
    />
  );
};

export default forwardRef(LocaleCurrency);
