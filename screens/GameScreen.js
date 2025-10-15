// GameScreen.js

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext';
import { prompts } from '../data/prompts';
import AnimatedButton from '../components/AnimatedButton';
import { Snackbar } from 'react-native-paper';

export default function GameScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { language } = useLanguage();

  const {
    prompt: initPrompt = null,
    quickGame = false,
    category = null,
    players: p = 2,
    rounds: r = 5,
    totalTurns: t = p * r,
  } = route.params || {};

  const [currentTurn, setCurrentTurn] = useState(1);
  const [contextSnippet, setContextSnippet] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [fullStory, setFullStory] = useState([]);
  const [startingPrompt, setStartingPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const promptAnim = useRef(new Animated.Value(0)).current;

  // select and initialize prompt
  useEffect(() => {
    let chosen;
    if (initPrompt) {
      chosen = initPrompt;
    } else if (quickGame) {
      const cats = Object.keys(prompts[language]);
      const rndCat = cats[Math.floor(Math.random() * cats.length)];
      const list = prompts[language][rndCat];
      chosen = list[Math.floor(Math.random() * list.length)];
    } else if (category) {
      const list = prompts[language][category] || [];
      if (!list.length) {
        Alert.alert(
          language === 'en' ? 'Error' : 'Σφάλμα',
          language === 'en'
            ? 'No prompts available in this category.'
            : 'Δεν υπάρχουν προτάσεις σε αυτήν την κατηγορία.'
        );
        navigation.goBack();
        return;
      }
      chosen = list[Math.floor(Math.random() * list.length)];
    } else {
      Alert.alert(
        language === 'en' ? 'Config error' : 'Σφάλμα ρύθμισης',
        language === 'en'
          ? 'Missing start parameters.'
          : 'Λείπουν παράμετροι εκκίνησης.'
      );
      navigation.goBack();
      return;
    }
    setStartingPrompt(chosen);
    setFullStory([chosen]);
    setContextSnippet(chosen);
    animatePrompt();
  }, [initPrompt, quickGame, category, language]);

  const animatePrompt = () => {
    promptAnim.setValue(0);
    Animated.timing(promptAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const getLastThree = (txt) => {
    const w = txt.trim().split(/\s+/);
    return w.length <= 3 ? txt : w.slice(-3).join(' ');
  };

  const currentPlayer = ((currentTurn - 1) % p) + 1;
  const currentRound = Math.ceil(currentTurn / p);

  const handleNext = () => {
    const words = currentInput.trim().split(/\s+/);
    if (words.length < 3) {
      Alert.alert(
        '',
        language === 'en'
          ? 'Each sentence must have at least 3 words.'
          : 'Κάθε πρόταση πρέπει να έχει τουλάχιστον 3 λέξεις.'
      );
      return;
    }
    const newStory = [...fullStory, currentInput.trim()];
    setFullStory(newStory);
    setContextSnippet(currentInput.trim());
    setCurrentInput('');
    setSnackbarVisible(true);
    if (currentTurn >= t) {
      navigation.navigate('GameOver', { storyContent: newStory.join(' ') });
    } else {
      setCurrentTurn(currentTurn + 1);
      animatePrompt();
    }
  };

  const handleStop = () => {
    navigation.reset({ index: 0, routes: [{ name: 'MainMenu' }] });
  };

  const showPrompt =
    currentTurn === 1 ? startingPrompt : getLastThree(contextSnippet);

  const progress = currentTurn / t;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      {/* progress bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressFill, { flex: progress }]} />
        <View style={[styles.progressEmpty, { flex: 1 - progress }]} />
      </View>

      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleStop} style={styles.stopBtn}>
          <Text style={styles.stopText}>
            {language === 'en' ? 'Exit' : 'Έξοδος'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.turnInfo}>
          {language === 'en'
            ? `Player ${currentPlayer}/${p} — Round ${currentRound}/${r}`
            : `Παίκτης ${currentPlayer}/${p} — Γύρος ${currentRound}/${r}`}
        </Text>

        {!quickGame && (
          <Text style={styles.categoryLabel}>
            {language === 'en'
              ? `Category: ${category}`
              : `Κατηγορία: ${category}`}
          </Text>
        )}

        <Text style={styles.ruleText}>
          {language === 'en'
            ? 'Each sentence must be at least 3 words (aim ~15).' 
            : 'Κάθε πρόταση τουλάχιστον 3 λέξεις (ιδανικά γύρω στις 15).'}
        </Text>

        <Animated.Text
          style={[
            styles.promptText,
            { opacity: promptAnim, transform: [{ scale: promptAnim }] },
          ]}
        >
          {showPrompt}
        </Animated.Text>

        <TextInput
          style={[styles.input, isFocused && styles.inputFocused]}
          placeholder={
            language === 'en'
              ? 'Type your sentence...'
              : 'Πληκτρολόγησε την πρότασή σου...'
          }
          placeholderTextColor="#666"
          value={currentInput}
          onChangeText={setCurrentInput}
          multiline
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <AnimatedButton
          title={language === 'en' ? 'Submit' : 'Υποβολή'}
          onPress={handleNext}
          style={[
            styles.nextBtn,
            currentInput.trim().split(/\s+/).length < 3 && styles.nextBtnDisabled,
          ]}
          disabled={currentInput.trim().split(/\s+/).length < 3}
        />
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        duration={1200}
        onDismiss={() => setSnackbarVisible(false)}
      >
        {language === 'en' ? 'Turn recorded!' : 'Καταγράφηκε turn!'}
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff9ec' },
  progressContainer: {
    flexDirection: 'row',
    height: 6,
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginHorizontal: 20,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: { backgroundColor: '#5c1 a72' },
  progressEmpty: { backgroundColor: '#e0dcd4' },
  topBar: { flexDirection: 'row', justifyContent: 'flex-end', padding: 16 },
  stopBtn: { padding: 6 },
  stopText: { fontSize: 18, color: '#cc3300', fontWeight: 'bold' },
  content: { padding: 24, paddingBottom: 120 },
  turnInfo: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#5c1a72',
    marginBottom: 12,
    textShadowColor: '#0003',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  categoryLabel: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#8b5f44',
    marginBottom: 12,
  },
  ruleText: {
    textAlign: 'center',
    fontSize: 15,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 22,
  },
  promptText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
    color: '#333',
    marginBottom: 24,
    textShadowColor: '#0002',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
  },
  input: {
    borderWidth: 2,
    borderColor: '#5c1a72',
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#fff',
    minHeight: 100,
    marginBottom: 24,
    shadowColor: '#0003',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  inputFocused: { borderColor: '#e07a5f' },
  nextBtn: { backgroundColor: '#5c1a72', paddingVertical: 14, borderRadius: 10 },
  nextBtnDisabled: { backgroundColor: '#999' },
});
