import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  ToastAndroid
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../context/LanguageContext';
import AnimatedButton from '../components/AnimatedButton';

export default function GameOverScreen({ route }) {
  const navigation = useNavigation();
  const { language } = useLanguage();
  const { storyContent } = route.params;
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false); // ΝΕΟ state

  const goToMenu = () => {
    navigation.reset({ index: 0, routes: [{ name: 'MainMenu' }] });
  };

  const handleSave = async () => {
    if (saved || saving) return; // Αν ήδη σώζουμε ή σώθηκε, μην προχωρήσεις ξανά
    setSaving(true); // Ξεκίνα αποθήκευση
    try {
      const existing = await AsyncStorage.getItem('storyHistory');
      const parsed = existing ? JSON.parse(existing) : [];
      const updated = [...parsed, { content: storyContent, date: new Date() }];
      await AsyncStorage.setItem('storyHistory', JSON.stringify(updated));
      setSaved(true);

      if (Platform.OS === 'android') {
        ToastAndroid.show(
          language === 'en' ? 'Story saved to history!' : 'Η ιστορία αποθηκεύτηκε!',
          ToastAndroid.LONG
        );
      } else {
        Alert.alert(
          language === 'en' ? 'Saved!' : 'Αποθηκεύτηκε!',
          language === 'en'
            ? 'Your story has been saved successfully.'
            : 'Η ιστορία σου αποθηκεύτηκε με επιτυχία.'
        );
      }

      setTimeout(() => {
        goToMenu();
      }, 1500);

    } catch (e) {
      console.error('Failed to save story', e);
      Alert.alert(
        language === 'en' ? 'Error' : 'Σφάλμα',
        language === 'en'
          ? 'Could not save the story. Please try again.'
          : 'Δεν ήταν δυνατή η αποθήκευση της ιστορίας. Δοκίμασε ξανά.'
      );
      setSaving(false); // Αν αποτύχει, σταμάτα το "saving"
    }
  };

  const handleBack = () => {
    if (!saving) {
      goToMenu();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>
          {language === 'en' ? 'Your Story is Ready!' : 'Η Ιστορία σου είναι Έτοιμη!'}
        </Text>
        <Text style={styles.story}>{storyContent}</Text>

        {saving ? (
          <Text style={styles.savingText}>
            {language === 'en' ? 'Saving...' : 'Αποθήκευση...'}
          </Text>
        ) : (
          <>
            {!saved && (
              <AnimatedButton
                title={language === 'en' ? 'Save to History' : 'Αποθήκευση στο Ιστορικό'}
                onPress={handleSave}
                style={styles.saveButton}
              />
            )}
            <AnimatedButton
              title={language === 'en' ? 'Back to Menu' : 'Επιστροφή στο Μενού'}
              onPress={handleBack}
              style={styles.backButton}
            />
          </>
        )}
      </ScrollView>

      <Text style={styles.footerTag}>#NoLogicAllowed</Text>
      <Text style={styles.footerText}>GZapps</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9ec'
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 60
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  story: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
    color: '#444'
  },
  savingText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#8b5f44',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#61a5a9',
  },
  backButton: {
    backgroundColor: '#8b5f44',
  },
  footerTag: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#e07a5f',
    fontWeight: 'bold'
  },
  footerText: {
    textAlign: 'center',
    fontSize: 10,
    color: '#999'
  }
});
