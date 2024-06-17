import { useEffect, useState } from "react";
import contactService from '../services/contacts.js';
import { View, StatusBar, StyleSheet } from "react-native";
import Contact from '../components/Contact';

export default function DetailScreen({ route }) {
  const { id } = route.params;
  const [contact, setContact] = useState({});

  useEffect(() => {
    contactService.getContactsById(id)
      .then(contact => {
        setContact(contact);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Contact contact={contact} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  }
});
