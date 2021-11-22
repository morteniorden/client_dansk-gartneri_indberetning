/* istanbul ignore file */
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { genAuthenticationClient } from "services/backend/apiClients";
import { ILoginRequestDto, IUserDto, IUserTokenDto, LoginCommand } from "services/backend/nswagts";

import { useEffectAsync } from "./useEffectAsync";

export enum AuthStage {
  CHECKING,
  AUTHENTICATED,
  UNAUTHENTICATED
}

type AuthHook<IUserDto> = {
  authStage: AuthStage;
  login: (loginRequest: ILoginRequestDto) => Promise<boolean>;
  logout: () => void;
  activeUser: IUserDto | null;
  loginWithToken: (token: string) => void;
};

// This hook requires two functionalities.
// 1 an endpoint to login a user meant to be called in the background returning a token
// 2 an endpoint to retrieve the user from the token in the header
export const useAuth = (): AuthHook<IUserDto> => {
  const [authStage, setAuthStage] = useState(AuthStage.CHECKING);
  const [authCounter, setAuthCounter] = useState(0);
  const [activeUser, setActiveUser] = useState<IUserDto>(null);
  const router = useRouter();

  useEffectAsync(async () => {
    const client = await genAuthenticationClient();
    const user: IUserDto = await client.checkAuth().catch(() => null);

    setActiveUser(user);

    setAuthStage(user ? AuthStage.AUTHENTICATED : AuthStage.UNAUTHENTICATED);
  }, [authCounter]);

  const login = useCallback(async (loginRequest: ILoginRequestDto) => {
    const client = await genAuthenticationClient();

    const user: IUserTokenDto = await client
      .login(
        new LoginCommand({
          loginDetails: loginRequest
        })
      )
      .catch(() => null);

    if (!user) {
      return false;
    }
    setAuthStage(AuthStage.CHECKING);
    // setCookie(user.token); // Enable ONLY if you are using servicesideprops that require auth
    setAuthToken(user.token);
    setAuthCounter(c => c + 1);
    return true;
  }, []);

  const logout = useCallback(() => {
    setAuthStage(AuthStage.UNAUTHENTICATED);
    deleteCookie();
    setAuthToken("invalid_token");
    // setAuthCounter(c => c + 1);
    router.push("/");
  }, []);

  const loginWithToken = useCallback((token: string) => {
    setAuthStage(AuthStage.CHECKING);
    setCookie(token);
    setAuthToken(token);
    setAuthCounter(c => c + 1);
    return true;
  }, []);

  return { authStage, login, logout, activeUser, loginWithToken };
};

export const getAuthToken = (context?: GetServerSidePropsContext): string => {
  if (process.browser) return localStorage.getItem(process.env.NEXT_PUBLIC_AUTH_NAME);

  if (!context) return null;

  const token = context.req.cookies[process.env.NEXT_PUBLIC_AUTH_NAME];
  return token;
};

export const setAuthToken = (token: string, context?: GetServerSidePropsContext): void => {
  if (process.browser) return localStorage.setItem(process.env.NEXT_PUBLIC_AUTH_NAME, token);

  if (!context) return;

  context.res.setHeader("Set-Cookie", genSetCookie(token));

  return; // TODO Maybe use cookie with context read??
};

const genSetCookie = (token: string) => {
  const d = new Date();
  d.setTime(d.getTime() + 14 * 24 * 60 * 60 * 1000); //14 days

  return `${
    process.env.NEXT_PUBLIC_AUTH_NAME
  }=${token}; expires=${d.toUTCString()}; path=/; SameSite=Strict`;
};

const setCookie = (token: string) => {
  document.cookie = genSetCookie(token);
};

const deleteCookie = () => {
  document.cookie = `${process.env.NEXT_PUBLIC_AUTH_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};
