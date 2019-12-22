 import React from "react";
 import {
   Text,
   View,
   TouchableOpacity,
   ScrollView,
   Image,
   StyleSheet,
 } from "react-native";
import Colors from "../../constants/Colors";
import Sizes from "../../constants/Sizes";


const Form = () => {
   return (
     <View style = { styles.container }>
       <Text style = { styles.text }>
         Ceci est le formulaire
       </Text>
     </View>
   )
 }

 const styles = StyleSheet.create({
   container: {
        flex: 1,
        backgroundColor: Colors.defaultBackgroud,
        padding: 5,
   },
   text: {
     color: 'red',
   }
 })


export default Form;
