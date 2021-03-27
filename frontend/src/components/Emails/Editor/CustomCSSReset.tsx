import { chakra } from "@chakra-ui/system";
import { FC } from "react";

const CustomCSSReset: FC = ({ children }) => {
  return (
    //The "sx" styling is a necessary hack to make headings and lists display properly in the editor and preview
    //This is due to Chakra UI that somehow overwrites the styling in a wrong way, and it cannot be fixed with a <CSSReset />
    <chakra.div
      sx={{
        h2: { fontSize: "1.5em", marginTop: "0.83em", marginBottom: "0.83em", fontWeight: "bold" },
        "ul, ol": { paddingLeft: "40px" }
      }}>
      {children}
    </chakra.div>
  );
};
export default CustomCSSReset;
