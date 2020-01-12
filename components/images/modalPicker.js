import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Overlay, Divider,Button,  Avatar } from "react-native-elements";
import { Sizes, Colors } from "../../constants";
import * as Picker from "expo-image-picker";
import { getPermission, askPermission } from "../../utils/permissions";

export const handlePermission = async (permissionType) => {
  const permission = await getPermission(permissionType);

  if(permission === false) {
    await askPermission(permissionType);
    return
  }
};

const ModalPicker = ({ isVisible, setVisible, onValidate }) => {

  const [image, setImage] = React.useState(null);

  const cameraPicker = React.useCallback(async () => {
    await handlePermission('CAMERA');
    await handlePermission('CAMERA_ROLL');

    const result = await Picker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
      mediaTypes: Picker.MediaTypeOptions.All,
      aspect: [4,4]
    })
    setImage(result);
  }, [handlePermission, setImage]);

  const imagePicker = React.useCallback(async () => {
    await handlePermission('CAMERA_ROLL');

    const result = await Picker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: Picker.MediaTypeOptions.All,
      aspect: [4,4]
    })
    setImage(result);
  }, [handlePermission, setImage]);

  const handleValidate = React.useCallback(() => {
    if(image && image.uri) {
      onValidate(image);
    }
  }, [onValidate, image, setVisible]);

  return (
    <Overlay
      isVisible={isVisible}
      borderRadius={5}
      height="50%"
      onBackdropPress={() => { setVisible(false); setImage(null); }}
      >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Changer mon avatar</Text>
        <Divider style={ styles.divider }/>
        {
          image && image.uri ?
          <React.Fragment>
            <Avatar rounded source={{ uri: image.uri }} size="large"/>
            <Button title="Valider" buttonStyle={styles.button} onPress={handleValidate}/>
          </React.Fragment>
          :
          null
        }
        <Divider style={ styles.divider }/>
        <Button title="Images de l'appareil" buttonStyle={styles.button} onPress={imagePicker}/>
        <Button title="Prendre une photo" buttonStyle={styles.button} onPress={cameraPicker}/>
        <Button title="Annuler" buttonStyle={styles.buttonDiff} onPress={() => { setVisible(false); setImage(null); }}/>
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: 'center',
    textAlign: 'center'
  },
  modalTitle: {
    textAlign: 'center',
    color: Colors.darkGrey,
    fontSize: Sizes.h3,
    padding: 5,
  },
  divider: {
    height: 1,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.primaryBlue,
    margin: 5,
    minWidth: '70%',
  },
  buttonDiff: {
    backgroundColor: Colors.buttonBackground,
    margin: 5,
    minWidth: '70%',
  },
})

export default ModalPicker
