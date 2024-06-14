import { View, Text, StyleSheet, Image, Button } from 'react-native';

const ItemProfile =({Title, Description}) =>{
    return(
        <View>    
            <Text style={styles.label}>{Title}</Text>
            <Text style={styles.value}>{Description}</Text>
        </View>
    )

}

export default ItemProfile;

const styles = StyleSheet.create({
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

