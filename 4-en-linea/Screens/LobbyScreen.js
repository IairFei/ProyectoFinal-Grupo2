import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import fondo from "../assets/fondo.jpg";
import roomService from "../services/rooms";
//import { conecctSocket, getSocket, disconnectSocket } from "../services/socket";
import socket from "../services/socket";

export default function LobbyScreen() {
  const [rooms, setRooms] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [socketId, setSocketId] = useState();

  const navigation = useNavigation();
  //const socket = conecctSocket()

  useEffect(() => {
    roomService
      .getRooms()
      .then((response) => {
        // Accede a payload y verifica si es un array
        if (response.status === "success" && Array.isArray(response.payload)) {
          setRooms(response.payload);
        } else {
          console.error(
            "Expected an array in payload but got:",
            typeof response.payload
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });

    socket.on("connect", () => setIsConnected(true));

    socket.on("actualizarSalas", (data) => {
      setRooms((prevRooms) => [...prevRooms, data]);

    });

    return () => {
      socket.off("actualizarSalas");
    };
  }, []);


  const createRoom = useCallback(async () => {
    try {
      const newRoom = await roomService.createRoom();
      socket.emit("actualizarSalas", newRoom);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  }, [socket]);

  const joinRoom = (roomId) => {
    socket.emit("joinRoom", roomId);
    navigation.replace("GameScreen", { roomId });
  };

  return (
    <ImageBackground source={fondo} style={styles.background}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido al Juego</Text>
        <Text style={styles.subtitle}>Salas disponibles</Text>
        <View style={styles.scrollContainer}>
          <ScrollView>
            {rooms.map((room, index) => (
              <TouchableOpacity
                key={index}
                style={styles.roomButton}
                onPress={() => joinRoom(room.room_id)}
              >
                <Text style={styles.roomText}>{room.room_id}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
  input: {
    height: 50,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
  },
  roomText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
