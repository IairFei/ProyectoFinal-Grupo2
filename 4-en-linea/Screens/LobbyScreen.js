import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import fondo from "../assets/fondo.jpg";
import {conecctSocket, getSocket, disconnectSocket} from '../services/socket'


export default function LobbyScreen() {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState("");
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {

    const socket = conecctSocket()

    function onConnect() {
      console.log("Connected");
      setIsConnected(true);
      socket.emit("joinLobby"); // Unirse al lobby cuando se conecta
    }

    function onDisconnect() {
      console.log("Disconnected")
      setIsConnected(false);
      setRooms([]); // Limpiar la lista de salas al desconectar
    }

    function onUpdateRooms(updatedRooms) {
      console.log("Update")
      setRooms(updatedRooms);
    }

     socket.on('connect', onConnect);
     socket.on('disconnect', onDisconnect);
    socket.on('updateRooms', onUpdateRooms);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("updateRooms", onUpdateRooms);

    };
  }, []);

  const createRoom = () => {
    if (newRoomName.trim() !== "") {
      const socket = getSocket()
      socket.emit("createRoom", newRoomName);
      setNewRoomName("");
    } else {
      Alert.alert("Error", "El nombre de la sala no puede estar vacío");
    }
  };

  const joinRoom = (roomName) => {
    const socket = getSocket()
    socket.emit("joinRoom", roomName);
    console.log(roomName)
    navigation.replace("GameScreen", { roomName });
  };

  return (
    <ImageBackground source={fondo} style={styles.background}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido al Juego</Text>
        <View style={styles.scrollContainer}>
          <Text style={styles.subtitle}>Salas disponibles</Text>
          <ScrollView>
            {rooms.map((room) => (
              <TouchableOpacity
                key={room.roomName}
                style={styles.roomButton}
                onPress={() => joinRoom(room.roomName)}
              >
                <Text style={styles.roomText}>{room.roomName}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Nombre de la sala"
          placeholderTextColor="#aaa"
          value={newRoomName}
          onChangeText={setNewRoomName}
        />
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
});
