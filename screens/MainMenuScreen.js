import React from 'react';
import { View, Text, StyleSheet, Image, Alert, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext';
import AnimatedButton from '../components/AnimatedButton';

export default function MainMenuScreen() {
  const navigation = useNavigation();
  const { language } = useLanguage();

  const t = {
    quickGame: language === 'en' ? 'Quick Game' : 'Γρήγορο Παιχνίδι',
    newGame: language === 'en' ? 'New Game' : 'Νέο Παιχνίδι',
    history: language === 'en' ? 'Story History' : 'Ιστορικό Ιστοριών',
    instructions: language === 'en' ? 'Instructions' : 'Οδηγίες',
    language: language === 'en' ? 'Language' : 'Γλώσσα',
    exit: language === 'en' ? 'Exit' : 'Έξοδος',
  };

  const handleExitPress = () => {
    Alert.alert(
      language === 'en' ? 'Exit App' : 'Έξοδος από την Εφαρμογή',
      language === 'en'
        ? 'Are you sure you want to exit the app?'
        : 'Είσαι σίγουρος ότι θέλεις να κλείσεις την εφαρμογή;',
      [
        {
          text: language === 'en' ? 'No' : 'Όχι',
          style: 'cancel',
        },
        {
          text: language === 'en' ? 'Yes' : 'Ναι',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/menu_logo_clean.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.hashtag}>#NoLogicAllowed</Text>

      <AnimatedButton
        title={t.quickGame}
        onPress={() => navigation.navigate('Game', { quickGame: true })}
        style={styles.button}
      />
      <AnimatedButton
        title={t.newGame}
        onPress={() => navigation.navigate('Options')}
        style={styles.button}
      />
      <AnimatedButton
        title={t.history}
        onPress={() => navigation.navigate('StoryHistory')}
        style={styles.button}
      />
      <AnimatedButton
        title={t.instructions}
        onPress={() => navigation.navigate('Instructions')}
        style={styles.button}
      />
      <AnimatedButton
        title={t.language}
        onPress={() => navigation.navigate('Language')}
        style={styles.button}
      />
      <AnimatedButton
        title={t.exit}
        onPress={handleExitPress}
        style={styles.button}
      />

      <Text style={styles.gapps}>GZapps</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9ec',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo: {
    width: 200,
    height: 120,
    marginBottom: 10,
  },
  hashtag: {
    fontSize: 16,
    color: '#ff7744',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    marginBottom: 15,
    backgroundColor: '#5c1a72',
    width: '80%',
  },
  gapps: {
    fontSize: 12,
    color: '#c0a16b',
    marginTop: 30,
    textAlign: 'center',
  },
});
