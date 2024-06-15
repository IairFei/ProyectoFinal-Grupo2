
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Button, Text } from 'react-native';
import fondo from '../assets/fondo.jpg'

const ROWS = 6;
const COLS = 7;

const ConnectFour = () => {
  const [board, setBoard] = useState(Array.from({ length: ROWS },
                                    () => Array(COLS).fill(null)));
  
const [currentPlayer, setCurrentPlayer] = useState('red')

  const handlePress = (row, col) => {
  
  const updatedBoard = [...board];
  updatedBoard[row][col] = currentPlayer; 
  setBoard(updatedBoard);
  console.log(`Pressed row: ${row}, col: ${col}`);
 setCurrentPlayer(currentPlayer == 'red'? 'yellow' : 'red')
}

const handleReset = () =>{
  setBoard(Array.from({ length: ROWS },
    () => Array(COLS).fill(null)))
   setCurrentPlayer('red') 
}

 return (
    <View style={styles.container}>
        <Text style={styles.text}>
        {
            currentPlayer == 'red' ? "Jugador 1" : "Jugador 2"
        } 
        </Text>
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
      <Button title='Reiniciar' onPress={handleReset} />
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
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});

export default ConnectFour;



