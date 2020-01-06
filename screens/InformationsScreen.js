import * as WebBrowser from 'expo-web-browser';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import React from 'react';
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
    Button,
    ImageBackground,
    Linking,
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

const contactsSkiut = static_infos.Contacts;
const contactsImportants = static_infos.ContactsAutres;
const markers = static_infos.markers;

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;


function AssoContactList({ data, setContactSelected, showContactScreen}) {
  return (
     data.map((l, i) => 
        <ListItem 
          key={i}
          leftAvatar={{ source: {uri: l.Photo}}} 
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
    <Image style={styles.avatar} source={eval(contactSelected)}/>
    <View style={styles.body}>
      <View style={styles.bodyContent}>
        <Text style={styles.name}>Nom: {contactSelected.Nom}</Text>
        <Text style={styles.info}>Poste: {contactSelected.Poste}</Text>
  <Text style={styles.description}>Email: {contactSelected.Email}</Text>
        
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
          bottomDivider
          chevron 
          />)
   );
};

export const InfosScreenManager = () => {
  const [slopesMap, showSlopesMap] = React.useState(false);
  const [rotated, setRotated] = React.useState(false);
  const [POIMap, showPOIMap] = React.useState(false);
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
    return <POIMapScreen showPOIMap={ showPOIMap } showSlopesMap={ showSlopesMap } setRotated={ setRotated } rotated={ rotated }/>
  }

  if (contactScreen) {
    return <ContactScreen contactSelected={ contactSelected } showContactScreen={ showContactScreen }/>
  }

  return <InformationsScreen showSlopesMap={ showSlopesMap } showPOIMap={ showPOIMap } setContactSelected={ setContactSelected } showContactScreen={ showContactScreen }/>
}
function InformationsScreen({showSlopesMap, showPOIMap, setContactSelected, showContactScreen}) {
    return (
        <View style={styles.container}>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}>
                
                <ScreenTitle title="Informations">
                </ScreenTitle>

                
                <View style={styles.ContactList}>
                <CollapsibleList
                          numberOfVisibleItems={1}
                          wrapperStyle={styles.wrapperCollapsibleList}
                          buttonContent={
                            <View style={styles.button}>
                              <Text style={styles.buttonText}>Afficher/Cacher</Text>
                            </View>
                          }
                >
                
                <View style={styles.collapsibleItem}><Text>Team Skiutc</Text></View>
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
                              <Text style={styles.buttonText}>Afficher/Cacher</Text>
                            </View>
                          }
                >
                <View style={styles.collapsibleItem}><Text>Importants</Text></View>
                <View style={styles.collapsibleItem}>
                <AutresContactList data={contactsImportants}/>
                </View>
                </CollapsibleList>
                </View>
                <Button
                title="Le plan des pistes"
                onPress={() => showSlopesMap(true)}
                />
                <Button
                title="Les points d'interet"
                onPress={() => showPOIMap(true)}
                />
            </ScrollView>
        </View>
    );
}

function SlopesMapScreen({showPOIMap, showSlopesMap, rotated, setRotated}) {
  return(
    <View style={styles.container}>
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
        <ScreenTitle title="Le plan des pistes">
              <PlusBlock icon="backspace" adminIcon="rotate-right" color={colors.white}
                isAdmin={true}
                action={() => showSlopesMap(false)}
                adminAction={() => setRotated(!rotated)}
              />
              </ScreenTitle>
              </View>
        </View>
    </View>
  )
}

function POIMapScreen({showPOIMap, showSlopesMap, rotated, setRotated}) {
  return(
    <View style={styles.container}>
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
                  {markers.map((marker, i) => (
                    <MapView.Marker
                      key={i}
                      coordinate={{
                        latitude: marker.coor.lat,
                        longitude: marker.coor.lng
                      }}
                      title={marker.title}
                      description={marker.subtitle}
                    />
                  ))}
          </MapView>


          <View style={styles.quit}>
        <ScreenTitle title="Points d'interets">
              <PlusBlock icon="backspace" color={colors.white}
                action={() => showPOIMap(false)}
              />
              </ScreenTitle>
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
    paddingTop: 30,
    paddingLeft:15,
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
  quit: {
    position: 'absolute',
    transform: [{'translate': [0,0, 1]}]
  },
  block: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    padding: 5,
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  container: {
    flex: 1,
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
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
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
});
