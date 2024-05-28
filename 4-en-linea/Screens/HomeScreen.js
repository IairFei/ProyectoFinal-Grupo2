import { useNavigation } from "@react-navigation/native"
import { Text, View, StyleSheet, Button } from "react-native"


export default function HomeScreen (){
    
const navigation = useNavigation()
const irAlogin = () =>{
    navigation.replace('RegisterLogin')
}

    return(
        <View style={styles.container}>
            <Text style={styles.text} >Hola Home</Text>
            <View style={styles.buttonContainer} > 
                <Button title='salir' onPress={irAlogin} />
            </View>
        </View>

    )
}


const styles = StyleSheet.create({
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
      },
      buttonContainer: {
        padding: 30,
        flexDirection: "column",
        justifyContent: "space-around",
      }
})