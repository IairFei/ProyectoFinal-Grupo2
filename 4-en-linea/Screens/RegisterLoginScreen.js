import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar
} from "react-native";
import fondo from "../assets/fondo.jpg";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";


export default function RegisterLoginScreen() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [esLogin, setEsLogin] = useState(false);

  const navigation = useNavigation()

  const HandleLogin = () => {
    if(email.toLowerCase() === 'admin' && password.toLowerCase() === 'admin' ){
        alert(`Login conseguido, bienvenido ${nombre}`)
        navigation.replace('PantallaHome')
    }else{
        alert('Login Fallado')
    }

}

const HandleRegister = () => {
  if(email && password){
      alert(`Login conseguido, bienvenido ${nombre}`)
      navigation.replace('PantallaHome')
  }else{
      alert('Login Fallado')
  }

}

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>Bienvenido</Text>
      <ImageBackground source={fondo} resizeMode="cover" style={styles.image}>
        {esLogin && (
          <TextInput
            style={styles.input}
            placeholder="Ingrese su Nombre"
            value={nombre}
            onChangeText={setNombre}
            placeholderTextColor={"white"}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Ingrese su Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={"white"}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese su Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={"white"}
        />
        <View style={styles.buttonContainer}>
            {
                !esLogin && (<Button title="iniciar secion"  onPress={HandleLogin}/>)
            }
          {!esLogin ? (
            <Button title="todavia no estas registrado?" onPress={setEsLogin} />
          ) : (
            <Button title="crear cuenta" onPress={HandleRegister} />
          )}
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
    flexDirection: "column",
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
  input: {
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#000000c0",
    color: "white",
  },
  register: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
});
