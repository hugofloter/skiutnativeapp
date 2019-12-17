import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { View, Button, StyleSheet, ScrollView } from "react-native";
import { Colors } from "../constants";
import { logout } from "../api/connect";
import { useDispatch } from "react-redux";

export default function SettingsScreen() {

  const dispatch = useDispatch()
  const disconnect = React.useCallback(() => dispatch(logout()), [dispatch])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
          <Button title="Se déconnecter" onPress={ disconnect }/>
        </View>
      </ScrollView>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackgroud,
  },

  contentContainer: {
    paddingTop: 30,
    alignItems: 'center',
    textAlign: 'center',
  },
})

SettingsScreen.navigationOptions = {
  title: "Settings",
};
