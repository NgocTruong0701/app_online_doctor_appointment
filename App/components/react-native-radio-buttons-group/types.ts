import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type RadioButtonProps = {
  accessibilityLabel?: string;
  borderColor?: string;
  borderSize?: number;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
  description?: ReactNode | string;
  descriptionStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  id: string;
  key?: string;
  label?: ReactNode | string;
  labelStyle?: StyleProp<TextStyle>;
  layout?: 'row' | 'column';
  onPress?: (item: any, id: string) => void;
  selected?: boolean;
  size?: number;
  testID?: string;
  value?: any;
  item?: any;
};

export type RadioGroupProps = {
  accessibilityLabel?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  layout?: 'row' | 'column';
  onPress?: (item: any, selectedId: string) => void;
  radioButtons: RadioButtonProps[];
  selectedId?: string;
  testID?: string;
};
