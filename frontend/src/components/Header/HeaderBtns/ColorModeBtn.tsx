import { IconButton } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { FC } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

const ColorModeBtn: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      size="sm"
      onClick={toggleColorMode}
      isRound={true}
      aria-label={colorMode === "light" ? "Toggle dark mode" : "Toggle light mode"}
      icon={colorMode === "light" ? <BiMoon /> : <BiSun />}
    />
  );
};
export default ColorModeBtn;
