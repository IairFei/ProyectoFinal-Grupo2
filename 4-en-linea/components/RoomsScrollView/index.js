import { ScrollView, TouchableOpacity, View, Text, StyleSheet} from "react-native";
import Contact from "../Contact";
import { useNavigation } from "@react-navigation/native";

export default ({ rooms }) =>{

    const navigation = useNavigation()
    console.log(typeof contacts)
 

    //const sortedContacts = contacts.sort((a, b) => b.points - a.points)

    return(
        <View style={styles.scrollContainer}>
          <Text style={styles.subtitle}>Salas disponibles</Text>
          <ScrollView>
            {rooms.map((room) => (
              <TouchableOpacity
                key={room.roomName}
                style={styles.roomButton}
                onPress={() => joinRoom(room.roomName)}
              >
                <Text style={styles.roomText}>{room.roomName}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({


    buttonContainer: {
      width: "100%",
      alignItems: "center",
    },
    scrollContainer: {
      flex: 1,
      width: "100%",
      marginVertical: 10,
      padding: 10,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: 10,
    },
    subtitle: {
      color: "#fff",
      fontSize: 24,
      textAlign: "center",
      marginBottom: 10,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      padding: 5,
      borderRadius: 10,
    },
    roomButton: {
      backgroundColor: "#4682B4",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginVertical: 10,
    },

  });