import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Button, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {conecctSocket, getSocket, disconnectSocket} from '../services/socket'

const ROWS = 6;
const COLS = 7;

const ConnectFour = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { roomName } = route.params;

  const [board, setBoard] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = conecctSocket();

    socketRef.current.emit('joinRoom', roomName);

    socketRef.current.on('updateBoard', (updatedBoard) => {
      setBoard(updatedBoard.board);
      setCurrentPlayer(updatedBoard.currentPlayer);
    });

    return () => {
      socketRef.current.emit('leaveRoom', roomName);
      disconnectSocket();
    };
  }, [roomName]);

  const handlePress = (row, col) => {
    let validateRow = findValidateRow(col);
    if (validateRow == null) {
      return;
    }
    const updatedBoard = [...board];
    updatedBoard[validateRow][col] = currentPlayer;
    setBoard(updatedBoard);
    const nextPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    socketRef.current.emit('updateBoard', { roomName, board: updatedBoard, currentPlayer: nextPlayer });
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
    const newBoard = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    setBoard(newBoard);
    setCurrentPlayer('red');
    setWinner(null);
    setGameOver(false);
    socketRef.current.emit('updateBoard', { roomName, board: newBoard, currentPlayer: 'red' });
  };

  useEffect(() => {
    const checkForWinner = (board, player) => {
      // Implementación de checkForWinner
    };

    const boardFull = (board) => {
      // Implementación de boardFull
    };

    const checkGameOver = () => {
      checkForWinner(board, 'red');
      checkForWinner(board, 'yellow');
      boardFull(board);
    };

    checkGameOver();
  }, [board, navigation]);

  const getCurrentPlayerName = () => {
    return currentPlayer === 'red' ? `Turno jugador 1 (${jugador1.payload.name})` : `Turno jugador 2 (${jugador2.payload.name})`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {currentPlayer === 'red' ? "Turno Jugador 1 (Rojo)" : "Turno Jugador 2 (Amarillo)"}
      </Text>
      <View style={styles.board}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <TouchableOpacity
                key={colIndex}
                style={styles.cell}
                onPress={() => handlePress(rowIndex, colIndex)}
                disabled={cell !== null || gameOver}
              >
                <View style={[styles.disc, cell && styles[cell]]} />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      <Button title="Reiniciar" onPress={handleReset} color="#841584" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C34',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  board: {
    backgroundColor: '#1e1e1e',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 50,
    height: 50,
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
});

export default ConnectFour;