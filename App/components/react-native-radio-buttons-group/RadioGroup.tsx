import React from 'react';
import { StyleSheet, View } from 'react-native';

import RadioButton from './RadioButton';
import { RadioGroupProps } from './types';

export default function RadioGroup({
  accessibilityLabel,
  containerStyle,
  labelStyle,
  layout = 'column',
  onPress,
  radioButtons,
  selectedId,
  testID
}: RadioGroupProps) {

  function handlePress(item: any, id: string) {
    if (item !== selectedId) {
      if (onPress) {
        onPress(item, id);
      }
      const button = radioButtons.find(rb => rb.id === item);
      if (button?.onPress) {
        button.onPress(item, id);
      }
    }
  }

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="radiogroup"
      style={[styles.container, { flexDirection: layout }, containerStyle]}
      testID={testID}
    >
      {radioButtons.map((button) => (
        <RadioButton
          {...button}
          key={button.id}
          labelStyle={button.labelStyle || labelStyle}
          selected={button.id === selectedId}
          onPress={handlePress}
        />
      ))}
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  }
});
