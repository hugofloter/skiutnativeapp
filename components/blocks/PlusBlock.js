import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";

import Colors from "../../constants/Colors";
import Sizes from "../../constants/Sizes";

const PlusBlock = ({ title, action }) => {
  return (
    <View style = { styles.container }>
      <TouchableOpacity onPress = { action }>
        <View style = { styles.view }>
          <Text style={ styles.title }>
            { title }
          </Text>
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
