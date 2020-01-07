import {Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Colors from "../../constants/Colors";
import React from 'react';
import { imageIndex } from "../../assets/imageIndex";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

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
  ContactList: {
    padding:15,
  },
  landscapeMap: {
    height:1749,
    width:4961,
    transform: [{ rotate: '90deg'}]
  },
  portraitMap: {
    height:1749,
    width:4961
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  block: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    padding: 5,
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
  collapsibleItem: {
    borderColor: "black",
  },
  header:{
    backgroundColor: "#00BFFF",
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
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
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
    backgroundColor: "#00BFFF",
  },
  customButton: {
    margin: 15,
    borderRadius: 60
  }
});
