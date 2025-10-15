import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext';

export default function ExitConfirmationScreen() {
  const navigation = useNavigation();
  const { language } = useLanguage();

  const title = language === 'en' ? 'Exit Game' : 'Έξοδος Παιχνιδιού';
  const message = language === 'en'
    ? 'Are you sure you want to quit to the main menu?'
    : 'Είσαι σίγουρος ότι θέλεις να βγεις στο κύριο μενού;';
  const yes = language === 'en' ? 'Yes' : 'Ναι';
  const no = language === 'en' ? 'No' : 'Όχι';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.cancel]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>{no}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.confirm]}
          onPress={() => navigation.navigate('MainMenu')}
        >
          <Text style={styles.buttonText}>{yes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff9ec',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  message: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#444',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancel: {
    backgroundColor: '#ccc',
  },
  confirm: {
    backgroundColor: '#e07a5f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
