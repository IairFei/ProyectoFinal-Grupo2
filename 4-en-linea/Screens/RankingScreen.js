import { View, Text, Image, Button} from "react-native"
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
        <View>
            <StatusBar style="auto" />
            <Text>Mejores jugadores</Text>
            <ContactSrollView contacts={contacts} />
        </View>
    );
};

export default RankingScreen;
