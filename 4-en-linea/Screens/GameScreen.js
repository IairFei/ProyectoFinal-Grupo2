import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import fondo from '../assets/fondo.jpg'

const ROWS = 6;
const COLS = 7;

const ConnectFour = () => {
  const [board, setBoard] = useState(Array.from({ length: ROWS },
                                     () => Array(COLS).fill(null)));

  const handlePress = (row, col) => {
    // Lógica para manejar el evento de presión en una celda del tablero
    console.log(`Pressed row: ${row}, col: ${col}`);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={fondo} resizeMode="cover" style={styles.image} >
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <TouchableOpacity
              key={colIndex}
              style={styles.cell}
              onPress={() => handlePress(rowIndex, colIndex)}
            >
              <View style={[styles.disc, cell && styles[cell]]} />
            </TouchableOpacity>
          ))}
        </View>
      ))}
      </ImageBackground>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disc: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  red: {
    backgroundColor: 'red',
  },
  yellow: {
    backgroundColor: 'yellow',
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export default ConnectFour;