// src/components/Events.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function Events({ events }) {
  return (
    <View style={styles.container}>
      {events.map((event, index) => (
        <Text key={index} style={styles.text}>
          {event}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
});