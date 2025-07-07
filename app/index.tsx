import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import SplashScreen from './splashScreen';
import WelcomeScreen from './welcome';

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleFinish = () => {
    setShowSplash(false);
  };

  useEffect(() => {
    if (!showSplash) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [showSplash]);

  if (showSplash) {
    return <SplashScreen onFinish={handleFinish} />;
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <WelcomeScreen /> 
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1E28',
  },
});
