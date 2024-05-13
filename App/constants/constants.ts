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
  { label: "Choose gender", value: 0 },
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

export const appointmentStatus = {
  UPCOMING: 'upcoming',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
}

export const packageIcons = [
  { id: 1, name: 'Messaging', icon: 'chatbubble-ellipses' },
  { id: 2, name: 'Voice Call', icon: 'call' },
  { id: 3, name: 'Video Call', icon: 'videocam' },
]

export const durations = [
  { id: 1, label: '30 minutes', duration: 0.5, value: 1 },
  { id: 2, label: '1 hour', duration: 1, value: 2 },
  { id: 3, label: '2 hours', duration: 2, value: 3 },
]

export const roles = [
  { id: 1, name: 'patient' },
  { id: 2, name: 'doctor' },
];

export const defaultAvatar = 'https://doctor-appointment-bucket.s3.ap-southeast-1.amazonaws.com/avatar/avatar-default-svgrepo-com.svg';