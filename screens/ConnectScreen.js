import React, {useEffect} from "react";
import {
  View,
  TextInput,
  Text,
  Separator,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { Colors, Sizes } from "../constants";
import { login as loginAPI, isLogged, isPending, errorLog, clear as clearAPI } from "../api/connect";
import { useSelector, useDispatch } from "react-redux";
import { Button } from 'react-native-elements';

export default function ConnectScreen(){

  const [login, setLogin ] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const { pending, logged }  = useSelector(state => ({ pending: isPending(state), logged: isLogged(state) }))
  const dispatch = useDispatch()

  const handleLogin = React.useCallback(() => dispatch(loginAPI({ login, password })), [login, password, dispatch]);

  return (
    <View style={ styles.container }>
      <View style={ styles.titleContainer}>
        <Image
            style={styles.logo}
            source={require("../assets/images/logo-valdallos.png")}
        />
      </View>
      <View style={ styles.rowForm }>
        <TextInput
          autoCompleteType = "username"
          placeholder = "Login"
          value = {login}
          onChangeText = { (text) => setLogin(text) }
          style = { styles.input }
          maxLength={20}
          />
      </View>
      <View style={ styles.rowForm }>
        <TextInput
          autoCompleteType = "password"
          secureTextEntry
          placeholder = "Password"
          value = {password}
          onChangeText = { (text) => setPassword(text) }
          style = { styles.input }
          maxLength={30}
          />
      </View>
      { pending ? <ActivityIndicator size="small" color={Colors.buttonBackground}/> : <Button onPress = { handleLogin }
                                                                                       buttonStyle={{
                                                                                         backgroundColor: Colors.buttonBackground
                                                                                       }}
                                                                                       style = {styles.button}
                                                                                       title="Se connecter"/>}
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
    margin: 100,
    justifyContent: 'center'
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
    borderBottomWidth: 1,
    fontSize: Sizes.h3,
    height: Sizes.inputHeight,
    minWidth: "70%",
    margin: 5,
    borderBottomColor: Colors.tintColor,
  },
  button: {
    marginTop: 50
  },
  logo: {
    width: 165,
    height: 130,
  }
})
