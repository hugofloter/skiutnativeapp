 import React from "react";
 import {
   Text,
   View,
   TouchableOpacity,
   ScrollView,
   Image,
   StyleSheet,
 } from "react-native";

 import {
   Input
 } from "react-native-elements";

import Colors from "../../constants/Colors";
import Sizes from "../../constants/Sizes";


const Form = ({ showEditer }) => {
   return (
     <View style = { styles.container }>
       <ScrollView
         style={styles.container}
         contentContainerStyle={styles.contentContainer}>
         <Input placeholder = "Titre"/>
       </ScrollView>
     </View>
   )
 }

 const styles = StyleSheet.create({
   container: {
        flex: 1,
        backgroundColor: Colors.defaultBackgroud,
        padding: 5,
   },
   contentContainer: {
     paddingTop: 30,
   }
 })


export default Form;
