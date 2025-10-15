import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LanguageContext } from '../context/LanguageContext';
import translations from '../context/translations';

export default function LanguageScreen({ navigation }) {
  const { language, changeLanguage } = useContext(LanguageContext);
  const t = translations[language];

  const handleSelect = async (lang) => {
    await changeLanguage(lang);
    navigation.goBack(); // Επιστρέφει στο προηγούμενο screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.selectLanguage}</Text>

      <TouchableOpacity
        style={[styles.button, language === 'en' && styles.selectedButton]}
        onPress={() => handleSelect('en')}
      >
        <Text style={styles.buttonText}>English</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, language === 'gr' && styles.selectedButton]}
        onPress={() => handleSelect('gr')}
      >
        <Text style={styles.buttonText}>Ελληνικά</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#660099',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4B0082',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: '#00f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
