// src/components/ConnectionManager.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import socket from '../services/socket';

export function ConnectionManager() {
  const connect = () => {
    socket.connect();
  };

  const disconnect = () => {
    socket.disconnect();
  };

  return (
    <View style={styles.container}>
      <Button title="Connect" onPress={connect} />
      <Button title="Disconnect" onPress={disconnect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});