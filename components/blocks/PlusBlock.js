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

const PlusBlock = ({ icon, action, isAdmin = false, adminAction = null, adminIcon = null, ...iconProps }) => {

  return (
    <View style = { styles.container }>
      {isAdmin && <TouchableOpacity onPress = { adminAction } style = { styles.container }>
        <View style = { styles.AdminView }>
          <Icon name={adminIcon} {...iconProps}/>
        </View>
        </TouchableOpacity>}
      <TouchableOpacity onPress = { action } style = { styles.container }>
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
    justifyContent: 'space-between',
    flexDirection: 'row',
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
  AdminView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    marginRight: 10,
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
