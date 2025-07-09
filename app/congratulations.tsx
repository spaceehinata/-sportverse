import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from '../components/Button';

export default function CongratulationScreen() {
  const router = useRouter();

  const handlePress = () => {
    router.push('/welcome');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topContent}>
        <Image
          source={require("../assets/images/cong.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title2}>Congratulation</Text>

          <Text style={styles.description}>
            Your account is reedy to use. You will be redirected to the home page in a few seconds
          </Text>
        <View style={styles.buttonWrapper}>
          <Button text="Back to Home" onPress={handlePress} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  topContent: {
    backgroundColor: '#681818',
    width: 335,
    height: 460,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  image: {
    width: 130,
    height: 119,
    resizeMode: "contain",
    alignSelf: 'center',
  },
  title2: {
    color: '#263238',
    fontSize: 25,
    fontWeight: '700',
    fontFamily: 'Gilroy',
    marginBottom: 21,
    marginTop: 50,
    textAlign: 'center',
  },
  buttonWrapper: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 28,
  },
  description: {
    color: '#AAAAAA',
    fontSize: 14,
    marginBottom: 23,
    fontFamily: 'Poppins',
    marginTop: 21,
    textAlign: 'center',
  },
});
