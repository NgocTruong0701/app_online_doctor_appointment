import { TextStyle } from "react-native";

import Colors from "./Colors";
import { scaleFont } from "./utils";

// FONT FAMILY
export const Urbanist = "UrbanistRegular";
export const UrbanistBold = "UrbanistBold";
export const UrbanistMedium = "UrbanistMedium";
export const UrbanistRegular = "UrbanistRegular";
export const UrbanistSemiBold = "UrbanistSemiBold";
export const UrbanistBlack = "UrbanistBlack";
export const UrbanistBlackItalic = "UrbanistBlackItalic";
export const UrbanistBoldItalic = "UrbanistBoldItalic";
export const UrbanistExtraBold = "UrbanistExtraBold";
export const UrbanistExtraBoldItalic = "UrbanistExtraBoldItalic";
export const UrbanistExtraLight = "UrbanistExtraLight";
export const UrbanistExtraLightItalic = "UrbanistExtraLightItalic";
export const UrbanistItalic = "UrbanistItalic";
export const UrbanistLight = "UrbanistLight";
export const UrbanistLightItalic = "UrbanistLightItalic";
export const UrbanistMediumItalic = "UrbanistMediumItalic";
export const UrbanistSemiBoldItalic = "UrbanistSemiBoldItalic";
export const UrbanistThin = "UrbanistThin";
export const UrbanistThinItalic = "UrbanistThinItalic";
export const OutfitRegular = "Outfit-Regular";
export const OutfitBold = "Outfit-Bold";
export const OutfitLight = "Outfit-Light";
export const OutfitSemiBold = "Outfit-SemiBold";
// FONT WEIGHT
export const FONT_WEIGHT_THIN = "300";
export const FONT_WEIGHT_REGULAR = "400";
export const FONT_WEIGHT_MEDIUM = "500";
export const FONT_WEIGHT_SEMI_BOLD = "600";
export const FONT_WEIGHT_BOLD = "700";

// FONT SIZE
export const FONT_SIZE_12 = scaleFont(12);
export const FONT_SIZE_14 = scaleFont(14);
export const FONT_SIZE_16 = scaleFont(16);
export const FONT_SIZE_17 = scaleFont(17);
export const FONT_SIZE_18 = scaleFont(18);
export const FONT_SIZE_20 = scaleFont(20);
export const FONT_SIZE_24 = scaleFont(24);
export const FONT_SIZE_32 = scaleFont(32);
export const FONT_SIZE_40 = scaleFont(40);

// LINE HEIGHT
export const LINE_HEIGHT_19_2 = scaleFont(19.2);
export const LINE_HEIGHT_22_4 = scaleFont(22.4);
export const LINE_HEIGHT_25_6 = scaleFont(25.6);
export const LINE_HEIGHT_26 = scaleFont(26);
export const LINE_HEIGHT_29 = scaleFont(29);
export const LINE_HEIGHT_32 = scaleFont(32);
export const LINE_HEIGHT_38_5 = scaleFont(38.5);
export const LINE_HEIGHT_51 = scaleFont(51);
export const LINE_HEIGHT_64 = scaleFont(64);

export const FONT_: TextStyle = {
  fontFamily: Urbanist,
  fontWeight: FONT_WEIGHT_REGULAR,
};

export const FONT_BOLD: TextStyle = {
  fontFamily: UrbanistBold,
  fontWeight: FONT_WEIGHT_BOLD,
};

export const FONT_MEDIUM: TextStyle = {
  fontFamily: UrbanistMedium,
  fontWeight: FONT_WEIGHT_MEDIUM,
};

export const transparent = {
  lightColor: Colors.transparent,
  darkColor: Colors.transparent,
};

export const textNormal = {
  lightColor: Colors.white,
  darkColor: Colors.white,
};

export const whiteColor = {
  lightColor: Colors.white,
  darkColor: Colors.white,
};
