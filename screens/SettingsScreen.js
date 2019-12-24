import React from 'react';
import {View, Button, StyleSheet, ScrollView, Switch, Text, TextInput, ActivityIndicator} from "react-native";
import {Colors, Sizes} from "../constants";
import {getConnectedUser, logout} from "../api/connect";
import {useDispatch, useSelector} from "react-redux";
import { Avatar, Divider, Overlay, Button as ButtonNative } from 'react-native-elements';
import {users as usersAPI} from "../api/state"
import ScreenTitle from "../components/ScreenTitle";
import { showMessage } from "react-native-flash-message";

const resetFields = (setShowable, setOldPassword, setNewPassword, setConfirmPassword) => {
  setOldPassword('')
  setNewPassword('')
  setConfirmPassword('')
  setShowable(false)
}

export default function SettingsScreen() {

  const [allowLocalisation, setAllowLocalisation] = React.useState(false);
  const [showChangePassword, setShowable] = React.useState(false);
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const { userConnected, isAdmin }  = useSelector(state => ({ userConnected: getConnectedUser(state), isAdmin: getConnectedUser(state).getAdmin() }))

  const dispatch = useDispatch()
  const disconnect = React.useCallback(() => dispatch(logout()), [dispatch])
  const changePassword = React.useCallback((data) => dispatch(usersAPI.update(data)), [dispatch])
  const resetUpdate = React.useCallback(() => dispatch(usersAPI.resetUpdate()), [dispatch])

  const { updatePasswordStatus, statusUpdate } = useSelector(state => ({ updatePasswordStatus: usersAPI.getUpdatingFromState(state), statusUpdate: usersAPI.getUpdatingStatusFromState(state) }));

  React.useEffect(() => {
    if (statusUpdate === true) {
        showMessage({
           message: "Mot de passe changé !",
           type: "success",
        });
        resetFields(setShowable, setOldPassword, setNewPassword, setConfirmPassword)
        resetUpdate()
    } else if (statusUpdate === false) {
        showMessage({
           message: "Mauvais mot de passe !",
           type: "error",
        });
        resetUpdate()
    }
  },[statusUpdate])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}
                  contentContainerStyle={styles.contentContainer}
                  showsVerticalScrollIndicator={false}
      >
        <ScreenTitle title="Paramètres">
        </ScreenTitle>
        <View style={styles.accountManager}>
          <View style={{paddingBottom: 30}}><Avatar rounded
                  size="large"
                  title={userConnected.getFirstname()[0]+userConnected.getLastname()[0]}
                  onPress={() => {}}
                               activeOpacity={0.7}/></View>
          <Button style={{paddingTop: 30}} title="Changer son mot de passe" onPress={ () => setShowable(true) } color={Colors.primaryBlue} />
          <Button title="Se déconnecter" onPress={ disconnect } color={Colors.primaryBlue} />
          <View style={styles.allowButtonsStyle}>
            <Text>Localisation : </Text><Switch trackColor={Colors.primaryBlue}
                                                onChange={() => {
                                                  setAllowLocalisation(!allowLocalisation)
                                                }}
                                                value={allowLocalisation} />
          </View>
        </View>
        <Divider style={{ backgroundColor: Colors.primaryBlue, width: "50%", marginTop: 30, marginBottom: 30 }} />
      </ScrollView>
      <Overlay
        isVisible={showChangePassword}
        borderRadius={5}
        height="40%"
        onBackdropPress={() => {
          resetFields(setShowable, setOldPassword, setNewPassword, setConfirmPassword)
        }}
      >
        <View style={{padding: 20}}>
          <View style={ styles.rowForm }>
            <TextInput
              placeholder = "Ancien mot de passe"
              placeholderTextColor={Colors.grey}
              value = {oldPassword}
              secureTextEntry
              onChangeText = { (text) => setOldPassword(text) }
              style = { styles.input }
              maxLength={20}
              />
          </View>
          <View style={ styles.rowForm }>
            <TextInput
              autoCompleteType = "password"
              secureTextEntry
              placeholderTextColor={Colors.grey}
              placeholder = "Nouveau mot de passe"
              value = {newPassword}
              onChangeText = { (text) => setNewPassword(text) }
              style = { styles.input }
              maxLength={30}
              />
          </View>
          <View style={ styles.rowForm }>
            <TextInput
              autoCompleteType = "password"
              secureTextEntry
              placeholderTextColor={Colors.grey}
              placeholder = "Confirmez le nouveau mot de passe"
              value = {confirmPassword}
              onChangeText = { (text) => setConfirmPassword(text) }
              style = { styles.input }
              maxLength={30}
              />
          </View>
          { updatePasswordStatus ? <ActivityIndicator size="small" color={Colors.buttonBackground}/> :
              <ButtonNative onPress = { () => changePassword({"password": oldPassword, "new_password": newPassword}) }
                  buttonStyle={{
                    backgroundColor: Colors.buttonBackground
                  }}
                  disabled={newPassword !== confirmPassword}
                  style = {styles.button}
                  title="Valider"/>}
        </View>
      </Overlay>
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
  accountManager: {
    paddingTop: 30,
    alignItems: 'center',
    textAlign: 'center',
  },
  allowButtonsStyle: {
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  rowForm: {
    marginVertical: 10
  },
  input: {
    borderBottomWidth: 1,
    fontSize: Sizes.h3,
    height: Sizes.inputHeight,
    minWidth: "70%",
    margin: 5,
    borderBottomColor: Colors.primaryBlue
  },
  button: {
    marginTop: 50
  }
})

SettingsScreen.navigationOptions = {
  header: null
};
