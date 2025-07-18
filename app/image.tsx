import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LastPageCamera = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Camera permission is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Gallery permission is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Box */}
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>Congratulation</Text>
        <Text style={styles.headerDescription}>
          Your account is ready to use. Tell us more about you and help us
          better prepare content for you
        </Text>
      </View>

      <Text style={styles.subTitle}>Set Profile Image</Text>

      <View style={styles.imageWrapper}>
        <View style={styles.imageBorderLeft} />
        <View style={styles.imageBorderRight} />
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require("../assets/images/shape.png")
          }
          style={styles.image}
        />
      </View>

      <TouchableOpacity style={styles.outlineButton} onPress={openCamera}>
        <Text style={styles.outlineButtonText}>Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.outlineButton} onPress={openGallery}>
        <Text style={styles.outlineButtonText}>Upload</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => alert("Save pressed")}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.skipText}>skip for now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LastPageCamera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 55,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headerBox: {
    backgroundColor: "#fff",
    borderRadius: 30,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 50,
    elevation: 10,
    width: "100%",
  },
  headerTitle: {
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 20,
    color: "#263238",
    marginBottom: 12,
    textAlign: "center",
  },
  headerDescription: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 12,
    color: "#AAAAAA",
    textAlign: "center",
  },
  subTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 24,
    color: "#000",
  },
  imageWrapper: {
    position: "relative",
    marginBottom: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 181,
    height: 166,
    borderRadius: 20,
    backgroundColor: "#c0c0c0",
    resizeMode: "cover",
  },
  imageBorderLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 15,
    height: 120,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#2946FF",
    borderBottomLeftRadius: 20,
  },
  imageBorderRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 15,
    height: 120,
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderColor: "#666666",
    borderTopRightRadius: 20,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#263238",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginBottom: 16,
    width: 201,
    alignItems: "center",
  },
  outlineButtonText: {
    color: "#263238",
    fontWeight: "600",
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: "#263238",
    paddingVertical: 14,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 92,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  skipText: {
    color: "#BBBBBB",
    fontSize: 14,
    fontWeight: "500",
  },
});
