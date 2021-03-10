import { Grid } from "@chakra-ui/react";
import Header from "components/Header/Header";
import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const HeaderLayout: FC<Props> = ({ children }) => {
  return (
    <Grid gridTemplateRows="auto 1fr">
      <Header />
      {children}
    </Grid>
  );
};
export default HeaderLayout;
