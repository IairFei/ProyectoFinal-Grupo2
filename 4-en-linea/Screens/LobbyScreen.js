import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import fondo from "../assets/fondo.jpg";
import { useState, useEffect } from "react";
import ContactSrollView from "../components/ContactSrollView/index.js";
import socket from "../services/socket.js";

export default function LobbyScreen() {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');
  const navigation = useNavigation();


//  const [contacts, setContacts] = useState([]);

  //  useEffect(() =>{
  //      contactService.getContacts().then(contacts =>{
  //          setContacts(contacts)
  //      })
  //      .catch(err => {
  //          console.log(err)
  //      })
  //  }, [])

  useEffect(() => {
    socket.on("updateRooms", (updatedRooms) => {
      console.log("salas actualizadas")
      setRooms(updatedRooms);
    });

    socket.emit("joinLobby");

    return () => {
      socket.emit("leaveLobby");
      socket.off("updateRooms");
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
          {Object.keys(rooms).map((roomName) => (
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
});
