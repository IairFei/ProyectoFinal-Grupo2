import { ScrollView, TouchableOpacity, View } from "react-native";
import Contact from "../Contact";
import { useNavigation } from "@react-navigation/native";

export default ({ contacts }) =>{

    const navigation = useNavigation()
    console.log(typeof contacts)
 

    const sortedContacts = contacts.sort((a, b) => b.points - a.points)

    return(
        <ScrollView>
              {
                sortedContacts.map((contact, index)=> (                                   
                    <TouchableOpacity key={index} onPress={() =>navigation.navigate('DetailsScreen', {id: contact.id})}>
                        <Contact  contact={contact} />                               
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    )
}
