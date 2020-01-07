import * as WebBrowser from 'expo-web-browser';
import MapView from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import { Icon, Button } from "react-native-elements";
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
    View,
    Modal,
    ListView,
    ImageBackground,
    Linking,
    Animated,
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import CollapsibleList from 'react-native-collapsible-list';
import {
  ListItem,
  Overlay
} from 'react-native-elements'
import static_infos from "../assets/static_infos.json";
import Colors from "../constants/Colors";
import ScreenTitle from "../components/ScreenTitle";
import PlusBlock from "../components/blocks/PlusBlock";
import colors from '../constants/Colors';
import Images from '../assets/imageIndex';

const contactsSkiut = static_infos.Contacts;
const contactsImportants = static_infos.ContactsAutres;
const markerList = static_infos.markers;

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;


function AssoContactList({ data, setContactSelected, showContactScreen}) {
  return (
     data.map((l, i) => 
        <ListItem 
          key={i}
          leftAvatar={{ source: Images[l.Photo]}} 
          title={l.Nom} 
          subtitle={l.Poste} 
          bottomDivider 
          chevron
          onPress={() => {setContactSelected(l); showContactScreen(true)}} />)
   );
};

function ContactScreen({contactSelected, showContactScreen}){
  return(
    <View style={styles.container}>
    <View style={styles.header}></View>
    <Image style={styles.avatar} source={Images[contactSelected.Photo]}/>
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

function AutresContactList({ data }) {
  return (
     data.map((l, i) => 
        <ListItem 
          key={i} 
          title={l.Nom} 
          subtitle={l.Telephone || l.Email}
          onPress={() => {l.Telephone ? Linking.openURL(`tel:${l.Telephone}`) : Linking.openURL(`mailto:${l.Email}`)}} 
          bottomDivider
          chevron 
          />)
   );
};

export const InfosScreenManager = () => {
  const [slopesMap, showSlopesMap] = React.useState(false);
  const [rotated, setRotated] = React.useState(false);
  const [POIMap, showPOIMap] = React.useState(false);
  const [planning, showPlanning] = React.useState(false);
  const [contactScreen, showContactScreen] = React.useState(false);
  const [contactSelected, setContactSelected] = React.useState({
    Nom:"",
    Poste:"",
    Telephone:"",
    Email:"",
    Photo:""
  });

  if (slopesMap) {
    return <SlopesMapScreen showPOIMap={ showPOIMap } showSlopesMap={ showSlopesMap } setRotated={ setRotated } rotated={ rotated }/>
  }

  if (POIMap) {
    return <POIMapScreen showPOIMap={ showPOIMap } showSlopesMap={ showSlopesMap } setRotated={ setRotated } rotated={ rotated } markers={ markerList }/>
  }

  if (contactScreen) {
    return <ContactScreen contactSelected={ contactSelected } showContactScreen={ showContactScreen }/>
  }

  if (planning) {
    return <PlanningScreen showPlanning={ showPlanning }/>
  }

  return <InformationsScreen showSlopesMap={ showSlopesMap } showPOIMap={ showPOIMap } setContactSelected={ setContactSelected } showContactScreen={ showContactScreen } showPlanning={ showPlanning }/>
}
function InformationsScreen({showSlopesMap, showPOIMap, setContactSelected, showContactScreen, showPlanning}) {
    return (
        <View style={styles.container}>
          <ScreenTitle title="Informations">
          </ScreenTitle>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}>

                <View style={styles.ContactList}>
                <CollapsibleList
                          numberOfVisibleItems={1}
                          wrapperStyle={styles.wrapperCollapsibleList}
                          buttonContent={
                            <View style={styles.button}>
                                      <ListItem 
                                        leftIcon={<Icon name="expand-more"/>}
                                        rightIcon={<Icon name="expand-less"/>}
                                        title="afficher/cacher" 
                                        titleStyle={{justifyContent: 'center', alignItems: 'center'}}
                                        bottomDivider/>
                            </View>
                          }
                >
                
                <View style={styles.collapsibleItem}>                                      
                  <ListItem 
                    leftAvatar={{ source: require("../assets/images/app.png")}} 
                    title="La Team Skiut" 
                    bottomDivider/>
                </View>
                <View style={styles.collapsibleItem}>
                <AssoContactList data={contactsSkiut} setContactSelected={setContactSelected} showContactScreen={showContactScreen}/>
                </View>
                </CollapsibleList>
                </View>
                
                <View style={styles.ContactList}>
                <CollapsibleList
                          numberOfVisibleItems={1}
                          wrapperStyle={styles.wrapperCollapsibleList}
                          buttonContent={
                            <View style={styles.button}>
                                      <ListItem 
                                        leftIcon={<Icon name="expand-more"/>}
                                        rightIcon={<Icon name="expand-less"/>}
                                        title="afficher/cacher" 
                                        titleStyle={{justifyContent: 'center', alignItems: 'center'}}
                                        bottomDivider/>
                            </View>
                          }
                >
                <View style={styles.collapsibleItem}>                  
                <ListItem 
                    leftAvatar={{ source: require("../assets/images/urgence.png")}} 
                    title="Autre Contacts, Urgence" 
                    bottomDivider/></View>
                <View style={styles.collapsibleItem}>
                <AutresContactList data={contactsImportants}/>
                </View>
                </CollapsibleList>
                </View>
                <Button
                buttonStyle={styles.customButton}
                title="Le plan des pistes"
                onPress={() => showSlopesMap(true)}
                icon={<Icon name="map"/>}
                />
                <Button
                buttonStyle={styles.customButton}
                title="Les points d'interet"
                onPress={() => showPOIMap(true)}
                icon={<Icon name="bookmark"/>}
                />
                <Button
                buttonStyle={styles.customButton}
                title="Le planning de la semaine"
                onPress={() => showPlanning(true)}
                icon={<Icon name="date-range"/>}
                />
            </ScrollView>
        </View>
    );
}

function SlopesMapScreen({showPOIMap, showSlopesMap, rotated, setRotated}) {
  return(
    <View style={styles.container}>
              <ScreenTitle title="Plan des pistes">
              <PlusBlock icon="backspace" adminIcon="rotate-right" color={colors.white}
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
            source={require('../assets/images/SlopesMap.png')}>

            </ImageBackground>
          </ImageZoom>

          <View style={styles.quit}>

              </View>
        </View>
    </View>
  )
}

function PlanningScreen({ showPlanning, rotated, setRotated}) {
  return(
    <View style={styles.container}>
              <ScreenTitle title="Planning">
              <PlusBlock icon="backspace" adminIcon="rotate-right" color={colors.white}
                isAdmin={true}
                action={() => showPlanning(false)}
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
            source={require('../assets/images/SlopesMap.png')}>

            </ImageBackground>
          </ImageZoom>

          <View style={styles.quit}>

              </View>
        </View>
    </View>
  )
}

function POIMapScreen({showPOIMap, showSlopesMap, rotated, setRotated, markers, index=0, animation = new Animated.Value(0), regionTimeout}) {
  
  useEffect(() => {
  animation.addListener(({ value }) => {
    let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
    if (index >= markers.length) {
      index = markers.length - 1;
    }
    if (index <= 0) {
      index = 0;
    }
    clearTimeout(regionTimeout);
    regionTimeout = setTimeout(() => {
      if (index !== index) {
        index = index;
        const { coordinate } = markers[index];
        map.animateToRegion(
          {
            ...coordinate,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
          },
          350
        );
      }
    }, 10);
  })})

  const interpolations = markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];
    const scale = animation.interpolate({
      inputRange,
      outputRange: [1, 2.5, 1],
      extrapolate: "clamp",
    });
    const opacity = animation.interpolate({
      inputRange,
      outputRange: [0.35, 1, 0.35],
      extrapolate: "clamp",
    });
    return { scale, opacity };
  });
  return(
    <View style={styles.container}>
              <ScreenTitle title="Lieux utiles" logo={false}>
              <PlusBlock icon="backspace" color={colors.white}
                action={() => showPOIMap(false)}
              />
              </ScreenTitle>
      <View style={styles.container}
            contentContainerStyle={styles.contentContainer}>
          <MapView style={styles.mapStyle} provider="google"
              showsPointsOfInterest = {false}
              initialRegion={{
                latitude: 44.290264,
                longitude: 6.568764,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009,
              }}>
                  {markers.map((marker, index) => 
                    {const scaleStyle = {
                      transform: [
                        {
                          scale: interpolations[index].scale,
                        },
                      ],
                    };
                    const opacityStyle = {
                      opacity: interpolations[index].opacity,
                    };
                    return(<MapView.Marker
                      key={index}
                      coordinate={{
                        latitude: marker.coor.lat,
                        longitude: marker.coor.lng
                      }}
                    >
                    <Animated.View style={[styles.markerWrap, opacityStyle]}>
                      <Animated.View style={[styles.ring, scaleStyle]} />
                        <View style={styles.marker} />
                      </Animated.View>
                    </MapView.Marker>)
                  })}
          </MapView>
          <Animated.ScrollView
              horizontal
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              snapToInterval={CARD_WIDTH}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: animation,
                      },
                    },
                  },
                ],
                { useNativeDriver: true }
              )}
              style={styles.scrollView}
              contentContainerStyle={styles.endPadding}
            >
                {markers.map((marker, index) => (
    <View style={styles.card} key={index}>
      <Image
        source={Images[marker.image]}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.textContent}>
        <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
        <Text numberOfLines={1} style={styles.cardDescription}>
          {marker.subtitle}
        </Text>
      </View>
    </View>
  ))}
</Animated.ScrollView>

          <View style={styles.quit}>

              </View>
        </View>
    </View>
  )
}

InfosScreenManager.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultBackgroud,
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
