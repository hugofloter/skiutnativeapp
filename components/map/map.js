import React from "react";
import MapView from 'react-native-maps';
import Marker from "./marker";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";

const _getLocationAsync = async (setInitialRegion) => {
  const { coords } =  await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  })

  setInitialRegion(coords);
}

const Map = ({ users }) => {

  const [initialRegion, setInitialRegion] = React.useState({ latitude: 0, longitude: 0 });

  React.useEffect(() => {
    _getLocationAsync(setInitialRegion)
  }, []);

  const locatedUsers = users.filter(user => user.getLocation());

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={ {
          ...initialRegion,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        } }
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
    textAlign: 'center',
  },
  map: {
    width: Dimensions.get('window').width - 20,
    height: 400
  }
})
