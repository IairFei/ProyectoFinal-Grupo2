import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import socket from "../services/socket";

const WaitingScreen = ({ route, navigation }) => {
  const { roomId , authData} = route.params;
  const [secondPlayerJoined, setSecondPlayerJoined] = useState(false);

  useEffect(() => {
    const handleSecondPlayerJoined = () => {
      // Cuando el segundo jugador se una, navega a GameScreen
      socket.emit("joinRoom", { roomId, authData });

      navigation.replace("GameScreen", { roomId });
    };
    socket.emit("joinRoom", { roomId, authData });


    socket.on("secondPlayerJoined", handleSecondPlayerJoined);

    return () => {
      socket.off("secondPlayerJoined", handleSecondPlayerJoined);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esperando a otro jugador...</Text>
      <ActivityIndicator size="large" color="#1E90FF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default WaitingScreen;