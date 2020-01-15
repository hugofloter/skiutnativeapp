import React from "react";
import {
  View,
  StyleSheet,

} from "react-native";
import {
  Button
} from "react-native-elements";
import { Colors } from "../../../constants";

const NavigationButtons = ({ active, setActive }) => {
  return (
    <View style={styles.container}>
      <Button buttonStyle={active === "anim" ? styles.buttonActive : styles.button} title="Anim" onPress={() => setActive('anim')}/>
      <Button buttonStyle={active === "messages" ? styles.buttonActive : styles.button} title="Messages" onPress={() => setActive('messages')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'center',
    flexDirection: 'row'
  },
  button: {
    margin: 10,
    minWidth: 80,
    backgroundColor: Colors.primaryBlue,
  },
  buttonActive: {
    margin: 10,
    minWidth: 80,
    backgroundColor: Colors.buttonBackground,
  }
})

export default NavigationButtons;
