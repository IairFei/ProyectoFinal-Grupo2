import { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import ItemProfile from '../components/ItemProfile/index.js';

// import { AuthContext } from "../services/AuthContext";
// import { defaultAuthData } from '../services/AutchContext/index.js';
import Authcontext , {defaultAuthData} from '../services/AutchContext'
import AsyncStorage from '../services/AsyncStorage';
//import AutchContext from '../services/AutchContext/index.js';



const ProfileScreen = () => {
  const {authData, setAuthData } = useContext(Authcontext)

  const handleLogout = () => {
    Alert.alert('',"Gracias por jugar");
    setAuthData(defaultAuthData);
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await AsyncStorage.getData('authData');
      if (data) {
        setAuthData(data);
        console.log(typeof data, data)
      }
    };
    loadData();
  }, []);



  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.title}>Perfil de Usuario</Text>
         <ItemProfile title="Nombre" description={authData.message} />
        <ItemProfile title="Email" description={authData.email} />
        {/* <ItemProfile title="Teléfono" description={authData.access_token} /> */}
        <ItemProfile title="Puesto en el Ranking" description="1" /> 
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  profileContainer: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
});
