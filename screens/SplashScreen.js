import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('MainMenu');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.hashtag, { opacity: fadeAnim }]}>#NoLogicAllowed</Animated.Text>
      <Text style={styles.credit}>Created by GZapps</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9ec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hashtag: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e07a5f',
  },
  credit: {
    position: 'absolute',
    bottom: 20,
    fontSize: 14,
    color: '#aaa',
  },
});
