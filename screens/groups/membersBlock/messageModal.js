import React from "react";
import {View, Text, StyleSheet, TextInput, ScrollView} from "react-native";
import { Overlay, Button, Input } from "react-native-elements";
import { Sizes, Colors } from "../../../constants";

/**
 * Modal to send personnalized message to user in group
 * @param {boolean} isVisible - to display the modal
 * @param {function} setVisible - to change the display
 * @param {function} onValidate - execute this method on validate
**/
const MessageModal = ({ isVisible, setVisible, onValidate }) => {

  const [data, setData] = React.useState({title: '', text: '', beer_call: true});

  const handleValidate = React.useCallback(() => {
    if (data && data.title) {
      onValidate(data);
      setVisible(false);
    }
  }, [onValidate, data]);

  return (
    <Overlay
      isVisible={ isVisible }
      borderRadius={ 5 }
      height="60%"
      onBackdropPress={() => { setVisible(false)}}
      >
      <View style={styles.container}>
        <Text style={styles.modalTitle}>Envoies ton message personnalisé aux membres du groupes !</Text>
        <Input placeholder="Le gros titre à envoyer en notification" placeholderTextColor={Colors.grey} value={ data.title }
                   onChangeText = { (title) => setData({...data, title }) }
                   style = { styles.input } maxLength = {20}
        />
        <TextInput
            placeholder="Mets plus d'informations ici pour que tes potes saches ce que tu veux"
            multiline
            numberOfLines={50}
            textAlignVertical="top"
            onChangeText={text => setData({...data, text})}
            value={data.text}
            style={styles.textInput}
        />
        <Button
          buttonStyle={styles.button}
          title="Envoyer"
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
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  memberBlock: {
    height: 60,
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
  input: {
    color: Colors.darkGrey,
    borderBottomWidth: 1,
    fontSize: Sizes.h3,
    height: Sizes.inputHeight,
    minWidth: "70%",
    borderBottomColor: Colors.primaryBlue
  },
   textInput: {
     height: '50%'
   },
});

export default MessageModal;
