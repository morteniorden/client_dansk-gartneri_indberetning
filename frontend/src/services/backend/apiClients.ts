import { GetServerSidePropsContext } from "next";

import { api } from "./api";
import { AuthClient, MailClient, StatementClient, UserClient } from "./nswagts";

export const genAuthenticationClient = (context?: GetServerSidePropsContext): Promise<AuthClient> =>
  api(AuthClient, context);
export const genUserClient = (context?: GetServerSidePropsContext): Promise<UserClient> =>
  api(UserClient, context);
export const genMailClient = (context?: GetServerSidePropsContext): Promise<MailClient> =>
  api(MailClient, context);
export const genStatementClient = (context?: GetServerSidePropsContext): Promise<StatementClient> =>
  api(StatementClient, context);
