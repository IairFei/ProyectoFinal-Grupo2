import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import GlobalContext from "./components/globals/GlobalContext";
import imagen from "./assets/fondo.jpg";


export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={imagen} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Bienvenido</Text>
        <View style={styles.buttonContainer}>
          <Button title="LOGUEARSE" />
          <Button title="REGISTRARSE" />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    justifyContent: "center",
  },
  buttonContainer: {
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});

