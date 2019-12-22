import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";

import Colors from "../constants/Colors";
import Sizes from "../constants/Sizes";

const ScreenTitle = ({ title, children }) => {
  return (
    <View style={ styles.container }>
      <Text style = { styles.title }>{ title }</Text>
      { children }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  title: {
    color: Colors.darkGrey,
    fontSize: Sizes.h1,
    fontWeight: 'bold',
  }
})

export default ScreenTitle;
