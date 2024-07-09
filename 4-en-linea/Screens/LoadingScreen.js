import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoadingScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    // Aquí puedes realizar tareas de inicialización o carga de datos

    // Ejemplo de redirección después de un tiempo simulado (puedes ajustar el tiempo según necesites)
    const timeout = setTimeout(() => {
      navigation.replace('LobbyScreen'); // Cambia 'Home' por la pantalla a la que quieras navegar después de cargar
    }, 1000); // 3000 milisegundos (3 segundos) de tiempo simulado

    return () => clearTimeout(timeout); // Limpia el timeout si el componente se desmonta antes de que se complete
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1E90FF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
