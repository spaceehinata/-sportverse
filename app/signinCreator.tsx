import { useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CountryPicker, { Country } from "react-native-country-picker-modal";
import * as Yup from "yup";
import Button from "../components/Button";
import InputField from "../components/InputField";

const phoneIcon = require("../assets/images/phoneicon.png");
const emailIcon = require("../assets/images/email.png");
const eyeIcon = require("../assets/images/eyeicon.png");
const eyeOffIcon = require("../assets/images/eyeicon.png");
const lockIcon = require("../assets/images/lockicon.png");

export default function SignInScreen() {
  const router = useRouter();
  const [useEmail, setUseEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState<Country["cca2"]>("GE");
  const [callingCode, setCallingCode] = useState("995");
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const SignInSchema = Yup.object().shape({
    email: Yup.string().when("useEmail", {
      is: true,
      then: (schema) => schema.email("Invalid email").required("Required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    phone: Yup.string().when("useEmail", {
      is: false,
      then: (schema) =>
        schema
          .matches(/^[0-9]{6,}$/, "Must be at least 6 digits")
          .required("Required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    password: Yup.string().required("Password is required"),
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Image
              source={require("../assets/images/bg.png")}
              style={styles.bg}
            />
            <View style={styles.contentWrapper}>
              <Text style={styles.title}>
                Sign in content{"\n"}creator account
              </Text>
              <Text style={styles.description}>
                Experience the world at your fingertips with our social mobile
                app!
              </Text>

              <Formik
                initialValues={{ email: "", phone: "", password: "", useEmail }}
                validationSchema={SignInSchema}
                onSubmit={(values) => {
                  const fullPhone = `+${callingCode} ${values.phone}`;
                  console.log("Submitted:", {
                    ...values,
                    phone: fullPhone,
                    countryCode,
                  });
                  router.push("/homepage");
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
                    <View>
                      {!useEmail ? (
                        <InputField
                          label="Phone"
                          placeholder="555 555001"
                          placeholderTextColor="#AAAAAA"
                          icon={phoneIcon}
                          onChangeText={(text: string) => {
                            const onlyNums = text.replace(/[^\d]/g, "");
                            setFieldValue("phone", onlyNums);
                          }}
                          onBlur={handleBlur("phone")}
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
                          onChangeText={handleChange("email")}
                          onBlur={handleBlur("email")}
                          value={values.email}
                          error={errors.email}
                          touched={touched.email}
                        />
                      )}

                      <Text
                        onPress={() => {
                          setUseEmail((prev) => !prev);
                          setFieldValue("useEmail", !useEmail);
                        }}
                        style={styles.switchToggle}
                      >
                        {useEmail
                          ? "Sign Up with Phone"
                          : "Sign Up with Email "}
                      </Text>
                    </View>

                    {showCountryPicker && (
                      <CountryPicker
                        countryCode={countryCode}
                        withCallingCode
                        withFilter
                        withFlag
                        withEmoji={false}
                        withModal
                        onSelect={(country) => {
                          setCountryCode(country.cca2);
                          setCallingCode(country.callingCode[0]);
                          setShowCountryPicker(false);
                        }}
                        onClose={() => setShowCountryPicker(false)}
                        visible={showCountryPicker}
                      />
                    )}

                    <InputField
                      label="Password"
                      placeholder="********"
                      placeholderTextColor="#AAAAAA"
                      icon={showPassword ? eyeOffIcon : eyeIcon}
                      secureTextEntry={!showPassword}
                      iconOnPress={() => setShowPassword((prev) => !prev)}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      touched={touched.password}
                      error={errors.password}
                    />

                    <TouchableOpacity onPress={() => router.push("/forgot")}>
                      <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <Button text="Sign In" onPress={handleSubmit} />

                    <Text style={styles.haveacc}>
                      do not have an account?{" "}
                      <Text style={styles.haveaccHighlight}>Sign Up</Text>
                    </Text>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  switchToggle: {
    color: "#AAAAAA",
    fontSize: 14,
    position: "absolute",
    right: 0,
    top: 0,
  },
  bg: {
    position: "absolute",
    width: "100%",
    height: 280,
    top: 0,
    left: 0,
    resizeMode: "cover",
  },
  contentWrapper: {
    marginTop: 260,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: "#0A0B2E",
    fontWeight: "400",
    fontFamily: "Noto Sans Georgian",
    marginBottom: 5,
    marginTop: 40,
  },
  description: {
    fontSize: 14,
    color: "#AAAAAA",
    marginBottom: 17,
    fontFamily: "Noto Sans Georgian",
  },
  switchText: {
    fontSize: 13,
    color: "#125BE4",
    fontFamily: "Noto Sans Georgian",
  },
  forgotText: {
    fontSize: 13,
    color: "#aaa",
    marginVertical: 16,
    fontFamily: "Noto Sans Georgian",
  },
  haveacc: {
    fontSize: 14,
    color: "#AAAAAA",
    textAlign: "center",
    marginTop: 25,
    marginBottom: 30,
    fontFamily: "Noto Sans Georgian",
  },
  haveaccHighlight: {
    color: "#125BE4",
    fontFamily: "Noto Sans Georgian",
  },
  countryCodeWrapper: {
    paddingRight: 12,
  },
  countryCodeText: {
    fontSize: 16,
    color: "#AAAAAA",
    paddingRight: 12,
  },
});
