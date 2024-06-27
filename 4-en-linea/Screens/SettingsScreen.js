import { useContext } from 'react';
import AutchContext, { defaultAuthData } from '../services/AutchContext';
import { StyleSheet, View, Button, Alert } from 'react-native';

const SettingsScreen = () => {
  const {authData, setAuthData} = useContext(AutchContext)
    
  const handleLogout = () => {
    Alert.alert('',"Gracias por jugar");
    setAuthData(defaultAuthData);
  };

    return (
      <View style={styles.container}>
        <Button title="Cerrar sesión" onPress={handleLogout} color="#1E90FF" />
      </View>
    );
  };

  export default SettingsScreen;


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingTop: 50,
    },
})
