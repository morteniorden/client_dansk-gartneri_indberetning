import "../theme/styles.global.css";
import "isomorphic-unfetch";

import { ChakraProvider } from "@chakra-ui/react";
import BasicLayout from "components/Layouts/BasicLayout";
import { AuthContext } from "contexts/AuthContext";
import { AuthStage, useAuth } from "hooks/useAuth";
import { useEffectAsync } from "hooks/useEffectAsync";
import { AppPropsType } from "next/dist/next-server/lib/utils";
import Head from "next/head";
import { useRouter } from "next/router";
import { I18nProvider } from "next-rosetta";
import { ReactElement } from "react";
import isomorphicEnvSettings, { setEnvSettings } from "utils/envSettings";
import { logger } from "utils/logger";

import theme from "../theme/theme";
import LoginPage from "./login";

const MyApp = ({ Component, pageProps, __N_SSG }: AppPropsType): ReactElement => {
  // usePWA(); //! OPT IN

  const auth = useAuth();
  const router = useRouter();

  useEffectAsync(async () => {
    if (!__N_SSG) {
      logger.info("Environment should be readable");

      const envSettings = isomorphicEnvSettings();
      if (envSettings) setEnvSettings(envSettings);
      if (process.browser) {
        const response = await fetch("/api/getEnv");
        const envSettings = await response.json();
        setEnvSettings(envSettings);
      }
    }
  }, []);

  return (
    <main>
      <Head>
        <title>Dansk Gartneri - Indeberetning</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#2196f3" />
        <meta name="description" content="Dansk Gartneri - Indeberetning" />
        <meta name="robots" content="noindex" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/images/icons/icon-192x192.png"></link>
      </Head>
      <noscript>
        <h1>JavaScript must be enabled!</h1>
      </noscript>
      <I18nProvider table={pageProps.table}>
        <ChakraProvider theme={theme}>
          <AuthContext.Provider value={auth}>
            {/* <SignalRContext.Provider value={{ connection }}> */}
            {router.pathname == "/changepassword" ? (
              <Component {...pageProps} />
            ) : auth.authStage == AuthStage.AUTHENTICATED ? (
              <Component {...pageProps} />
            ) : (
              <Component {...pageProps} />
            )}
            {/* </SignalRContext.Provider> */}
          </AuthContext.Provider>
        </ChakraProvider>
      </I18nProvider>
    </main>
  );
};
//<LoginPage />

export default MyApp;
