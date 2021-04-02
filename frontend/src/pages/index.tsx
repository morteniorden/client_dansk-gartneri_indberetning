import { AuthContext } from "contexts/AuthContext";
import { Locale } from "i18n/Locale";
// import { runTimeTable } from "i18n/runtimeTable";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { I18nProps } from "next-rosetta";
import { useContext, useEffect } from "react";
import { RoleEnum } from "services/backend/nswagts";

const IndexPage: NextPage = () => {
  const router = useRouter();
  const { activeUser } = useContext(AuthContext);

  useEffect(() => {
    //Todo: Choose what to do with the index page and how to determine what content to display for the user
    switch (activeUser.role) {
      case RoleEnum.Admin:
        router.push("./accounts");
        break;
      case RoleEnum.Client:
        router.push("./accounts");
        break;
      case RoleEnum.Accountant:
        router.push("./accounts");
        break;
      default:
        router.push("./accounts");
        break;
    }
  }, [activeUser, router]);

  return <></>;
};

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async context => {
  const locale = context.locale || context.defaultLocale;
  const { table = {} } = await import(`../i18n/${locale}`);
  // table = await runTimeTable(locale, table);

  return {
    props: { table }
  };
};

export default IndexPage;
