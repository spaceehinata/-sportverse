import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
    Image,
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

const lockIcon = require('../assets/images/lockicon.png');
const eyeIcon = require('../assets/images/eyeicon.png');
const eyeOffIcon = require('../assets/images/eyeicon.png');

const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirm Password is required'),
});
// const { width: screenWidth } = Dimensions.get("window");

// const DESIGN_WIDTH = 330;
// const DESIGN_HEIGHT = 306.45;
// const calculatedHeight = (DESIGN_HEIGHT / DESIGN_WIDTH) * screenWidth;
export default function CreatePasswordScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

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
              <Text style={styles.title}>Create Password</Text>

              <View style={styles.invisiblePlaceholder} />
            </View>
            <Image
              source={require("../assets/images/newpass.png")}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.title2}>
              Create your {'\n'}
              New password </Text>
            <Formik
              initialValues={{ password: '', confirmPassword: '' }}
              validationSchema={PasswordSchema}
              onSubmit={(values) => {
                console.log('Password set:', values.password);
                router.push('/congratulations');
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
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
                    iconOnPress={() => setShowPassword(!showPassword)}
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
                    iconOnPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />

                  <View style={styles.buttonWrapper}>
                    <Button text="Verify" onPress={handleSubmit} />
                  </View>
                </>
              )}
            </Formik>
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
  buttonWrapper: {
    marginTop: 20,
  },
    title2: {
        color: '#263238',
        fontSize: 30,
        fontWeight: '700',
        fontFamily: 'Gilroy',
        marginBottom: 25,
        marginTop: 33,
    },
  image: {
    width: 330,
    height: 306,
    resizeMode: "contain",
    // marginTop: ,
  }, 
});
