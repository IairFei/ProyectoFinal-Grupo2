import { ScrollView, TouchableOpacity } from "react-native";
import Contact from "../Contact";
import { useNavigation } from "@react-navigation/native";

export default ({ contacts }) =>{

    const navigation = useNavigation()

    return(
        <ScrollView>
              {
                contacts.map((contact, index)=> (                                   
                    <TouchableOpacity key={index} onPress={() =>navigation.navigate('DetailsScreen', {id: contact.id})}>
                        <Contact  contact={contact} />                               
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    )
}
