import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import TermsCheckbox from "../components/TermsCheckbox";
import UserAcc from "../components/userAcc";
export default function SignUpScreen() {
  const router = useRouter();

  const handlePress = () => {
    router.push("/verification");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create{"\n"}your account</Text>

      <Text style={styles.description}>
        Experience the world at your fingertips with{"\n"} our travel mobile
        app!
      </Text>
      <UserAcc />

      <TermsCheckbox />

      <Button text="Sign Up" onPress={handlePress} />

      <View style={styles.socialRow}>
        <Text style={styles.socialText}>Or sign in with</Text>
        <View style={styles.iconsRow}>
          <TouchableOpacity style={styles.iconWrapper}>
            <Image
              source={require("../assets/images/google.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Image
              source={require("../assets/images/facebook.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Image
              source={require("../assets/images/apple.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.haveacc}>
        Already have an account?{" "}
        <Text style={styles.haveaccHighlight}>Sign In</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  title: {
    color: "#0A0B2E",
    fontSize: 30,
    fontWeight: "400",
    fontFamily: "Noto Sans Georgian",
    marginBottom: 38,
    marginTop: 89,
  },
  description: {
    color: "#AAAAAA",
    fontSize: 14,
    marginBottom: 63,
    fontFamily: "Noto Sans Georgian",
  },
  haveacc: {
    color: "#AAAAAA",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Noto Sans Georgian",
    textAlign: "center",
    marginTop: 33,
    marginBottom: 26,
  },
  haveaccHighlight: {
    color: "#125BE4",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Noto Sans Georgian",
  },
  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  socialText: {
    fontSize: 14,
    color: "#AAAAAA",
    fontFamily: "Noto Sans Georgian",
  },
  iconsRow: {
    flexDirection: "row",
  },
  iconWrapper: {
    marginHorizontal: 10,
  },
  icon: {
    width: 45,
    height: 38,
    resizeMode: "contain",
  },
});
