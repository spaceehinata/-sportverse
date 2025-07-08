import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Button from '../components/Button';
import CountdownTimer from '../components/CountdownTimer';
import OTPInput from '../components/OTPInput';

export default function VerificationScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [isCodeInvalid, setIsCodeInvalid] = useState(false);

  const handleCodeFilled = (enteredCode: string) => {
    setCode(enteredCode);
    setIsCodeInvalid(enteredCode !== '12345');
  };

  const handleVerifyPress = () => {
    if (code === '12345') {
      router.push('/forgot');
    } else {
      setIsCodeInvalid(true);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          
        <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Verification</Text>

        <View style={styles.invisiblePlaceholder} />
        </View>


          <Text style={styles.description}>
            Please enter the verification code we sent {'\n'} to your email ex***@gmail.com
          </Text>

          <OTPInput length={5} isError={isCodeInvalid} onCodeFilled={handleCodeFilled} />
          <CountdownTimer />

          <Text style={styles.haveacc}>
            Not yet get?{' '}
            <Text style={styles.haveaccHighlight}>Resend OTP</Text>
          </Text>

          <View style={styles.buttonWrapper}>
            <Button text="Verify" onPress={handleVerifyPress} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingBottom: 40,
  },
headerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 20,
  position: 'relative',
},

backButton: {
  width: 35,
  height: 35,
  borderWidth: 1,
  borderColor: '#DDDDDD',
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
},
backButtonText: {
  fontSize: 10,
  color: '#AAAAAA',
},
invisiblePlaceholder: {
  width: 35, 
},

title: {
  position: 'absolute',
  left: 0,
  right: 0,
  textAlign: 'center',
  color: '#263238',
  fontSize: 18,
  fontWeight: '700',
  fontFamily: 'Noto Sans Georgian',
},
  description: {
    color: '#AAAAAA',
    fontSize: 14,
    marginBottom: 20,
    fontFamily: 'Poppins',
    marginTop: 127,
  },
  haveacc: {
    color: '#AAAAAA',
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Noto Sans Georgian',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  haveaccHighlight: {
    color: '#125BE4',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Noto Sans Georgian',
  },
  buttonWrapper: {
    marginBottom: 20,
  },
});
