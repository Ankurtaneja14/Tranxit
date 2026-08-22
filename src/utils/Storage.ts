import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// In-memory fallback for environments where native AsyncStorage fails
const memoryStore: Record<string, string> = {};
let useMemoryFallback = false;

export const Storage = {
  getItem: async (key: string): Promise<string | null> => {
    if (useMemoryFallback) return memoryStore[key] || null;
    try {
      return await AsyncStorage.getItem(key);
    } catch (e: any) {
      if (e.message && e.message.includes('Native module is null')) {
        console.warn('AsyncStorage native module is null. Falling back to in-memory storage.');
        useMemoryFallback = true;
        return memoryStore[key] || null;
      }
      return null;
    }
  },
  
  setItem: async (key: string, value: string): Promise<void> => {
    if (useMemoryFallback) {
      memoryStore[key] = value;
      return;
    }
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e: any) {
      if (e.message && e.message.includes('Native module is null')) {
        useMemoryFallback = true;
        memoryStore[key] = value;
      }
    }
  },
  
  removeItem: async (key: string): Promise<void> => {
    if (useMemoryFallback) {
      delete memoryStore[key];
      return;
    }
    try {
      await AsyncStorage.removeItem(key);
    } catch (e: any) {
      if (e.message && e.message.includes('Native module is null')) {
        useMemoryFallback = true;
        delete memoryStore[key];
      }
    }
  }
};
