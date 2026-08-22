import React, { useState, useEffect } from 'react';
import { Text, TextProps } from 'react-native';
import { Storage } from '@/utils/Storage';
import { useAppContext } from '@/context/AppContext';

interface TranslatedTextProps extends TextProps {
  children: string;
}

// In-memory cache to prevent redundant reads during the same session
const memCache: Record<string, string> = {};

export function TranslatedText({ children, ...props }: TranslatedTextProps) {
  const { language } = useAppContext();
  const [translatedText, setTranslatedText] = useState(children);

  useEffect(() => {
    // If language is English, just use the original text
    if (language === 'en') {
      setTranslatedText(children);
      return;
    }

    let isMounted = true;

    const translate = async () => {
      if (!children) return;
      
      const cacheKey = `@trans_${language}_${children}`;
      
      // 1. Check in-memory cache
      if (memCache[cacheKey]) {
        if (isMounted) setTranslatedText(memCache[cacheKey]);
        return;
      }

      // 2. Check async storage cache
      try {
        const storedTranslation = await Storage.getItem(cacheKey);
        if (storedTranslation) {
          memCache[cacheKey] = storedTranslation;
          if (isMounted) setTranslatedText(storedTranslation);
          return;
        }
      } catch (e) {
        // ignore storage errors
      }

      // 3. Fetch from API (MyMemory free API)
      try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(children)}&langpair=en|${language}`);
        const data = await response.json();
        
        if (data && data.responseData && data.responseData.translatedText) {
          let result = data.responseData.translatedText;
          
          // MyMemory sometimes returns matches that contain HTML entities or trailing spaces.
          // Simple cleanup just in case.
          result = result.replace(/&amp;/g, '&');
          
          memCache[cacheKey] = result;
          await Storage.setItem(cacheKey, result);
          
          if (isMounted) setTranslatedText(result);
        }
      } catch (error) {
        console.error("Translation API error", error);
        // Fallback to English if network fails
        if (isMounted) setTranslatedText(children);
      }
    };

    translate();

    return () => {
      isMounted = false;
    };
  }, [children, language]);

  return <Text {...props}>{translatedText}</Text>;
}
