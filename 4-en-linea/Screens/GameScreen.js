import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Button, Text, Vibration } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { getSocket } from '../services/socket.js';
import socket from '../services/socket';
import contactService from '../services/contacts.js'


const ROWS = 6;
const COLS = 7;

const ConnectFour = ({route}) => {
  const navigation = useNavigation();
  
  const [board, setBoard] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [roomId, setRoomId] = useState(null)
  const [jugador1, setJugador1] = useState(null)
  const [jugador2, setJugador2] = useState(null)
  
  // useEffect(()=>{
  //   const { roomId } = route.params


  // setRoomId(roomId)


  //   //socket.emit('setRoomId',roomParamsId)

  //   socket.on('playerJoined',(jugador)=>{
  //     if(!jugador1){
  //       setJugador1(jugador)
  //     }else{
  //       setJugador2(jugador)
  //     }
  //   })

  //   socket.on('movimiento', (data)=>{
  //     const {updatedBoard, nextPlayer} = data
  //    // updatedBoard[validateRow][col] = currentPlayer;
  //     setBoard(updatedBoard);
  //     setCurrentPlayer(nextPlayer);
  //   })



  //   return()=>{
  //     socket.off('movimiento')
  //   }

  // },[route.params])

  useEffect(() => {
    const { roomId } = route.params;
    setRoomId(roomId);
  
    socket.on('playerJoined', ({ jugador1, jugador2 }) => {
      if (jugador1) {
        setJugador1(jugador1);
      }
      if (jugador2) {
        setJugador2(jugador2);
      }
    });
  
    socket.on('movimiento', (data) => {
      const { updatedBoard, nextPlayer } = data;
      setBoard(updatedBoard);
      setCurrentPlayer(nextPlayer);
    });

 
  
    return () => {
      socket.off('movimiento');
    };
  }, [route.params]);

  const handlePress = (row, col) => {


    let validateRow = findValidateRow(col);
    if (validateRow == null) {
      return;
    }

    const updatedBoard = [...board];
     updatedBoard[validateRow][col] = currentPlayer;
    Vibration.vibrate(50)
    //setBoard(updatedBoard);
    const nextPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    socket.emit('movimiento', {roomId, updatedBoard, nextPlayer})
    console.log('jugador1: ', jugador1)
    console.log('jugador2: ', jugador2)

  };

  const findValidateRow = (col) => {
    for (let i = ROWS - 1; i >= 0; i--) {
      if (board[i][col] === null) {
        return i;
      }
    }
    return null;
  };

  // const handleReset = () => {
  //   setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
  //   setCurrentPlayer('red');
  //   setWinner(null);
  //   setGameOver(false);
  // };



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
        contactService.addPoint(jugador1.payload.id)
        console.log("ID desde game", jugador1.payload.id)
        navigation.replace('GameOverScreen', { winner: 'Ganador Jugador 1', roomId });
      } else if (checkForWinner(board, 'yellow')) {
        setWinner('Ganador Jugador 2');
        setGameOver(true);
        contactService.addPoint(jugador2.payload.id)
        console.log("ID desde game", jugador1.payload.id)
        navigation.replace('GameOverScreen', { winner: 'Ganador Jugador 2', roomId });
      } else if (boardFull(board)) {
        setWinner('Empate');
        setGameOver(true);
        navigation.replace('GameOverScreen', { winner: 'Empate', roomId });
      }
    };

    checkGameOver();
  }, [board, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {currentPlayer === 'red' ? `Turno jugador 1 (${jugador1})` : `Turno jugador 2 (${jugador2})`}
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