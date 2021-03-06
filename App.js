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
import { NotificationMiddleware } from "./utils/notifications";
import {
  locationPermission,
  locationAppStart,
  locationTaskManager, locationServiceHandler } from "./utils/location";

const store = createStore({});
locationTaskManager();

const ConnectHandler = () => {
  const dispatch = useDispatch()
  const relogUser = React.useCallback(() =>  dispatch(relog()), [dispatch])
  const { logged } = useSelector(state => ({ logged: isLogged(state) }))

  React.useEffect(() => {
    relogUser();
  }, []);

  NotificationMiddleware();

  if(!logged) {
    return <ConnectScreen />
  }

  return <AppNavigator />
}

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  //initialisation phase
  React.useEffect(() => {
    locationPermission();
    locationServiceHandler();
    locationAppStart();
  }, []);

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
          <StatusBar barStyle="dark-content" />
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
      require('./assets/images/SlopesMap.png'),
      require('./assets/images/planning.png'),
      require('./assets/images/urgence.png'),
      require('./assets/images/app.png'),
      require('./assets/images/popo.jpg'),
      require('./assets/images/valou.jpg'),
      require('./assets/images/valere.jpg'),
      require('./assets/images/julie.jpg'),
      require('./assets/images/camille.jpg'),
      require('./assets/images/clem.jpg'),
      require('./assets/images/tim.jpg'),
      require('./assets/images/skieur.png'),
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
