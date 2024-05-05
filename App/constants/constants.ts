import { Platform } from "react-native";

export const StorageKey = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  UN_FIRST_OPEN: "UN_FIRST_OPEN",
  PACKAGES: "PACKAGES",
};

export const ResponseStatus = {
  SUCCESS: 200,
  VALIDATE_FAIL: 422,
  ERROR: 423,
  UNAUTHORIZED: 401,
  TOO_MANY_REQUEST: 429,
  MAINTENANCE_MODE: 503,
};
export const genderOption = [
  { label: "Male", value: 1 },
  { label: "Female", value: 2 },
];
export const productSkus = Platform.select({
  android: ["capsure_test_month_n"],
  ios: [""],
});

export const defaultAge = 18;

export const packageAppoinment = [
  { name: "Messaging", price: 20 },
  { name: "Voice Call", price: 40 },
  { name: "Video Call", price: 60 },
]