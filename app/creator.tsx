import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import * as Yup from 'yup';

const warningIcon = require('../assets/images/war.png');
const personIcon = require('../assets/images/usericon.png');
const phoneIcon = require('../assets/images/phoneicon.png');
const calendarIcon = require('../assets/images/calendaricon.png');
const eyeIcon = require('../assets/images/eyeicon.png');
const eyeOffIcon = require('../assets/images/eyeicon.png');
const lockIcon = require('../assets/images/lockicon.png');
const emailIcon = require('../assets/images/email.png');
const linkIcon = require('../assets/images/link.png');

import InputField from '@/components/InputField';

const SignUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .matches(/^[ა-ჰa-zA-Z\s]+$/, 'Full Name is not correct')
    .required('Full Name is required'),
  email: Yup.string().email('Email address is not valid').required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{6,}$/, 'Phone number is not valid')
    .required('Phone is required'),
  birthday: Yup.string().required('Birthday is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Required'),
  instagram: Yup.string().url('Must be a valid URL').nullable(),
  facebook: Yup.string().url('Must be a valid URL').nullable(),
  countryOfResidence: Yup.string().required('Country is required'),
});

export default function SignUp() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryCode, setCountryCode] = useState<Country['cca2']>('GE');
  const [callingCode, setCallingCode] = useState('995');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [useEmail, setUseEmail] = useState(false);

  const formatBirthdayInput = (text: string) => {
    const cleaned = text.replace(/[^\d]/g, '');
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.slice(0, 2) + '/';
      if (cleaned.length > 4) {
        formatted += cleaned.slice(2, 4) + '/';
        formatted += cleaned.slice(4, 8);
      } else {
        formatted += cleaned.slice(2);
      }
    }
    return formatted;
  };

  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        phone: '',
        birthday: '',
        password: '',
        confirmPassword: '',
        useEmail: false,
        instagram: '',
        facebook: '',
        countryOfResidence: '',
      }}
      validationSchema={SignUpSchema}
      onSubmit={(values) => {
        console.log({
          ...values,
          phone: `+${callingCode} ${values.phone}`,
          countryCode,
        });
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
              <InputField
                label="Full Name"
                placeholder="Clifton Simmons"
                placeholderTextColor="#AAAAAA"
                icon={personIcon}
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
                error={errors.fullName}
                touched={touched.fullName}
              />

              <View style={styles.inputWithSwitchWrapper}>
                {!useEmail ? (
                  <InputField
                    label="Phone"
                    placeholder="555 555001"
                    placeholderTextColor="#AAAAAA"
                    icon={phoneIcon}
                    onChangeText={(text: string) => {
                      const onlyNums = text.replace(/[^\d]/g, '');
                      setFieldValue('phone', onlyNums);
                    }}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    error={errors.phone}
                    touched={touched.phone}
                    leftElement={
                      <TouchableOpacity
                        onPress={() => setShowCountryPicker(true)}
                        style={styles.countryCodeWrapper}
                      >
                        <Text style={styles.countryCodeText}>
                          {countryCode} +{callingCode}
                        </Text>
                      </TouchableOpacity>
                    }
                    keyboardType="phone-pad"
                  />
                ) : (
                  <InputField
                    label="Email"
                    placeholder="example@email.com"
                    placeholderTextColor="#AAAAAA"
                    icon={emailIcon}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    error={errors.email}
                    touched={touched.email}
                  />
                )}

                <Text
                  onPress={() => {
                    setUseEmail((prev) => !prev);
                    setFieldValue('useEmail', !useEmail);
                  }}
                  style={styles.switchToggle}
                >
                  {useEmail ? 'Sign Up with Phone' : 'Sign Up with Email '}
                </Text>
              </View>

              {showCountryPicker && (
                <CountryPicker
                  countryCode={countryCode}
                  withCallingCode={false}
                  withFlag={true}
                  withFilter
                  withModal
                  withEmoji
                  onSelect={(country: Country) => {
                    setCountryCode(country.cca2);
                    setShowCountryPicker(false);
                    setFieldValue(
                      'countryOfResidence',
                      typeof country.name === 'object' && 'common' in country.name
                        ? country.name.common
                        : (country.name as string)
                    );
                  }}
                  onClose={() => setShowCountryPicker(false)}
                  visible={showCountryPicker}
                />
              )}

              <InputField
                label="Birthday"
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#AAAAAA"
                icon={calendarIcon}
                value={values.birthday}
                onChangeText={(text: string) => {
                  const formatted = formatBirthdayInput(text);
                  setFieldValue('birthday', formatted);
                }}
                onBlur={handleBlur('birthday')}
                editable={true}
                error={errors.birthday}
                touched={touched.birthday}
                iconOnPress={() => setShowDatePicker(true)}
                keyboardType="numeric"
              />

              {showDatePicker && (
                <DateTimePicker
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  value={new Date()}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      const formattedDate = selectedDate.toLocaleDateString('en-GB');
                      setFieldValue('birthday', formattedDate);
                    }
                  }}
                />
              )}

              <InputField
                label="Password"
                placeholder="********"
                placeholderTextColor="#AAAAAA"
                icon={showPassword ? eyeOffIcon : eyeIcon}
                secureTextEntry={!showPassword}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={errors.password}
                touched={touched.password}
                iconOnPress={() => setShowPassword((prev) => !prev)}
              />

              <InputField
                label="Confirm Password"
                placeholder="********"
                placeholderTextColor="#AAAAAA"
                icon={showConfirmPassword ? eyeOffIcon : lockIcon}
                secureTextEntry={!showConfirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                iconOnPress={() => setShowConfirmPassword((prev) => !prev)}
              />

              <InputField
                label="Instagram Account"
                placeholder="https://www.instagram.com/"
                placeholderTextColor="#AAAAAA"
                icon={linkIcon}
                onChangeText={handleChange('instagram')}
                onBlur={handleBlur('instagram')}
                value={values.instagram}
                error={errors.instagram}
                touched={touched.instagram}
              />

              <InputField
                label="Facebook Account"
                placeholder="https://www.facebook.com/"
                placeholderTextColor="#AAAAAA"
                icon={linkIcon}
                onChangeText={handleChange('facebook')}
                onBlur={handleBlur('facebook')}
                value={values.facebook}
                error={errors.facebook}
                touched={touched.facebook}
              />

              <TouchableOpacity
                onPress={() => setShowCountryPicker(true)}
                style={{ marginTop: 20 }}
              >
                <InputField
                  label="Country of Residence"
                  placeholder="Select your country"
                  placeholderTextColor="#AAAAAA"
                  value={values.countryOfResidence}
                  editable={false}
                  pointerEvents="none"
                  error={errors.countryOfResidence}
                  touched={touched.countryOfResidence}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  inputWithSwitchWrapper: {
    marginBottom: 20,
  },
  switchToggle: {
    color: '#AAAAAA',
    fontSize: 14,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#AAAAAA',
    paddingRight: 12,
  },
  countryCodeWrapper: {
    paddingRight: 12,
  },
});