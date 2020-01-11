import React from "react";
import { Overlay } from "react-native-elements";
import { View, Button, TextInput, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Colors, Sizes } from "../../constants";
import { users as usersAPI } from "../../api/state";

const Modal = ({ isVisible ,setVisible }) => {

  const [data, setData] = React.useState({})

  const resetForm = React.useCallback(() => {
    setVisible(false);
    setData({});
  }, [setData, setVisible]);

  const dispatch = useDispatch();
  const changePassword = React.useCallback(() => {
    dispatch(usersAPI.update(data));
    resetForm();
  }, [dispatch, data, setVisible]);

  return (
    <Overlay
      isVisible={ isVisible }
      borderRadius={ 5 }
      height = "50%"
      onBackdropPress = { resetForm }
      >
      <View style={styles.container}>
        <View style = {styles.rowForm}>
          <TextInput
            placeholder="Ancien mot de passe"
            placeholderTextColor={Colors.grey}
            value={ data.password }
            secureTextEntry
            onChangeText = { (password) => setData({...data, password }) }
            style = { styles.input }
            maxLength = {20}
            />
        </View>
        <View style = {styles.rowForm}>
          <TextInput
            placeholder="Nouveau mot de passe"
            placeholderTextColor={Colors.grey}
            value={ data['new_password'] }
            secureTextEntry
            onChangeText = { (new_password) => setData({...data, new_password }) }
            style = { styles.input }
            maxLength = {20}
            />
        </View>
        <View style = {styles.rowForm}>
          <TextInput
            placeholder="Confirmer nouveau mot de passe"
            placeholderTextColor={Colors.grey}
            value={ data['new_password2'] }
            secureTextEntry
            onChangeText = { (new_password2) => setData({...data, new_password2 }) }
            style = { styles.input }
            maxLength = {20}
            />
        </View>
        <Button
          disabled = { !(data.password && data.new_password && data.new_password2 && (data.new_password === data.new_password2)) }
          title = "Valider"
          color = { !(data.password && data.new_password && data.new_password2 && (data.new_password === data.new_password2)) ? Colors.grey : Colors.buttonBackground }
          style = {styles.button}
          onPress = { changePassword }
          />
      </View>
    </Overlay>
  )
}

export default Modal;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  rowForm: {
    marginVertical: 10,
  },
  input: {
    color: Colors.darkGrey,
    borderBottomWidth: 1,
    fontSize: Sizes.h3,
    height: Sizes.inputHeight,
    minWidth: "70%",
    margin: 5,
    borderBottomColor: Colors.primaryBlue
  },
  button: {
    marginTop: 50,
  }

})
