import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useDispatch, useSelector} from "react-redux";
import { useEffect } from 'react';

import { potins as potinsAPI } from "../api/state"

export default function PotinsScreen() {

  const dispatch = useDispatch()
  const getAllPotins = React.useCallback(() => dispatch(potinsAPI.list()), [dispatch]);
  const { potins } = useSelector(state => ({ potins: potinsAPI.getValuesFromState(state) }));

  useEffect(() => {
    getAllPotins()
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text> Potins : </Text>
        {
          potins.map(potin => (
              <Text key={ potin.getKey() }>{ potin.getTitle() } : {potin.getText()} - {potin.isAnonymous ? "Anonyme" : potin.getSender()}</Text>
          ))
        }
      </View>
    </ScrollView>
  );
}

PotinsScreen.navigationOptions = {
  title: 'Potins',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
