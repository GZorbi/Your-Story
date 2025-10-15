import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { prompts } from '../data/prompts';
import { useLanguage } from '../context/LanguageContext';

export default function OptionsScreen() {
  const navigation = useNavigation();
  const { language } = useLanguage();
  const langPrompts = prompts[language] || {};
  const categoryList = Object.keys(langPrompts);

  const [selectedCategory, setSelectedCategory] = useState(
    categoryList.length > 0 ? categoryList[0] : ''
  );
  const [selectedPlayers, setSelectedPlayers] = useState(2);
  const [selectedRounds, setSelectedRounds] = useState(5);

  // Early return if no categories are defined
  if (!categoryList.length) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>
          {language === 'en'
            ? 'No categories found. Please check your prompts file.'
            : 'Δεν βρέθηκαν κατηγορίες. Έλεγξε το αρχείο prompts.'}
        </Text>
      </View>
    );
  }

  const handleStartGame = () => {
    const promptsInCategory = langPrompts[selectedCategory] || [];
    const randomPrompt =
      promptsInCategory[
        Math.floor(Math.random() * promptsInCategory.length)
      ];
    const totalTurns = selectedPlayers * selectedRounds;

    navigation.navigate('Game', {
      prompt: randomPrompt,
      players: selectedPlayers,
      rounds: selectedRounds,
      totalTurns,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>
          {language === 'en' ? '← Back' : '← Επιστροφή'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.label}>
        {language === 'en' ? 'Select a category:' : 'Επιλογή κατηγορίας:'}
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
        >
          {categoryList.map((category) => (
            <Picker.Item
              key={category}
              label={category.charAt(0).toUpperCase() + category.slice(1)}
              value={category}
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>
        {language === 'en' ? 'Number of Players:' : 'Αριθμός Παικτών:'}
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedPlayers}
          onValueChange={(value) => setSelectedPlayers(value)}
          style={styles.picker}
        >
          {[2, 3, 4, 5, 6].map((num) => (
            <Picker.Item key={num} label={String(num)} value={num} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>
        {language === 'en' ? 'Rounds per Player:' : 'Γύροι ανά Παίκτη:'}
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedRounds}
          onValueChange={(value) => setSelectedRounds(value)}
          style={styles.picker}
        >
          {[5, 10, 15].map((num) => (
            <Picker.Item key={num} label={String(num)} value={num} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleStartGame}>
        <Text style={styles.buttonText}>
          {language === 'en' ? 'Start Game' : 'Έναρξη Παιχνιδιού'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9ec',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    color: '#444',
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#444',
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#e07a5f',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
