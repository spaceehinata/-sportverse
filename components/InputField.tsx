import React from 'react';
import { Image, StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

const warningIcon = require('../assets/images/war.png');

interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  iconOnPress?: () => void;
  error?: string;
  touched?: boolean;
  leftElement?: React.ReactNode;
  inputStyle?: object;
}

export default function InputField({
  label,
  placeholder,
  placeholderTextColor,
  icon,
  iconOnPress,
  error,
  touched,
  leftElement,
  value,
  onChangeText,
  onBlur,
  secureTextEntry,
  keyboardType,
  editable = true,
  inputStyle,
  ...props
}: InputFieldProps) {
  const showError = error && touched;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.inputWrapper, showError && styles.errorBorder]}>
        {leftElement && <View style={styles.leftElement}>{leftElement}</View>}

        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          editable={editable}
          {...props}
        />

        {icon && (
          <TouchableOpacity onPress={iconOnPress} style={styles.iconWrapper}>
            <Image source={icon} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>

      {showError && (
        <View style={styles.errorWrapper}>
          <Image source={warningIcon} style={styles.warningIcon} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: '#000',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#AAAAAA',
    position: 'relative',
  },
  leftElement: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 35,
    fontSize: 16,
    color: '#AAAAAA',
  },
  iconWrapper: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  errorBorder: {
    borderColor: '#F04646',
  },
  errorWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
    gap: 6,
  },
  warningIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginTop: 4,
  },
  errorText: {
    color: '#F04646',
    fontSize: 10,
    marginTop: 6,
  },
});
