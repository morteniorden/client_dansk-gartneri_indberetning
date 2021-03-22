import { useCallback } from "react";

import { useLocales } from "./useLocales";

export type PasswordRule = {
  predicate: (pw: string) => boolean;
  errorMsg: string;
};

export interface pwValidationResult {
  errors: PasswordRule[];
  isValid: boolean;
  repetitionValid?: boolean;
}

export const usePasswordValidation = () => {
  const { t } = useLocales();

  const rules: PasswordRule[] = [
    {
      predicate: password => password.length >= 8,
      errorMsg: t("password.tooShort") as string
    },
    {
      predicate: password => new RegExp("[A-Z]+").test(password),
      errorMsg: t("password.missingUppercase") as string
    },
    {
      predicate: password => new RegExp("[a-z]+").test(password),
      errorMsg: t("password.missingLowercase") as string
    },
    {
      predicate: password => new RegExp("[0-9]+").test(password),
      errorMsg: t("password.missingNumber") as string
    }
  ];

  const validatePassword = useCallback(
    (password: string, repetition?: string): pwValidationResult => {
      const errors = rules.reduce((errors: PasswordRule[], rule: PasswordRule) => {
        if (!rule.predicate(password)) errors.push(rule);
        return errors;
      }, []);

      return {
        isValid: errors.length == 0,
        errors: errors,
        repetitionValid: password == repetition
      };
    },
    [rules]
  );

  return { validatePassword };
};
