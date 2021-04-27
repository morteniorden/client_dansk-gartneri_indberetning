import { Box } from "@chakra-ui/layout";
import { LayoutProps } from "@chakra-ui/styled-system";
import { VFC } from "react";

type Position =
  | { top: number; right: number }
  | { top: number; left: number }
  | { bottom: number; right: number }
  | { bottom: number; left: number };

interface Props {
  position: Position;
  layout: LayoutProps;
  border?: {
    width?: LayoutProps["width"];
    color?: string;
  };
  color?: string;
}

const InfoBubble: VFC<Props> = ({ position, layout, border, color = "blue.500" }) => (
  <Box
    position="absolute"
    {...position}
    {...layout}
    sx={{
      "@keyframes pulse-out": {
        from: { transform: "scale(1)", opacity: 1 },
        to: { transform: "scale(2)", opacity: 0 }
      }
    }}
    _before={{
      position: "absolute",
      top: "8px",
      right: "8px",
      bottom: "8px",
      left: "8px",
      background: color,
      borderRadius: "100%",
      borderStyle: "solid",
      borderWidth: border?.width ?? "4px",
      borderColor: border?.color ?? "white",
      boxShadow: "0 0 6px 2px #0000001a"
    }}
    _after={{
      position: "absolute",
      top: "10px",
      right: "10px",
      bottom: "10px",
      left: "10px",
      background: color,
      borderRadius: "100%",
      animation: "pulse-out 2000ms infinite"
    }}
  />
);

export default InfoBubble;
