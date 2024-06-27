// src/components/MyForm.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import socket from '../services/socket';

export function MyForm() {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    socket.emit('foo', input);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter something"
        value={input}
        onChangeText={setInput}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});