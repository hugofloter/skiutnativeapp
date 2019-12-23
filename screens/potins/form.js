import React from "react";
import {
    Text,
    View,
    Platform,
    TouchableOpacity,
    ScrollView,
    Image,
    StyleSheet, Button,
} from "react-native";
import Colors from "../../constants/Colors";
import { Input } from 'react-native-elements';

const Form = () => {
   return (
     <View style = { styles.container }>
       <View style={ styles.headerContainer }>
         <Button onPress = { () => {} } color={Platform.OS === 'ios' ? Colors.iosColor : "transparent"} style={styles.button} title="Annuler"/>
         <Text style={styles.text}>Création du potin</Text>
         <Button onPress = { () => {} } color={Platform.OS === 'ios' ? Colors.iosColor : "transparent"} style={styles.button} title="Envoyer"/>
       </View>
       <View style={ styles.contentContainer }>
         <Input placeholder='Titre' />

           <Text>
             Ceci est le formulaire
           </Text>
       </View>
     </View>
   )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackgroud,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    height: 50,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: 'center'
  },
  text: {
    padding: 10,
  },
  button: {
    color: Colors.iosColor
  },
  contentContainer: {
    padding: 5,
    paddingTop: 30,
  },
})


export default Form;