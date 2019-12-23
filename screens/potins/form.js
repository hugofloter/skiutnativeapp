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

const Form = ({showEditer}) => {

   return (
     <View style = { styles.container }>
       <View style={ styles.headerContainer }>
         <Button onPress = { () => showEditer(false) } color={Platform.OS === 'ios' ? Colors.iosColor : "transparent"} style={styles.button} title="Annuler"/>
         <Text style={styles.text}>Création du potin</Text>
         <Button onPress = { () => {} } color={Platform.OS === 'ios' ? Colors.iosColor : "transparent"} style={styles.button} title="Envoyer"/>
       </View>
       <View style={ styles.contentContainer }>
         <Input placeholder='Ton titre' style={styles.input} />


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
    padding: 10,
    height: 60,
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
  input: {
      borderBottomColor: Colors.tintColor,
  }
})


export default Form;