import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FontSizeContext = createContext();

const FONT_SIZE_KEY = 'appFontSizePreference';

// Font size scales
const FONT_SIZES = {
  extraSmall: {
    title: 16,
    subtitle: 12,
    body: 12,
    heading: 18,
    pageTitle: 14,
  },
  small: {
    title: 18,
    subtitle: 14,
    body: 14,
    heading: 20,
    pageTitle: 16,
  },
  medium: {
    title: 20,
    subtitle: 16,
    body: 16,
    heading: 22,
    pageTitle: 18,
  },
  large: {
    title: 22,
    subtitle: 18,
    body: 18,
    heading: 24,
    pageTitle: 20,
  },
  extraLarge: {
    title: 24,
    subtitle: 20,
    body: 20,
    heading: 26,
    pageTitle: 22,
  },
  extraExtraLarge: {
    title: 26,
    subtitle: 22,
    body: 22,
    heading: 28,
    pageTitle: 24,
  },
};

const SIZES = [
  'extraSmall',
  'small',
  'medium',
  'large',
  'extraLarge',
  'extraExtraLarge',
];

export const FontSizeProvider = ({ children }) => {
  const [currentSizeIndex, setCurrentSizeIndex] = useState(2); // Default to 'medium'
  const [isLoading, setIsLoading] = useState(true);

  // Load saved font size preference on mount
  useEffect(() => {
    const loadFontSizePreference = async () => {
      try {
        const savedIndex = await AsyncStorage.getItem(FONT_SIZE_KEY);
        if (savedIndex !== null) {
          setCurrentSizeIndex(parseInt(savedIndex, 10));
        }
      } catch (error) {
        console.error('Error loading font size preference:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFontSizePreference();
  }, []);

  // Save font size preference whenever it changes
  useEffect(() => {
    if (!isLoading) {
      const saveFontSizePreference = async () => {
        try {
          await AsyncStorage.setItem(
            FONT_SIZE_KEY,
            currentSizeIndex.toString()
          );
        } catch (error) {
          console.error('Error saving font size preference:', error);
        }
      };

      saveFontSizePreference();
    }
  }, [currentSizeIndex, isLoading]);

  const increaseFontSize = () => {
    setCurrentSizeIndex((prev) => Math.min(prev + 1, SIZES.length - 1));
  };

  const decreaseFontSize = () => {
    setCurrentSizeIndex((prev) => Math.max(prev - 1, 0));
  };

  const currentSize = SIZES[currentSizeIndex];
  const fontSizes = FONT_SIZES[currentSize];

  const value = {
    fontSizes,
    increaseFontSize,
    decreaseFontSize,
    canIncrease: currentSizeIndex < SIZES.length - 1,
    canDecrease: currentSizeIndex > 0,
    currentSize,
  };

  return (
    <FontSizeContext.Provider value={value}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error('useFontSize must be used within FontSizeProvider');
  }
  return context;
};
