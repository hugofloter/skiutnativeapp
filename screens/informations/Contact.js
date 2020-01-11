import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";
import React from 'react';
import { imageIndex } from "../../assets/imageIndex";

export function ContactScreen({contactSelected, showContactScreen}){
  return(
    <View style={styles.container}>
      <View style={styles.header} />
      <Image style={styles.avatar} source={imageIndex[contactSelected.Photo]}/>
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}> {contactSelected.Nom}</Text>
          <Text style={styles.info}> {contactSelected.Poste}</Text>
          <Text style={styles.description}> {contactSelected.Email}</Text>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => Linking.openURL(`tel:${contactSelected.Telephone}`)}>
            <Text>Appeler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => showContactScreen(false)}>
            <Text>Retour</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackgroud,
  },
  contentContainer: {
    paddingTop: 30,
  },
  textContent: {
    flex: 1,
  },
  header:{
    backgroundColor: Colors.primaryBlue,
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:20,
    color: Colors.darkGrey,
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: Colors.primaryBlue,
    marginTop:10
  },
  description:{
    fontSize:16,
    color: Colors.darkGrey,
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: Colors.primaryBlue,
  }
});
