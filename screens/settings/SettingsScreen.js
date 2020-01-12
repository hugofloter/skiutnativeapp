import React from "react";
import {View, ScrollView, Text, Button, Alert, StyleSheet, RefreshControl} from "react-native";
import { Divider } from "react-native-elements";
import { Colors, Sizes } from "../../constants";
import { getConnectedUser, logout } from "../../api/connect";
import { useDispatch, useSelector } from "react-redux";
import { BarCodeScanner } from 'expo-barcode-scanner';
import Modal from "./modal";
import ScreenTitle from "../../components/ScreenTitle";
import Settings from "./settings";
import Avatar from "./AvatarManager";
import { handlePermission } from "../../utils/permissions";
import { qrcode as qrcodeAPI } from "../../api/state"
import AdminView from "./AdminView"

const SettingsScreen = () => {
  const [modal, showModal] = React.useState(false);
  const [fetched, setFetched] = React.useState(false);

  const [scanned, setScanned] = React.useState(true);

  const { user } = useSelector(state => ({ user: getConnectedUser(state)}));
  const dispatch = useDispatch();

  const disconnect = React.useCallback(() => dispatch(logout()), [dispatch]);
  const getAnimationInfos = React.useCallback(() => {
    dispatch(qrcodeAPI.list());
    setFetched(true);
  }, [dispatch, setFetched, fetched]);

  const unlockLevel = React.useCallback((key) => dispatch(qrcodeAPI.retrieve(key)), [dispatch]);
  const resetCurrent = React.useCallback(() => dispatch(qrcodeAPI.resetCurrent()), [dispatch]);

  const { animation, onSuccess, currentUser } = useSelector(state => ({ animation: qrcodeAPI.getValuesFromState(state)[0], onSuccess: qrcodeAPI.getCurrentFromState(state), currentUser: getConnectedUser(state) }));

  React.useEffect(() => {
    getAnimationInfos()
  }, []);

  const QRScan = React.useCallback(async () => {
    await handlePermission('CAMERA');
    await handlePermission('CAMERA_ROLL');
    setScanned(false)
  }, [handlePermission]);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    const key = data.substr(data.lastIndexOf('/') + 1);
    unlockLevel(key);
    Alert.alert('SUCCESS','QRCode scanné !');
  };

  React.useEffect(() => {
    if (onSuccess) {
      getAnimationInfos();
      resetCurrent();
    }
  }, [onSuccess]);

  return (
    <View style={styles.container}>
      <ScreenTitle title="Paramètres"/>
      <ScrollView
        style={ styles.container }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
            <RefreshControl
                refreshing={!fetched}
                onRefresh={() => getAnimationInfos() }
                colors={[Colors.primaryBlue]}
                tintColor={Colors.primaryBlue}
            />
        }>
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
        <Divider style={styles.divider}/>
        {scanned && <Button title="Scan ton QRCode" style={styles.button} onPress={() => QRScan()} color = { Colors.primaryBlue }/>}
        <View>
          <Text>Tu es actuellement au niveau {animation && animation.getLevel()} (sur 9)</Text>
        </View>
        {currentUser.getAdmin() ? <AdminView /> : null}
        {!scanned && <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject}/>}
        {!scanned && <Button title="Retour" style={styles.button} onPress={() => setScanned(true)} color = { Colors.primaryBlue }/>}
      </ScrollView>
      <Modal isVisible={ modal } setVisible={ showModal }/>
    </View>
  )
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackgroud,
    padding: 5,
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
};
