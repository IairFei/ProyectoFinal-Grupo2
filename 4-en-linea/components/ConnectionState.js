// src/components/ConnectionState.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function ConnectionState({ isConnected }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isConnected ? 'Connected' : 'Disconnected'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});