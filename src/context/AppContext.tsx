import React, { createContext, useContext, useState, useEffect } from 'react';
import { Storage } from '@/utils/Storage';

type AppContextType = {
  userName: string;
  setUserName: (name: string) => Promise<void>;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => Promise<void>;
  language: string;
  setLanguage: (lang: string) => Promise<void>;
  isLoaded: boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserNameState] = useState('Ankur Taneja'); // Default fallback
  const [phoneNumber, setPhoneNumberState] = useState('');
  const [language, setLanguageState] = useState('en');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load persisted state on mount
    const loadState = async () => {
      try {
        const storedName = await Storage.getItem('@user_name');
        const storedPhone = await Storage.getItem('@user_phone');
        const storedLang = await Storage.getItem('@app_language');

        if (storedName) setUserNameState(storedName);
        if (storedPhone) setPhoneNumberState(storedPhone);
        if (storedLang) setLanguageState(storedLang);
      } catch (e) {
        console.error("Failed to load app state from storage", e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadState();
  }, []);

  const setUserName = async (name: string) => {
    setUserNameState(name);
    await Storage.setItem('@user_name', name);
  };

  const setPhoneNumber = async (phone: string) => {
    setPhoneNumberState(phone);
    await Storage.setItem('@user_phone', phone);
  };

  const setLanguage = async (lang: string) => {
    setLanguageState(lang);
    await Storage.setItem('@app_language', lang);
  };

  return (
    <AppContext.Provider value={{
      userName, setUserName,
      phoneNumber, setPhoneNumber,
      language, setLanguage,
      isLoaded
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
