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
       <View style={ styles.headerContainer }>
         <Text style={ styles.annulationTitle }>Annuler</Text>
         <Text style={ styles.title }>Créer</Text>
       </View>
       <View style={ styles.contentContainer }>
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
    display: "flex",
    justifyContent: 'center',
    padding: 5,
    height: 50,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: 'center'
  },
  annulationTitle: {
    textAlign: "left"
  },
  contentContainer: {
    padding: 5,
    paddingTop: 30,
  },
})


export default Form;