import {Dimensions, ImageBackground, StyleSheet, View} from "react-native";
import Colors from "../../constants/Colors";
import React from 'react';
import ScreenTitle from "../../components/ScreenTitle";
import PlusBlock from "../../components/blocks/PlusBlock";
import ImageZoom from "react-native-image-pan-zoom";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export function SlopesMapScreen({showPOIMap, showSlopesMap, rotated, setRotated}) {
  return(
    <View style={styles.container}>
              <ScreenTitle title="Plan des pistes">
              <PlusBlock icon="backspace" adminIcon="rotate-right" color={Colors.white}
                isAdmin={true}
                action={() => showSlopesMap(false)}
                adminAction={() => setRotated(!rotated)}
              />
              </ScreenTitle>
      <View style={styles.container}
            contentContainerStyle={styles.contentContainer}>

          <ImageZoom
            cropHeight={height}
            cropWidth={width}
            imageHeight={1749}
            imageWidth={4961}
            minScale={0.1}
            maxScale={10}
            enableCenterFocus={false}
            >
            <ImageBackground
            style={[(rotated) ? styles.landscapeMap : styles.portraitMap]}
            source={require('../../assets/images/SlopesMap.png')}>

            </ImageBackground>
          </ImageZoom>
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