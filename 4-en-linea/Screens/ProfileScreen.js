import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ItemProfile from '../components/ItemProfile';




const ProfileScreen =({contac})=>{
  const contactemp ={
    nombre: 'Luca',
    apellido:'Polti',
    email:'lucapolti@ort.edu.ar',
    telefono:'11-1111-1111'
    
  };
  const navigation = useNavigation()
  
    const handleLogout = () => {
      alert("adios")
      navigation.replace('RegisterScreen')
  }

    return (
        <View style={styles.container}>    
            <ItemProfile Title="Nombre" Description={contactemp.nombre}/>
            <ItemProfile Title="Apellido" Description={contactemp.apellido}/>
            <ItemProfile Title="Email" Description={contactemp.email}/>
            <ItemProfile Title="Teléfono" Description={contactemp.telefono}/>
            <ItemProfile Title="Puesto en el Ranking" Description="1"/>

            <Button title="cerrar cuenta" onPress={handleLogout} />

        </View>
   );
}

export default ProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});