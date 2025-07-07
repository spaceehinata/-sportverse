import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface ButtonProps {
  text: string;
  onPress?: () => void;
  backgroundColor?: string;
  width?: string | number;
}

const CustomButton: React.FC<ButtonProps> = ({
  text,
  onPress,
  backgroundColor = '#263238',
  width = '100%',
}) => {
  const getValidWidth = (w: string | number): number | `${number}%` => {
    if (typeof w === 'number') return w;
    if (typeof w === 'string' && w.trim().endsWith('%')) return w as `${number}%`;
    return '100%';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor, width: getValidWidth(width) }]}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
