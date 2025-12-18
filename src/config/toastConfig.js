import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const toastConfig = {
  success: (props) => (
    <View style={[styles.toastContainer, styles.successToast]}>
      <Text style={styles.toastText}>{props.text1}</Text>
      {props.text2 ? (
        <Text style={styles.toastSubText}>{props.text2}</Text>
      ) : null}
    </View>
  ),
  error: (props) => (
    <View style={[styles.toastContainer, styles.errorToast]}>
      <Text style={styles.toastText}>{props.text1}</Text>
      {props.text2 ? (
        <Text style={styles.toastSubText}>{props.text2}</Text>
      ) : null}
    </View>
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
    padding: 15,
    position: 'absolute',
    bottom: 30,
    alignItems: 'flex-start',
  },
  successToast: {
    backgroundColor: '#4caf50',
  },
  errorToast: {
    backgroundColor: '#f44336',
  },
  toastText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toastSubText: {
    color: '#ffffff',
    fontSize: 14,
  },
});
