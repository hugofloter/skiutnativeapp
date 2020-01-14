import MapView from 'react-native-maps';
import React, { useEffect } from 'react';
import { Icon, Button } from "react-native-elements";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Linking,
  Animated, TouchableHighlight,
} from 'react-native';
import CollapsibleList from 'react-native-collapsible-list';
import { ListItem } from 'react-native-elements'
import static_infos from "../../assets/static_infos.json";
import Colors from "../../constants/Colors";
import ScreenTitle from "../../components/ScreenTitle";
import PlusBlock from "../../components/blocks/PlusBlock";
import { imageIndex } from '../../assets/imageIndex';
import { ContactScreen } from "./Contact"
import { PlanningScreen } from "./Planning"
import { SlopesMapScreen } from "./SlopesMap"
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
          leftAvatar={{ source: imageIndex[l.Photo]}}
          title={l.Nom} 
          subtitle={l.Poste} 
          bottomDivider 
          chevron
          onPress={() => {setContactSelected(l); showContactScreen(true)}} />)
   );
};

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
                  <CollapsibleList numberOfVisibleItems={1} buttonContent={
                    <View style={styles.button}>
                      <ListItem leftIcon={<Icon name="expand-more"/>}
                                rightIcon={<Icon name="expand-less"/>}
                                title="afficher/cacher"
                                titleStyle={{justifyContent: 'center', alignItems: 'center'}}
                                bottomDivider/>
                    </View>
                  }>
                    <View style={styles.collapsibleItem}>
                      <ListItem leftAvatar={{ source: require("../../assets/images/app.png")}}
                                title="La Team SKI'UTC"
                                bottomDivider/>
                    </View>
                    <View style={styles.collapsibleItem}>
                      <AssoContactList data={contactsSkiut} setContactSelected={setContactSelected} showContactScreen={showContactScreen}/>
                    </View>
                  </CollapsibleList>
                </View>
                <View style={styles.ContactList}>
                  <CollapsibleList numberOfVisibleItems={1} buttonContent={
                    <View style={styles.button}>
                      <ListItem leftIcon={<Icon name="expand-more"/>}
                                rightIcon={<Icon name="expand-less"/>}
                                title="afficher/cacher"
                                containerStyle={{justifyContent: 'center', alignItems: 'center'}}
                                bottomDivider
                      />
                    </View>
                  }>
                    <View style={styles.collapsibleItem}>
                      <ListItem leftAvatar={{ source: require("../../assets/images/urgence.png")}}
                                title="Autre Contacts, Urgence"
                                bottomDivider/>
                    </View>
                    <View style={styles.collapsibleItem}>
                      <AutresContactList data={contactsImportants}/>
                    </View>
                  </CollapsibleList>
                </View>
                <Button
                    buttonStyle={styles.customButton}
                    title="Le plan des pistes"
                    onPress={() => showSlopesMap(true)}
                    iconRight
                    icon={<Icon name="map" color={ Colors.white } />}
                />
                <Button
                    buttonStyle={styles.customButton}
                    title="Les points d'interet"
                    onPress={() => showPOIMap(true)}
                    iconRight
                    icon={<Icon name="bookmark" color={ Colors.white } />}
                />
                <Button
                    buttonStyle={styles.customButton}
                    title="Le planning de la semaine"
                    onPress={() => showPlanning(true)}
                    iconRight
                    icon={<Icon name="date-range" color={ Colors.white } />}
                />
                <View style={styles.lydiaButton}>
                  <Image style={styles.lydiaImage} source={require('../../assets/images/lydia.png')} resizeMode='contain'/>
                </View>
            </ScrollView>
        </View>
    );
}

function POIMapScreen({showPOIMap, showSlopesMap, rotated, setRotated, markers, index=0, animation = new Animated.Value(0), regionTimeout = null}) {

  const [region, setRegion ] = React.useState({
                latitude: 44.290264,
                longitude: 6.568764,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009,
  });

  const mapRef = React.useRef();

  const [curIndex , setIndex ] = React.useState(0);

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
        if (curIndex !== index) {
          setIndex(index)
          const { coor } = markers[index];
          mapRef.current.animateToRegion(
            {
              latitude: coor.lat - 0.002,
              longitude: coor.lng,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
  })});

  const interpolations = markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];
    const scale = animation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 0.5],
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
    <View style={styles.POIContainer}>
      <ScreenTitle title="Lieux utiles" logo={false}>
        <PlusBlock icon="backspace" color={Colors.white}
                   action={() => showPOIMap(false)}
        />
      </ScreenTitle>
      <View style={styles.POIContainer} contentContainerStyle={styles.contentContainer}>
        <MapView style={styles.mapStyle} provider="google" showsPointsOfInterest = {false} initialRegion={region} ref={mapRef}>
          {markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                   scale: interpolations[index].scale,
                },
              ],
            };

            const opacityStyle = {
               opacity: interpolations[index].opacity,
            };

            return (
              <MapView.Marker key={index} coordinate={{
                                            latitude: marker.coor.lat,
                                            longitude: marker.coor.lng
              }}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            )
          })}
        </MapView>
        <Animated.ScrollView horizontal scrollEventThrottle={1} showsHorizontalScrollIndicator={false}
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
              <Image source={imageIndex[marker.image]} style={styles.cardImage} resizeMode="cover"/>
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.subtitle}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    </View>
  )
}

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
    return <PlanningScreen showPlanning={ showPlanning } setRotated={ setRotated } rotated={ rotated }/>
  }

  return <InformationsScreen showSlopesMap={ showSlopesMap } showPOIMap={ showPOIMap } setContactSelected={ setContactSelected } showContactScreen={ showContactScreen } showPlanning={ showPlanning }/>
};

InfosScreenManager.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackgroud,
    padding: 5
  },
  POIContainer: {
    flex: 1,
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
    width: width,
    height: height,
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
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    shadowColor: Colors.black,
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
    color: Colors.darkGrey,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 70,
    minHeight: 70,
    borderRadius: 180
  },
  marker: {
    width: 10,
    height: 10,
    borderRadius: 180,
    backgroundColor: Colors.poiColor,
  },
  ring: {
    minWidth: 30,
    minHeight: 30,
    borderRadius: 180,
    backgroundColor: Colors.poiCircleColor,
    position: "absolute",
    borderWidth: 1,
    borderColor: Colors.poiColor,
  },
  collapsibleItem: {
    borderColor: "black",
  },
  header:{
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
    color: Colors.grey,
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    marginTop:10
  },
  customButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15,
    padding: 12,
    borderRadius: 30,
    backgroundColor: Colors.primaryBlue,
  },
  lydiaButton: {
    marginTop: 30,
    alignItems: 'center'
  },
  lydiaImage: {
    height: 100,
    width: 100
  }
});
