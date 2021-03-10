import { Grid, GridItem } from "@chakra-ui/react";
import Header from "components/Header/Header";
import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const BasicLayout: FC<Props> = ({ children }) => {
  return (
    <Grid gridTemplateColumns="1fr minmax(400px, 1000px) 1fr" gridTemplateRows="auto 1fr">
      <GridItem rowSpan={1} colSpan={3}>
        <Header />
      </GridItem>
      <GridItem colStart={2} p={5}>
        {children}
      </GridItem>
    </Grid>
  );
};
export default BasicLayout;
