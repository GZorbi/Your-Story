import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LanguageContext } from '../context/LanguageContext';
import translations from '../context/translations';

const InstructionsScreen = () => {
  const navigation = useNavigation();
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{t.instructionsTitle}</Text>

        <Text style={styles.text}>{t.instructions1}</Text>
        <Text style={styles.text}>{t.instructions2}</Text>
        <Text style={styles.text}>{t.instructions3}</Text>
        <Text style={styles.text}>{t.instructions4}</Text>
        <Text style={styles.text}>{t.instructions5}</Text>

        <Text style={styles.hashtag}>{t.noLogic}</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainMenu')}>
          <Text style={styles.buttonText}>{t.backToMenu}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default InstructionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9ec',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#444',
  },
  hashtag: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#555',
    marginTop: 20,
  },
  button: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: '#e07a5f',
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
