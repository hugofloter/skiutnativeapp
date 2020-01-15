import React from "react";
import { View, Text, Switch, StyleSheet, ActivityIndicator } from "react-native";

import { startLocationTask, stopLocationTask, LOCATION_STORAGE_NAME } from "../../utils/location";
import { retrieveStorage } from "../../utils/asyncStorage";
import { Colors } from "../../constants";

const getAuthorisationAsync = async (setPending, setState) => {
  setPending(true);
  const { authorisation } = await retrieveStorage(LOCATION_STORAGE_NAME);
  setState(Boolean(authorisation));
  setPending(false);
}

const Settings = () => {
  const [settings, setSettings] = React.useState({});
  const [pending, setPending] = React.useState(false);

  const startLocation = React.useCallback(async () => {
    const authorisation = await startLocationTask();
    setSettings({...settings, location: authorisation});
  }, [setSettings, settings, startLocationTask]);

  const stopLocation = React.useCallback(async() => {
    const authorisation = await stopLocationTask();
    setSettings({...settings, location: authorisation});
  }, [settings, setSettings, stopLocationTask])

  React.useEffect(() => {
    getAuthorisationAsync(setPending, (value) => setSettings({...settings, location: value }));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {
          pending ?
          <ActivityIndicator size="small"/>
          :
          <Switch
          trackColor={Colors.primaryBlue}
          value={Boolean(settings.location)}
          onChange = { () => { settings.location ? stopLocation() : startLocation() } }
          />
        }
        <Text style={styles.text}>Localisation</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  text: {
    marginLeft: 10,
    alignItems: 'center',
    textAlign: 'center'
  }
});

export default Settings;
