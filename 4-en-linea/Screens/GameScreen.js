import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ROWS = 6;
const COLS = 7;

const ConnectFour = () => {
  const navigation = useNavigation();
  const [board, setBoard] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const handlePress = (row, col) => {
    if (gameOver) return;
    let validateRow = findValidateRow(col);
    if (validateRow == null) return;

    const updatedBoard = [...board];
    updatedBoard[validateRow][col] = currentPlayer;
    setBoard(updatedBoard);
    setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
  };

  const findValidateRow = (col) => {
    for (let i = ROWS - 1; i >= 0; i--) {
      if (board[i][col] === null) {
        return i;
      }
    }
    return null;
  };

  const handleReset = () => {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
    setCurrentPlayer('red');
    setWinner(null);
    setGameOver(false);
  };

  useEffect(() => {
    const checkForWinner = (board, player) => {
      // Check horizontal
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col <= COLS - 4; col++) {
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
      // Check vertical
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
      // Check diagonal (bottom-left to top-right)
      for (let row = 3; row < ROWS; row++) {
        for (let col = 0; col <= COLS - 4; col++) {
          if (
            board[row][col] === player &&
            board[row - 1][col + 1] === player &&
            board[row - 2][col + 2] === player &&
            board[row - 3][col + 3] === player
          ) {
            return true;
          }
        }
      }
      // Check diagonal (top-left to bottom-right)
      for (let row = 0; row <= ROWS - 4; row++) {
        for (let col = 0; col <= COLS - 4; col++) {
          if (
            board[row][col] === player &&
            board[row + 1][col + 1] === player &&
            board[row + 2][col + 2] === player &&
            board[row + 3][col + 3] === player
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
            return false;
          }
        }
      }
      return true;
    };

    const checkGameOver = () => {
      if (checkForWinner(board, 'red')) {
        setWinner('Ganador Jugador 1');
        setGameOver(true);
        navigation.replace('GameOverScreen', { winner: 'Ganador Jugador 1' });
      } else if (checkForWinner(board, 'yellow')) {
        setWinner('Ganador Jugador 2');
        setGameOver(true);
        navigation.replace('GameOverScreen', { winner: 'Ganador Jugador 2' });
      } else if (boardFull(board)) {
        setWinner('Empate');
        setGameOver(true);
        navigation.replace('GameOverScreen', { winner: 'Empate' });
      }
    };

    checkGameOver();
  }, [board, navigation]);

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
