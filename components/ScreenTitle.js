import React from "react";
import {
  View,
  Text,
  StyleSheet, Image, Button, Platform
} from "react-native";
import { Header } from "react-navigation"
import Colors from "../constants/Colors";
import Sizes from "../constants/Sizes";

const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;

const ScreenTitle = ({ title, children }) => {
  return (
    <View style={ styles.container }>
        <Image
            style={styles.headerLogo}
            source={require("../assets/images/header-logo.png")}
        />
      <Text style = { styles.title }>{ title }</Text>
      { children }
    </View>
  )
};

export const ScreenAddingTitle = ({ title, showEditer, children }) => {
  return (
    <View style={ styles.container }>
      <Button onPress = { () => showEditer(false) } color = { Platform.OS === 'ios' ? Colors.primaryBlue : Colors.tintColor } style={styles.button} title="Annuler"/>
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
    alignItems: 'flex-end',
    maxHeight: 1.5*Header.HEIGHT,
    padding: 5
  },
  title: {
    color: Colors.darkGrey,
    fontSize: Sizes.h1,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    left: TITLE_OFFSET,
    right: TITLE_OFFSET,
    bottom: 10
  },
  headerLogo: {
    width: Header.HEIGHT + 10,
    height: Header.HEIGHT - 10,
  }
})

export default ScreenTitle;
