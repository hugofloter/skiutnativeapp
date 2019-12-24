import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from "react-redux";
import { createStore } from "./api/state";
import FlashMessage from "react-native-flash-message";

import AppNavigator from './navigation/AppNavigator';
import ConnectScreen from "./screens/ConnectScreen";
import { isLogged, relog } from "./api/connect";
import { useSelector, useDispatch } from "react-redux";

const store = createStore({});

const ConnectHandler = () => {
  const dispatch = useDispatch()
  const relogUser = React.useCallback(() =>  dispatch(relog()), [dispatch])
  React.useEffect(() => {
    relogUser()
  }, []);

  const { logged } = useSelector(state => ({ logged: isLogged(state) }))

  if(!logged) {
    return <ConnectScreen />
  }

  return <AppNavigator/>
}
export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <ConnectHandler/>
        </Provider>
        <FlashMessage position="top" />
      </View>
    );
  }
}


async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/logo.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
