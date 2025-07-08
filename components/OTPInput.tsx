import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

type OTPInputProps = {
  length?: number;
  isError?: boolean;
  onCodeFilled?: (code: string) => void;
};

const warningIcon = require('../assets/images/war.png');

export default function OTPInput({
  length = 5,
  isError = false,
  onCodeFilled,
}: OTPInputProps) {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<Array<TextInput | null>>([]);
  
  useEffect(() => {
    // თუ ყველა შევსებულია, ვატყობინებ ზემოთ
    if (code.every((c) => c !== '')) {
      onCodeFilled?.(code.join(''));
      Keyboard.dismiss();
    }
  }, [code, onCodeFilled]);

  const onChangeText = (text: string, index: number) => {
    if (!text) {
      // თუ წავშალეთ, ერთ წინ მივდივარ
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
      return;
    }

    if (/^\d$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);
      // შემდეგ ფოკუსზე გადავდივარ
      if (index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      } else {
        inputsRef.current[index]?.blur();
      }
    }
  };

  const onKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '') {
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputsRow}>
        {Array.from({ length }).map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputsRef.current[index] = ref)}
            style={[
              styles.input,
              isError && styles.inputError,
            ]}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => onChangeText(text, index)}
            onKeyPress={(e) => onKeyPress(e, index)}
            value={code[index]}
            returnKeyType="done"
            textAlign="center"
          />
        ))}
      </View>
      {isError && (
        <View style={styles.errorWrapper}>
          <Image source={warningIcon} style={styles.warningIcon} />
          <Text style={styles.errorText}>Verification Code is not valid</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    width: 30,
    height: 40,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 6,
    marginHorizontal: 7.5, // 15 დაშორება ჯამში ორ ინფუთს შორის
    fontSize: 18,
    color: '#000',
  },
  inputError: {
    borderColor: '#F04646',
  },
  errorWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  warningIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    resizeMode: 'contain',
  },
  errorText: {
    color: '#F04646',
    fontSize: 13,
    fontFamily: 'Noto Sans Georgian',
  },
});
