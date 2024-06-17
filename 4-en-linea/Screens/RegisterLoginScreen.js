import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar
} from "react-native";
import fondo from "../assets/fondo.jpg";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function RegisterLoginScreen() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [esLogin, setEsLogin] = useState(false);

  const navigation = useNavigation();

  const HandleLogin = () => {
    if (email.toLowerCase() === 'admin' && password.toLowerCase() === 'admin') {
      alert(`Bienvenido ${nombre}`);
      navigation.replace('PantallaHome');
    } else {
      alert('Login Fallado');
    }
  };

  const HandleRegister = () => {
    if (email && password) {
      alert(`Bienvenido ${nombre}`);
      navigation.replace('PantallaHome');
    } else {
      alert('Registro Fallado');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={fondo} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Text style={styles.title}>Bienvenido</Text>
          {esLogin && (
            <TextInput
              style={styles.input}
              placeholder="Ingrese su nombre"
              value={nombre}
              onChangeText={setNombre}
              placeholderTextColor={"#ccc"}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Ingrese su email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={"#ccc"}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Ingrese su contraseña"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={"#ccc"}
            secureTextEntry
          />
          <View style={styles.buttonContainer}>
            {!esLogin ? (
              <TouchableOpacity style={styles.button} onPress={HandleLogin}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={HandleRegister}>
                <Text style={styles.buttonText}>Crear cuenta</Text>
              </TouchableOpacity> 

            )}
            {!esLogin ? (
              <TouchableOpacity style={styles.registerButton} onPress={() => setEsLogin(true)}>
                <Text style={styles.buttonText}>Registrarse</Text>
              </TouchableOpacity> 
            ) : (
              <TouchableOpacity style={styles.button} onPress={() => setEsLogin(false)}>
                <Text style={styles.buttonText}>Ya tengo cuenta</Text>
              </TouchableOpacity> 
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
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
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
