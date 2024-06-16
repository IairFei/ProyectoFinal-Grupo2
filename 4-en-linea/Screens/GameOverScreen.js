import { useNavigation } from "@react-navigation/native"
import { Text, View, StyleSheet, Button } from "react-native"

export default function GameOverScreen() {
    
    const navigation = useNavigation()
    
    const irAInicio = () => {
        navigation.replace('HomeNavigation')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Game Over</Text>
            <View style={styles.buttonContainer}>
                <Button title='Volver al inicio' onPress={irAInicio} />
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
      backgroundColor: "#ff0000c0",
    },
    container: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
      },
      buttonContainer: {
        padding: 30,
        flexDirection: "column",
        justifyContent: "space-around",
      }
})
