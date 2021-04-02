import { GetServerSidePropsContext } from "next";

import { api } from "./api";
import { AccountClient, AuthClient, ExampleChildClient, UserClient } from "./nswagts";

export const genExampleClient = (
  context?: GetServerSidePropsContext
): Promise<ExampleChildClient> => api(ExampleChildClient, context);
export const genAuthenticationClient = (context?: GetServerSidePropsContext): Promise<AuthClient> =>
  api(AuthClient, context);
export const genAccountClient = (context?: GetServerSidePropsContext): Promise<AccountClient> =>
  api(AccountClient, context);
export const genUserClient = (context?: GetServerSidePropsContext): Promise<UserClient> =>
  api(UserClient, context);
