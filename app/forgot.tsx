import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
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
import * as Yup from 'yup';
import Button from '../components/Button';
import InputField from '../components/InputField';

export default function ForgotScreen() {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  const handleBackAgain = () => {
    router.back();
  };

  const emailIcon = require('../assets/images/email.png');

  const ForgotSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.topContent}>
            <View style={styles.headerRow}>
              <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                <Text style={styles.backButtonText}>{'<'}</Text>
              </TouchableOpacity>

              <Text style={styles.title}>Forgot Password</Text>

              <View style={styles.invisiblePlaceholder} />
            </View>

            <Text style={styles.description}>
              Enter the email associated with your account {'\n'}
              and we’ll send an email with instructions to {'\n'}
              reset your password.
            </Text>

            <Formik
              initialValues={{ email: '' }}
              validationSchema={ForgotSchema}
              onSubmit={(values) => {
                console.log('Submitting email:', values.email);
                router.push('/reset');
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched
              }) => (
                <>
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
                    keyboardType="email-address"
                  />

                  <View style={styles.buttonWrapper}>
                    <Button text="Send" onPress={handleSubmit} />
                  </View>
                </>
              )}
            </Formik>
          </View>

          <TouchableOpacity style={styles.backAgainWrapper} onPress={handleBackAgain}>
            <Text style={styles.backAgainText}>Back to again</Text>
          </TouchableOpacity>
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
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  topContent: {
    flex: 1,
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
    fontFamily: 'Gilroy',
  },
  description: {
    color: '#AAAAAA',
    fontSize: 14,
    marginBottom: 96,
    fontFamily: 'Gilroy',
    marginTop: 127,
  },
  buttonWrapper: {
    marginTop: 20,
  },
  backAgainWrapper: {
    alignItems: 'center',
  },
  backAgainText: {
    color: '#125BE4',
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
  },
});
