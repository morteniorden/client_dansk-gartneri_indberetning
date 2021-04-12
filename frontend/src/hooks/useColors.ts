import { useColorModeValue } from "@chakra-ui/react";

// ignore due to implied typing is better suited for this kind of hook
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useColors = () => {
  const hoverBg = useColorModeValue("blue.200", "blue.700");
  const activeBg = useColorModeValue("yellow.200", "yellow.700");
  const menuBg = useColorModeValue("gray.100", "gray.700");
  const buttonFont = useColorModeValue("white", "black");
  const headerBg = "gray.700";
  const boxBorder = useColorModeValue("gray.200", "gray.700");
  const subTextColor = useColorModeValue("gray.500", "gray.500");
  const infoColor = useColorModeValue("yellow.100", "yellow.600");
  const warningColor = useColorModeValue("orange.100", "orange.600");
  const errorColor = useColorModeValue("red.100", "red.600");

  return {
    hoverBg,
    menuBg,
    activeBg,
    buttonFont,
    headerBg,
    boxBorder,
    subTextColor,
    warningColor,
    errorColor,
    infoColor
  };
};
