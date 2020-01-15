import React from "react";
import MapView from 'react-native-maps';
import Marker from "./marker";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";
import normalize from 'react-native-normalize';

const _getLocationAsync = async (setInitialRegion) => {
  const { coords } =  await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  })

  setInitialRegion(coords);
}

const Map = ({ users, focusedMember }) => {

  const [initialRegion, setInitialRegion] = React.useState({ latitude: 0, longitude: 0 });

  const mapRef = React.useRef();

  React.useEffect(() => {
    _getLocationAsync(setInitialRegion)
  }, []);

  React.useEffect(() => {
    if (focusedMember && focusedMember.location) {
      mapRef.current.animateToRegion(
            {
              latitude: focusedMember.location.latitude,
              longitude: focusedMember.location.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }, 350)
    }
  }, [focusedMember]);

  const locatedUsers = users.filter(user => user.getLocation());

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={{
          ...initialRegion,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
        >
        {
          locatedUsers.map(user => (
            <Marker key={user.getKey()} user={ user }/>
          ))
        }
      </MapView>
    </View>
  )
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center'
  },
  map: {
    width: Dimensions.get('window').width - 20,
    height: normalize(275, 'height')
  }
})
