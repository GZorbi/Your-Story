import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '@react-navigation/native';

export default function StoryHistoryScreen() {
  const { language } = useLanguage();
  const navigation = useNavigation();
  const [history, setHistory] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const loadHistory = async () => {
    const data = await AsyncStorage.getItem('storyHistory');
    if (data) setHistory(JSON.parse(data));
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const confirmDeleteStory = (index) => {
    setSelectedIndex(index);
    setShowConfirmModal(true);
  };

  const deleteStory = async () => {
    const newHistory = [...history];
    newHistory.splice(selectedIndex, 1);
    setHistory(newHistory);
    await AsyncStorage.setItem('storyHistory', JSON.stringify(newHistory));
    setShowConfirmModal(false);
    setSelectedIndex(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>
          {language === 'en' ? 'Story History' : 'Ιστορικό Ιστοριών'}
        </Text>
        {history.length === 0 ? (
          <Text style={styles.noStories}>
            {language === 'en' ? 'No stories saved yet.' : 'Δεν υπάρχουν αποθηκευμένες ιστορίες.'}
          </Text>
        ) : (
          history.map((item, index) => (
            <View key={index} style={styles.storyCard}>
              <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
              <Text style={styles.content}>{item.content}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => confirmDeleteStory(index)}
              >
                <Text style={styles.deleteButtonText}>
                  {language === 'en' ? 'Delete' : 'Διαγραφή'}
                </Text>
              </TouchableOpacity>
            </View>
          ))
        )}
        <TouchableOpacity
          style={[styles.deleteButton, { backgroundColor: '#8b5f44', marginTop: 10 }]}
          onPress={() => navigation.navigate('MainMenu')}
        >
          <Text style={styles.deleteButtonText}>
            {language === 'en' ? 'Back to Menu' : 'Επιστροφή στο Μενού'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              {language === 'en'
                ? 'Are you sure you want to delete this story?'
                : 'Είσαι σίγουρος ότι θέλεις να διαγράψεις αυτή την ιστορία;'}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setShowConfirmModal(false)}>
                <Text style={[styles.modalButtonText, { color: '#888' }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteStory}>
                <Text style={[styles.modalButtonText, { color: '#e07a5f' }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9ec',
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  noStories: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  storyCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#e07a5f',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-end',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
});
