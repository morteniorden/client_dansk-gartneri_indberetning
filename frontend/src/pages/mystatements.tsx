import MyStatements from "components/User/MyStatements/MyStatements";
import { Locale } from "i18n/Locale";
// import { runTimeTable } from "i18n/runtimeTable";
import { GetStaticProps, NextPage } from "next";
import { I18nProps } from "next-rosetta";

const ChangePasswordPage: NextPage = () => {
  return <MyStatements />;
};

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async context => {
  const locale = context.locale || context.defaultLocale;
  const { table = {} } = await import(`../i18n/${locale}`);
  // table = await runTimeTable(locale, table);

  return {
    props: { table }
  };
};

export default ChangePasswordPage;