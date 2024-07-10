import { Card } from "@rneui/base";
import { View, Image } from "react-native";

export default ({ contact }) => {
  return (
    <View>
      <Card>
        <Card.Title>Nombre: {contact.name} </Card.Title>
        <Card.Divider />
        <Card.Title>Puntaje: {contact.points}</Card.Title>
        <Card.Divider />
        <View style={{ position: "relative", alignItems: "center" }}>
          <Image
            style={{ width: "100%", height: 100 }}
            resizeMode="contain"
            source={{
              uri: "https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4",
            }}
          />
        </View>
      </Card>
    </View>
  );
};
