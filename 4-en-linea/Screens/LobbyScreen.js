import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import fondo from "../assets/fondo.jpg";
import socket from "../services/socket.js";

export default function LobbyScreen() {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');
  const navigation = useNavigation();

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      socket.emit('joinLobby'); // Unirse al lobby cuando se conecta
    }

    function onDisconnect() {
      setIsConnected(false);
      setRooms([]); // Limpiar la lista de salas al desconectar
    }

    function onUpdateRooms(updatedRooms) {
      setRooms(updatedRooms);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('updateRooms', onUpdateRooms);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('updateRooms', onUpdateRooms);
    };
  }, []);

  const createRoom = () => {
    if (newRoomName.trim() !== '') {
      socket.emit('createRoom', newRoomName);
      setNewRoomName('');
    } else {
      Alert.alert('Error', 'El nombre de la sala no puede estar vacío');
    }
  };

  const joinRoom = (roomName) => {
    socket.emit("joinRoom", roomName);
    navigation.replace("GameScreen", { roomName });
  };

  return (
    <ImageBackground source={fondo} style={styles.background}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido al Juego</Text>
        <View style={styles.scrollContainer}>
          <Text style={styles.subtitle}>Salas disponibles</Text>
          {rooms.map((roomName) => (
            <TouchableOpacity
              key={roomName}
              style={styles.roomButton}
              onPress={() => joinRoom(roomName)}
            >
              <Text style={styles.roomText}>{roomName}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={createRoom}>
            <Text style={styles.buttonText}>Crear sala</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 10,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
  },
  subtitle: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 5,
    borderRadius: 10,
  },
  roomButton: {
    backgroundColor: "#4682B4",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  roomText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});