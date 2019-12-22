import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl
} from 'react-native';

import {useDispatch, useSelector} from "react-redux";
import { useEffect } from 'react';
import colors from '../constants/Colors';
import { potins as potinsAPI } from "../api/state"

function fetchPotins(setFetched, fetch) {
  fetch()
  setFetched(true)
}

export default function PotinsScreen() {

  const [potinFetched, setFetched] = React.useState(false)

  const dispatch = useDispatch()
  const getAllPotins = React.useCallback(() => dispatch(potinsAPI.list()), [dispatch]);
  const { potins } = useSelector(state => ({ potins: potinsAPI.getValuesFromState(state) }));

  useEffect(() => {
    fetchPotins(setFetched, getAllPotins)
  }, [])

  return (
    <ScrollView style={styles.container}
                refreshControl={
					<RefreshControl
						refreshing={!potinFetched}
						onRefresh={() => fetchPotins(setFetched, getAllPotins)}
						colors={[colors.primaryBlue]}
						tintColor={colors.primaryBlue}
					/>
				}>
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
