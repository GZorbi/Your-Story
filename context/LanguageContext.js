import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLang = await AsyncStorage.getItem('appLanguage');
      if (storedLang) setLanguage(storedLang);
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (lang) => {
    setLanguage(lang);
    await AsyncStorage.setItem('appLanguage', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ✅ Αυτό είναι που χρειάζεσαι για να δουλέψει το useLanguage()
export const useLanguage = () => React.useContext(LanguageContext);
