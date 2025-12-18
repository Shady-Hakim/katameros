import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useFontSize } from '../../context/FontSizeContext';

const FloatingFontSizeButtons = () => {
  const { increaseFontSize, decreaseFontSize, canIncrease, canDecrease } =
    useFontSize();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, !canIncrease && styles.buttonDisabled]}
        onPress={increaseFontSize}
        disabled={!canIncrease}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, !canDecrease && styles.buttonDisabled]}
        onPress={decreaseFontSize}
        disabled={!canDecrease}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    left: 20,
    gap: 10,
    zIndex: 1000,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4c2710',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#a08070',
    opacity: 0.5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default FloatingFontSizeButtons;
