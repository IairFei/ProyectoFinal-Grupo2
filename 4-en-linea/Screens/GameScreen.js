import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Button, Text } from 'react-native';

const ROWS = 6;
const COLS = 7;

const ConnectFour = () => {
  const [board, setBoard] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const handlePress = (row, col) => {
    if (!gameOver) {
      const updatedBoard = [...board];
      updatedBoard[row][col] = currentPlayer;
      setBoard(updatedBoard);
      setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
    }
  };

  const handleReset = () => {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
    setCurrentPlayer('red');
    setWinner(null);
    setGameOver(false);
  };

  // Efecto para verificar ganador después de cada jugada
  React.useEffect(() => {
    const checkForWinner = (board, player) => {
      // Implementa la lógica para verificar ganador aquí
      // Ejemplo simplificado para horizontal y vertical:
      for (let col = 0; col <= COLS - 4; col++) {
        for (let row = 0; row < ROWS; row++) {
          if (
            board[row][col] === player &&
            board[row][col + 1] === player &&
            board[row][col + 2] === player &&
            board[row][col + 3] === player
          ) {
            return true;
          }
        }
      }
      for (let col = 0; col < COLS; col++) {
        for (let row = 0; row <= ROWS - 4; row++) {
          if (
            board[row][col] === player &&
            board[row + 1][col] === player &&
            board[row + 2][col] === player &&
            board[row + 3][col] === player
          ) {
            return true;
          }
        }
      }
      return false;
    };

    const boardFull = (board) => {
      for (let col = 0; col < COLS; col++) {
        for (let row = 0; row < ROWS; row++) {
          if (board[row][col] === null) {
            return false; // Todavía hay espacio vacío
          }
        }
      }
      return true; // El tablero está lleno
    };

    const checkGameOver = () => {
      if (checkForWinner(board, 'red')) {
        setWinner('Jugador 1');
        setGameOver(true);
      } else if (checkForWinner(board, 'yellow')) {
        setWinner('Jugador 2');
        setGameOver(true);
      } else if (boardFull(board)) {
        setWinner('Empate');
        setGameOver(true);
      }
    };

    checkGameOver();
  }, [board]); // Se ejecuta después de cada cambio en el tablero

  return (
    <View style={styles.container}>
      {!gameOver ? (
        <View>
          <Text style={styles.text}>
            {currentPlayer === 'red' ? 'Jugador 1' : 'Jugador 2'}
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
        </View>
      ) : (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>{winner}</Text>
          <Button title="Reiniciar Juego" onPress={handleReset} />
        </View>
      )}
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
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 30,
    marginBottom: 20,
  },
});

export default ConnectFour;
