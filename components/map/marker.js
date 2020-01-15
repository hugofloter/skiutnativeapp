import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import Avatar from "../avatar/avatar";
import { Colors } from "../../constants";

const CustomMarker = ({ user }) => {
  const [display, setDisplay] = React.useState(false);

  if(!user || !user.getLocation()) {
    return null;
  }

  return (
    <Marker coordinate={ user.getLocation() } onPress={ () => setDisplay(!display) }>
      <View style={styles.container} >
        <Avatar
          size="medium"
          user={ user }
          />
        {
          display ?
          <View style={styles.information}>
            <Text style={styles.informationText}>{user.getFirstname()} {user.getLastname()}</Text>
          </View>
          : null
        }
      </View>
    </Marker>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
  information: {
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: Colors.primaryBlue,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  informationText: {
    color: Colors.white
  }
});

export default CustomMarker;
