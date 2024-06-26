import { View, Text, Image, Button} from "react-native"
import contactService from '../services/contacts.js'
import { useEffect, useState , useContext} from "react"
import { StatusBar } from "expo-status-bar"
import Contact from "../components/Contact/index.js"
import ContactSrollView from "../components/ContactSrollView/index.js"
import { StyleSheet, FlatList } from "react-native"




const RankingScreen = () =>{
    const [contacts, setContacts] = useState([])

    useEffect(() =>{
        contactService.getContacts().then(contacts =>{
            setContacts(contacts)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])



    return(
        <View>
            <StatusBar style="auto" />
            <Text>Mejores jugadores</Text>
            <ContactSrollView contacts={contacts} />
     
        </View>
        
    )
}

export default RankingScreen



