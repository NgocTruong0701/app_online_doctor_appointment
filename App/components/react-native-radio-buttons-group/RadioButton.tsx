import React from 'react';
import { PixelRatio, Pressable, StyleSheet, Text, View } from 'react-native';
import { RadioButtonProps } from './types';

export default function RadioButton({
  accessibilityLabel,
  borderColor,
  borderSize = 2,
  color = '#444',
  containerStyle,
  description,
  descriptionStyle,
  disabled = false,
  id,
  label,
  labelStyle,
  layout = 'row',
  onPress,
  selected = false,
  size = 24,
  testID,
  item
}: RadioButtonProps) {
  const borderWidth = PixelRatio.roundToNearestPixel(3);
  const sizeHalf = PixelRatio.roundToNearestPixel(size * 0.6);
  const sizeFull = PixelRatio.roundToNearestPixel(size);

  function handlePress() {
    if (onPress) {
      onPress(item, id);
    }
  }

  const labelComp = React.isValidElement(label) ? (
    label
  ) : Boolean(label) ? (
    <Text style={[styles.label, labelStyle]}>{label}</Text>
  ) : null;

  const descComp = React.isValidElement(description) ? (
    description
  ) : Boolean(description) ? (
    <Text style={[styles.description, descriptionStyle]}>{description}</Text>
  ) : null;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.content}>
        {descComp}
        {labelComp}
      </View>
      <Pressable
        accessibilityHint={typeof description === "string" ? description : undefined}
        accessibilityLabel={accessibilityLabel || (typeof label === "string" ? label : undefined)}
        accessibilityRole="radio"
        accessibilityState={{ checked: selected, disabled }}
        disabled={disabled}
        onPress={handlePress}
        style={[
          styles.radioButtonContainer,
          { opacity: disabled ? 0.2 : 1 },
        ]}
        testID={testID}
      >
        <View
          style={[
            styles.radioButtonBorder,
            {
              borderColor: '#0165FC',
              borderWidth,
              width: sizeFull,
              height: sizeFull,
              borderRadius: sizeHalf,
            },
          ]}
        >
          {selected && (
            <View
              style={{
                backgroundColor: '#0165FC',
                width: sizeHalf,
                height: sizeHalf,
                borderRadius: sizeHalf,
              }}
            />
          )}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 25,
    padding: 10,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 16,
  },
  description: {
    fontSize: 12,
    color: 'gray',
  },
  radioButtonContainer: {
    padding: 10,
  },
  radioButtonBorder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});