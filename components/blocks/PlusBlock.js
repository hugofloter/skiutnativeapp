import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";
import { Icon } from "react-native-elements";

import Colors from "../../constants/Colors";
import Sizes from "../../constants/Sizes";

const PlusBlock = ({ icon, action, ...iconProps }) => {
  return (
    <View style = { styles.container }>
      <TouchableOpacity onPress = { action }>
        <View style = { styles.view }>
          <Icon name={icon} {...iconProps}/>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderStyle: 'solid',
    borderRadius: 5,
    backgroundColor: Colors.tintColor,
  },
  title: {
    color: Colors.white,
    fontSize: Sizes.h2,
    fontWeight: 'bold',
  }
});

export default PlusBlock;
