import { Dimensions } from "react-native";
export const WINDOW_WIDTH = Dimensions.get("window").width;
export const WINDOW_HEIGHT = Dimensions.get("window").height;
const guidelineBaseWidth = 430;

export const scaleSize = (size: number) =>
  (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const scaleFont = (size: number) =>
  (WINDOW_WIDTH / guidelineBaseWidth) * size;
// size * PixelRatio.getFontScale();
function dimensions(
  top: number | string,
  right: number | string,
  bottom: number | string,
  left: number | string,
  property: "margin" | "padding",
) {
  if (property === "margin") {
    return {
      marginTop: top,
      marginRight: right,
      marginBottom: bottom,
      marginLeft: left,
    };
  } else {
    return {
      paddingTop: top,
      paddingRight: right,
      paddingBottom: bottom,
      paddingLeft: left,
    };
  }
}

export function padding(
  top: number | string,
  right: number | string,
  bottom: number | string,
  left: number | string,
) {
  return dimensions(top, right, bottom, left, "padding");
}

export function boxShadow(
  color: string,
  offset = { height: 2, width: 2 },
  radius = 8,
  opacity = 0.2,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}
