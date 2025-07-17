import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Sportverse</Text>
      </View>

      <Text style={styles.welcome}>Welcome to Sportverse</Text>
      <Text style={styles.description}>
        In this app you can find out sport universe
      </Text>

      <TouchableOpacity style={styles.button}
      onPress={() => router.push('/signin')}>
        
        <Text style={styles.signinText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.signup]}
      onPress={() => router.push('/FavoriteSportsScreen')}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

    <Text style={styles.haveacc}>
    Already have an account?{' '}
    <Text style={styles.haveaccHighlight}>Sign Up</Text>
    </Text>
      <Text style={styles.footer}>REGISTER AS CONTENT CREATOR</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1E28',
    paddingHorizontal: 24,
    justifyContent: 'flex-start',
  },
  header: {
    marginTop: 143,
    marginHorizontal: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 174,
    height: 165.42,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '500',
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  welcome: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Noto Sans Georgian',
    marginBottom: 20,
    marginTop: 89,
  },
  description: {
    color: '#AAAAAA',
    fontSize: 14,
    marginBottom: 20,
    fontFamily: 'Poppins',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 11,
    marginBottom: 16,
    alignItems: 'center',
  },
  signup: {
    backgroundColor: '#125BE4',
  },
  signinText: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 16,
    fontFamily: 'Noto Sans Georgian',
  },
  signupText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Noto Sans Georgian',
  },
  footer: {
    marginTop: 47,
    color: '#D2C9C9',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Noto Sans Georgian',
    textAlign: 'center',
  },
haveacc: {
  color: '#888888',
  fontSize: 14,
  fontWeight: '500',
  fontFamily: 'Noto Sans Georgian',
  textAlign: 'center',
  marginTop: 15,
},
haveaccHighlight: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '500',
  fontFamily: 'Noto Sans Georgian',
},

});
