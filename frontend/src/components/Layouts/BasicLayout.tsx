import { Grid, GridItem, Spacer } from "@chakra-ui/react";
import Header from "components/Header/Header";
import StatementFormHeader from "components/Header/StatementFormHeader";
import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  maxW?: string;
  variant?: "statementHeader";
}

const BasicLayout: FC<Props> = ({ children, maxW, variant }) => {
  return (
    <Grid
      gridTemplateColumns={`1fr minmax(400px, ${maxW ?? "100vw"}) 1fr`}
      gridTemplateRows="auto 1fr">
      <GridItem rowSpan={1} colSpan={3}>
        {variant == "statementHeader" ? <StatementFormHeader /> : <Header />}
      </GridItem>
      <GridItem colStart={2} p={5}>
        {variant == "statementHeader" && <Spacer h="60px" />}
        {children}
      </GridItem>
    </Grid>
  );
};
export default BasicLayout;
