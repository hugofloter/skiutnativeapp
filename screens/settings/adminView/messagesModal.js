import React from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, CheckBox } from "react-native";
import { Overlay, Button, Divider } from "react-native-elements";
import { Sizes, Colors } from "../../../constants";

/**
 * Modal to add new users to a group
 * @param {boolean} isVisible - to display the modal
 * @param {function} setVisible - to change the display
 * @param {function} onValidate - execute this method on validate
 * @param {array} currentUsers - list of users not to display in the autoComplete list
**/
const MessageModal = ({ isVisible, setVisible, onValidate }) => {

  const [data, setData] = React.useState({ type:"text" })

  const close = React.useCallback(() => {
    setData({ type: "text" })
    setVisible(false)
  }, [setVisible, setData]);

  const handleValidate = React.useCallback(() => {
    if(data.text) {
      onValidate(data);
      close()
    }
  }
  , [setData, data, setVisible])

  return (
    <Overlay
      isVisible={ isVisible }
      borderRadius={ 5 }
      height="60%"
      onBackdropPress={close}
      >
      <View style={styles.container}>
        <Text style={styles.modalTitle}>Ajouter un message pour le Bot</Text>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          >
          <TextInput
            placeholder="le message du bot"
            multiline
            numberOfLines={9}
            textAlignVertical="top"
            onChangeText={(text) => setData({...data, text})}
            value={data.text}
            style={styles.textInput}
            />
        </ScrollView>
        <View style={styles.checkboxContainer}>
          <View style ={ styles.checkbox}>
            <CheckBox
              checkedColor={Colors.primaryBlue}
              value={data.type === "image"}
              onChange={() => setData({...data, type:"image"})}
              />
            <Text>Image</Text>
          </View>
          <View style ={ styles.checkbox}>
            <CheckBox
              checkedColor={Colors.primaryBlue}
              value={data.type === "text"}
              onChange={() => setData({...data, type:"text"})}
              />
            <Text>Texte</Text>
          </View>
          <View style ={ styles.checkbox}>
            <CheckBox
              checkedColor={Colors.primaryBlue}
              value={data.type === "new"}
              onChange={() => setData({...data, type:"new"})}
              />
            <Text>New</Text>
          </View>
          <View style ={ styles.checkbox}>
            <CheckBox
              checkedColor={Colors.primaryBlue}
              value={data.type === "other"}
              onChange={() => setData({...data, type:"other"})}
              />
            <Text>Autre</Text>
          </View>
        </View>
        <Button
          buttonStyle={styles.button}
          title="Ajouter"
          disabled={Boolean(!data.text || !data.text.length)}
          onPress={ handleValidate }
          />
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    backgroundColor: Colors.primaryBlue
  },
  button: {
    backgroundColor: Colors.buttonBackground,
    margin: 5,
    minWidth: '70%',
  },
  checkboxContainer: {
    flexDirection: 'row'
  },
  checkbox: {
    marginHorizontal: 5,
  }
});

export default MessageModal;
