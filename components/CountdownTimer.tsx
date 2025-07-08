// CountdownTimer.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CountdownTimer() {
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    if (secondsLeft === 0) return;

    const interval = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutesStr}:${secondsStr}`;
  };

  return (
    <View style={styles.container}>
        <Text style={styles.timerText}>{formatTime(secondsLeft)} {' '}
            <Text style={styles.sce}>sce left</Text>
        </Text>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    
  },
  timerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#125BE4',
  },
  sce: {
    fontSize: 14,
    fontWeight: '500',
    color: '#BBBBBB',
  },
});
