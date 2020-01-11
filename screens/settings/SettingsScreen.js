import React from "react";
import { View, ScrollView, Text, Button, Switch, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import { Colors, Sizes } from "../../constants";
import { getConnectedUser, logout } from "../../api/connect";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "react-navigation";
import { handleMessage } from "../../utils/message";
import { retrieveStorage } from "../../utils/asyncStorage";

import Modal from "./modal";
import ScreenTitle from "../../components/ScreenTitle";
import Settings from "./settings";
import Avatar from "./AvatarManager";

const SettingsScreen = () => {
  const [modal, showModal] = React.useState(false);

  const { user } = useSelector(state => ({ user: getConnectedUser(state)}));
  const dispatch = useDispatch();

  const disconnect = React.useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <View style={styles.container}>
      <ScreenTitle title="Paramètres"/>
      <ScrollView
        style={ styles.container }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        >
        <View style={styles.accountManager}>
          <View style={styles.avatarContainer}>
            <Avatar user={ user } size='large'/>
          </View>
          <View style={styles.button}>
            <Button title="Changer mon mot de passe" style={styles.button} onPress= {() => showModal(true) } color = { Colors.primaryBlue }/>
          </View>
          <View style={styles.button}>
            <Button title="Se déconnecter" style={styles.button} onPress = { disconnect } color = { Colors.primaryBlue }/>
          </View>
        </View>
        <Divider style={styles.divider}/>
        <Settings/>
      </ScrollView>
      <Modal isVisible={ modal } setVisible={ showModal }/>
    </View>
  )
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackgroud
  },

  contentContainer: {
    alignItems: 'center',
    textAlign: 'center'
  },

  accountManager: {
    paddingTop: 30,
    alignItems: 'center',
    textAlign: 'center'
  },

  avatarContainer : {
    marginBottom: 20,

  },
  button: {
    marginTop: 10,
  },

  switchButton: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },

  divider: {
    backgroundColor: Colors.primaryBlue,
    width: '50%',
    marginTop: 30,
    marginBottom: 30,
  }
});

SettingsScreen.navigationOptions = {
  header: null,
}
