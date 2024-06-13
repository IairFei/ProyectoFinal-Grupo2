import { View, Text, Image} from "react-native"
import contactService from '../services/contacts.js'
import { useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import Contact from "../components/Contact/index.js"
import ContactSrollView from "../components/ContactSrollView/index.js"



const RankingScreen = () =>{
    const [contacts, setContacts] = useState([])

    useEffect(() =>{
        contactService.getContacts().then(contacts =>{
            setContacts(contacts)
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