import { useCallback, useState } from "react";

import { useLocales } from "./useLocales";

export type PasswordRule = {
  predicate: (pw: string, pw2?: string) => boolean;
  errorMsg: string;
};

export interface pwState {
  pw1: string;
  pw2: string;
  errors: PasswordRule[];
  pw1Valid: boolean;
  pw2Valid: boolean;
}

export const usePasswordValidation = () => {
  const { t } = useLocales();
  const [pwState, setPwState] = useState<pwState>({
    pw1: "",
    pw2: "",
    errors: [],
    pw1Valid: true,
    pw2Valid: true
  });

  const rules: PasswordRule[] = [
    {
      predicate: pw => pw.length >= 8,
      errorMsg: t("password.tooShort")
    },
    {
      predicate: pw => new RegExp("[A-Z]+").test(pw),
      errorMsg: t("password.missingUppercase")
    },
    {
      predicate: pw => new RegExp("[a-z]+").test(pw),
      errorMsg: t("password.missingLowercase")
    },
    {
      predicate: pw => new RegExp("[0-9]+").test(pw),
      errorMsg: t("password.missingNumber")
    }
  ];

  const checkState = useCallback((): boolean => {
    const newErrors = rules.reduce((errors: PasswordRule[], rule: PasswordRule) => {
      if (!rule.predicate(pwState.pw1, pwState.pw2)) errors.push(rule);
      return errors;
    }, []);

    const newState = { ...pwState, ...{ errors: newErrors } };
    newState.pw1Valid = newState.errors.length == 0;
    newState.pw2Valid = newState.pw1 == newState.pw2;
    setPwState(newState);

    return newState.pw1Valid && newState.pw2Valid;
  }, [pwState]);

  return { pwState, setPwState, checkState };
};
