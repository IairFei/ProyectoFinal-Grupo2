import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import fondo from "../assets/fondo.jpg";

export default function HomeScreen() {
  const navigation = useNavigation();

  const startGame = () => {
    navigation.replace('GameScreen');
  };

  const viewProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  return (
    <ImageBackground source={fondo} style={styles.background}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido al Juego</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={startGame}>
            <Text style={styles.buttonText}>Iniciar Juego</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={viewProfile}>
            <Text style={styles.buttonText}>Ver Perfil</Text>
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
    marginBottom: 40,
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
    shadowColor: '#000',
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
});
