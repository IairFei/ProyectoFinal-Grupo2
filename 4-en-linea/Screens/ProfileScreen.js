import { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import ItemProfile from '../components/ItemProfile/index.js';
import Authcontext , {defaultAuthData} from '../services/AutchContext'
import AsyncStorage from '../services/AsyncStorage';
import contactService from '../services/contacts.js'




const ProfileScreen = () => {
  const { authData, setAuthData } = useContext(Authcontext);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await AsyncStorage.getData('authData');
      if (data) {
       setAuthData(data);
        if (data.payload.id) {
         // Obtiene la información del contacto usando el id del usuario
         contactService.getContactsById(data.payload.id)
            .then(response => {
              if (response.status === 'success' && response.payload) {
                setContact(response.payload);
              } else {
                console.error('Error al obtener el contacto:', response);
              }
            })
            .catch(err => {
              console.error('Error al obtener el contacto:', err);
            });
        }
      }
    }
    loadData();
  }, []);

  if (!contact) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.title}>Perfil de Usuario</Text>
         <ItemProfile title="Nombre" description={contact.name} />
        <ItemProfile title="Email" description={contact.email} />
        {/* <ItemProfile title="Teléfono" description={authData.access_token} /> */}
        <ItemProfile title="Puntaje" description={contact.points} /> 
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
