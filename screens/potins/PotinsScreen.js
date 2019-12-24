import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  RefreshControl
} from 'react-native';

import {useDispatch, useSelector} from "react-redux";
import { useEffect } from 'react';
import colors from '../../constants/Colors';
import { potins as potinsAPI } from "../../api/state"
import Block from "../../components/blocks/Block";
import ScreenTitle from "../../components/ScreenTitle";
import PlusBlock from "../../components/blocks/PlusBlock";
import Form from "./form";

function fetchPotins(setFetched, fetch) {
  fetch()
  setFetched(true)
}

function PotinsScreen({ showEditer }) {

  const [potinFetched, setFetched] = React.useState(false)

  const dispatch = useDispatch()
  const getAllPotins = React.useCallback(() => dispatch(potinsAPI.list()), [dispatch]);
  const { potins } = useSelector(state => ({ potins: potinsAPI.getValuesFromState(state) }));

  useEffect(() => {
    fetchPotins(setFetched, getAllPotins)
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}
                  contentContainerStyle={styles.contentContainer}
                  refreshControl={
                      <RefreshControl
                          refreshing={!potinFetched}
                          onRefresh={() => fetchPotins(setFetched, getAllPotins)}
                          colors={[colors.primaryBlue]}
                          tintColor={colors.primaryBlue}
                      />
                  }>
        <ScreenTitle title="Potins">
          <PlusBlock icon="create" color={colors.white} action={() => showEditer(true)}/>
        </ScreenTitle>
        {
          potins.map(potin => (
            <Block
              key={potin.getKey()}
              title={potin.getTitle()}
              text={potin.getText()}
              info={potin.isAnonymous ? "Anonyme" : potin.getSender()}
              />
          ))
        }
      </ScrollView>
    </View>
  );
}


export const PotinsScreenManager = () => {
  const [editer, showEditer] = React.useState(false);

  if (editer) {
    return <Form showEditer={showEditer}/>
  }

  return <PotinsScreen showEditer={ showEditer }/>
}

PotinsScreenManager.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultBackgroud,
    padding: 5
  },
  contentContainer: {
    paddingTop: 30,
  }
});
