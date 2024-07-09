import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import fondo from "../assets/fondo.jpg";
import roomService from '../services/rooms.js'


export default function GameOverScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { winner, roomId } = route.params;

  const irAInicio = () => {
    roomService.deleteRoom(roomId)
    navigation.replace('Home');
  };

  const reiniciarJuego = () => {
    navigation.replace( 'GameScreen' );
  };

  return (
    <ImageBackground source={fondo} style={styles.background}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.text}>{winner}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={irAInicio}>
            <Text style={styles.buttonText}>Volver al inicio</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.button} onPress={reiniciarJuego}>
            <Text style={styles.buttonText}>Reiniciar juego</Text>
          </TouchableOpacity> */}
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
  },
  text: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
