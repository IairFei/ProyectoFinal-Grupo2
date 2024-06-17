
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Button, Text, Alert } from 'react-native';
import fondo from '../assets/fondo.jpg'
import { useNavigation } from "@react-navigation/native"

//const navigation = useNavigation();

const ROWS = 6;
const COLS = 7;

const ConnectFour = () => {
  const [board, setBoard] = useState(Array.from({ length: ROWS },
                                    () => Array(COLS).fill(null)));
  
const [currentPlayer, setCurrentPlayer] = useState('red')

  const handlePress = (col) => {
 
    let validateRow = ValidateRow( col);
   
    if (validateRow === null) {
      return;
    }
  const updatedBoard = [...board];
  updatedBoard[validateRow][col] = currentPlayer; 
  setBoard(updatedBoard);
  //console.log(`Pressed row: ${row}, col: ${col}`);

  if (ganador(updatedBoard, validateRow, col, currentPlayer)) { 
    Alert.alert("",`Ganó el ${currentPlayer == 'red' ? 'Jugador 1' : 'Jugador 2'}`,[
      {
        text: 'Ir a Home',
        //onPress: ()=>{navigation.replace('PantallaHome');}
      },
      {
        text: 'Reiniciar',
        onPress: handleReset,
      }
    ])
    return;
  }

  setCurrentPlayer(currentPlayer == 'red'? 'yellow' : 'red')
}

const ValidateRow = (col) => {
  for (let i = ROWS - 1; i >= 0; i--) {
    if (board[i][col] === null) {
      return i;
    }
  }
  return null; 
};

const ganador = (board, row, col, player) => {
  return (
    direccion(board, row, col, player, 0, 1) || 
    direccion(board, row, col, player, 1, 0) || 
    direccion(board, row, col, player, 1, 1) || 
    direccion(board, row, col, player, 1, -1)   
  );
};

const direccion = (board, row, col, player, rowDireccion, colDireccion) => {
  let count = 0; 
  for (let i = -3; i <= 3; i++) {
    const newRow = row + i * rowDireccion; 
    const newCol = col + i * colDireccion; 

    if ((newRow >= 0 && newRow < ROWS) && 
      (newCol >= 0 && newCol < COLS) && 
      board[newRow][newCol] === player) {
      count++; 
      if (count === 4) { 
        return true; 
      }
    } else {
      count = 0; 
    }
  }
  return false;
};


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
              onPress={() => handlePress(colIndex)}
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



