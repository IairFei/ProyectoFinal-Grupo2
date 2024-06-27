import { View, Text, Image, Button, StyleSheet} from "react-native"
import contactService from '../services/contacts.js'
import { useEffect, useState , useContext} from "react"
import { StatusBar } from "expo-status-bar"
import ContactSrollView from "../components/ContactSrollView/index.js"
import  AuthContext  from '../services/AutchContext';

const RankingScreen = () => {
    const [contacts, setContacts] = useState([]);
    const { authData, setAuthData } = useContext(AuthContext);

    useEffect(() => {
        contactService.getContacts().then(response => {
            console.log('Response:', response);
            // Accede a payload y verifica si es un array
            if (response.status === "success" && Array.isArray(response.payload)) {
                setContacts(response.payload);
            } else {
                console.error('Expected an array in payload but got:', typeof response.payload);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <View style={styles.container} >
          <StatusBar style="auto" />
          <Text style={styles.title} >Mejores jugadores</Text>
        </View>,
        <View>
            <ContactSrollView  contacts={contacts} />
        </View>
        
      );
    };

    const styles = StyleSheet.create({
      container: {
       justifyContent: "center",
       alignItems:"center",
       flex:1,
        backgroundColor: '#fff',
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20, 
      },
    });

export default RankingScreen; 
