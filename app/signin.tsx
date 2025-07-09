import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import * as Yup from 'yup';
import Button from '../components/Button';

export default function SignInScreen() {
  const router = useRouter();
  const [useEmail, setUseEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

const validationSchema = Yup.object().shape({
  email: Yup.string().when('useEmail', (useEmail, schema) =>
    useEmail ? schema.email('Invalid email').required('Required') : schema.notRequired()
  ),
  phone: Yup.string().when('useEmail', (useEmail, schema) =>
    !useEmail
      ? schema
          .matches(/^[0-9]{9}$/, 'Must be 9 digits')
          .required('Required')
      : schema.notRequired()
  ),
  password: Yup.string().required('Password is required'),
});


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in{'\n'}your account</Text>

      <Text style={styles.description}>
        Experience the world at your fingertips with{'\n'} our social mobile app!
      </Text>

      <Formik
        initialValues={{ email: '', phone: '', password: '', useEmail }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Submitted values:', values);
          router.push('/welcome'); 
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            {/* Email / Phone */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>{useEmail ? 'Email' : 'Phone'}</Text>
              <View style={styles.inputContainer}>
                <Image
                  source={
                    useEmail
                      ? require('../assets/images/email.png')
                      : require('../assets/images/phoneicon.png')
                  }
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder={useEmail ? 'example@email.com' : '555123456'}
                  placeholderTextColor="#AAAAAA"
                  keyboardType={useEmail ? 'email-address' : 'phone-pad'}
                  onChangeText={handleChange(useEmail ? 'email' : 'phone')}
                  onBlur={handleBlur(useEmail ? 'email' : 'phone')}
                  value={useEmail ? values.email : values.phone}
                />
              </View>
              {useEmail && touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              {!useEmail && touched.phone && errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}

              <TouchableOpacity
                onPress={() => {
                  const nextUseEmail = !useEmail;
                  setUseEmail(nextUseEmail);
                  setFieldValue('useEmail', nextUseEmail);
                }}
              >
                <Text style={styles.switchText}>
                  {useEmail ? 'Login with Email' : 'Login with Phone'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Password */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Image
                  source={require('../assets/images/eyeicon.png')}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="********"
                  placeholderTextColor="#AAAAAA"
                  secureTextEntry={!showPassword}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Image
                    source={require('../assets/images/eyeicon.png')}
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <Button text="Sign In" onPress={handleSubmit} />
          </>
        )}
      </Formik>

      {/* Social */}
      <View style={styles.socialRow}>
        <Text style={styles.socialText}>Or sign in with</Text>
        <View style={styles.iconsRow}>
          <TouchableOpacity style={styles.iconWrapper}>
            <Image
              source={require('../assets/images/google.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Image
              source={require('../assets/images/facebook.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Image
              source={require('../assets/images/apple.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.haveacc}>
        Don't have an account?{' '}
        <Text style={styles.haveaccHighlight}>Sign In</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  title: {
    color: '#0A0B2E',
    fontSize: 30,
    fontWeight: '400',
    fontFamily: 'Noto Sans Georgian',
    marginBottom: 38,
    marginTop: 89,
  },
  description: {
    color: '#AAAAAA',
    fontSize: 14,
    marginBottom: 40,
    fontFamily: 'Noto Sans Georgian',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#0A0B2E',
    marginBottom: 6,
    fontFamily: 'Noto Sans Georgian',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: '#F9F9F9',
  },
  inputIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#0A0B2E',
    fontSize: 14,
    fontFamily: 'Noto Sans Georgian',
  },
  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: '#AAAAAA',
  },
  switchText: {
    marginTop: 6,
    fontSize: 13,
    color: '#125BE4',
    fontFamily: 'Noto Sans Georgian',
  },
  errorText: {
    fontSize: 12,
    color: '#FF4D4F',
    marginTop: 4,
    fontFamily: 'Noto Sans Georgian',
  },
  haveacc: {
    color: '#AAAAAA',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Noto Sans Georgian',
    textAlign: 'center',
    marginTop: 33,
    marginBottom: 26,
  },
  haveaccHighlight: {
    color: '#125BE4',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Noto Sans Georgian',
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  socialText: {
    fontSize: 14,
    color: '#AAAAAA',
    fontFamily: 'Noto Sans Georgian',
  },
  iconsRow: {
    flexDirection: 'row',
  },
  iconWrapper: {
    marginHorizontal: 10,
  },
  icon: {
    width: 45,
    height: 38,
    resizeMode: 'contain',
  },
});
