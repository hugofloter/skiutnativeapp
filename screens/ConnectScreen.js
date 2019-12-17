import React from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  Separator,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Colors, Sizes } from "../constants";
import { login as loginAPI, isLogged, isPending } from "../api/connect";
import { useSelector, useDispatch } from "react-redux";

export default function ConnectScreen(){

  const [login, setLogin ] = React.useState(null);
  const [password, setPassword] = React.useState(null);


  const { pending, logged }  = useSelector(state => ({ pending: isPending(state), logged: isLogged(state) }))
  const dispatch = useDispatch()

  const handleLogin = React.useCallback(() => dispatch(loginAPI({ login, password })), [login, password, dispatch]);

  return (
    <View style={ styles.container }>
      <View style={ styles.titleContainer}>
        <Text style={ styles.title }>Connection</Text>
      </View>
      <View style={ styles.rowForm }>
        <Text style={ styles.text }>Login</Text>
        <TextInput
          autoCompleteType = "username"
          placeholder = "Login"
          value = {login}
          onChangeText = { (text) => setLogin(text) }
          style = { styles.input }
          />
      </View>
      <View style={ styles.rowForm }>
        <Text style={ styles.text }>Password</Text>
        <TextInput
          autoCompleteType = "password"
          secureTextEntry
          placeholder = "Password"
          value = {password}
          onChangeText = { (text) => setPassword(text) }
          style = { styles.input }
          />
      </View>
      { pending ? <ActivityIndicator size="small" color={Colors.tintColor }/> : <Button onPress = { handleLogin } title="Se connecter"/>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 50,
  },
  titleContainer: {
    justifyContent: 'center',
    marginBottom: 50,
  },

  rowForm: {
    marginVertical: 10
  },

  title: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: Sizes.h1,
    color: Colors.tintColor,
    fontWeight: 'bold',
  },
  text: {
    fontWeight: 'bold',
    fontSize: Sizes.h3,
    color: Colors.black,
  },
  input: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.black,
  }
})
