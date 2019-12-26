import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  RefreshControl,
  Animated,
  I18nManager
} from 'react-native';

import {useDispatch, useSelector} from "react-redux";
import { useEffect } from 'react';
import colors from '../../constants/Colors';
import {potins as potinsAPI, potinsAdmin as potinsAdminAPI, users as usersAPI} from "../../api/state"
import Block from "../../components/blocks/Block";
import ScreenTitle from "../../components/ScreenTitle";
import PlusBlock from "../../components/blocks/PlusBlock";
import Form from "./form";
import { getConnectedUser } from "../../api/connect"
import { showMessage } from "react-native-flash-message";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

function fetchPotins(setFetched, fetch) {
  fetch()
  setFetched(true)
}

/**
 * Screen user for potin
 *
 * @param showEditer
 * @param showAdmin
 * @param isAdmin
 * @returns {*}
 * @constructor
 */
function PotinsScreen({ showEditer, showAdmin, isAdmin }) {

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
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                      <RefreshControl
                          refreshing={!potinFetched}
                          onRefresh={() => fetchPotins(setFetched, getAllPotins)}
                          colors={[colors.primaryBlue]}
                          tintColor={colors.primaryBlue}
                      />
                  }>
        <ScreenTitle title="Potins">
          <PlusBlock icon="create" adminIcon="settings-applications" color={colors.white}
                     isAdmin={isAdmin}
                     action={() => showEditer(true)}
                     adminAction={() => showAdmin(true)}
          />
        </ScreenTitle>
        {
          potins.map(potin => (
            <Block
              key={potin.getKey()}
              title={potin.getTitle()}
              text={potin.getText()}
              info={potin.getAnonymous() ? "Anonyme" : potin.getSender()}
              />
          ))
        }
      </ScrollView>
    </View>
  );
}

/**
 * Screen Admin for potin
 *
 * @param showEditer
 * @param showAdmin
 * @param isAdmin
 * @returns {*}
 * @constructor
 */
function AdminPotinScreen({ showEditer, showAdmin, isAdmin }) {

  const [potinFetched, setFetched] = React.useState(false)

  const dispatch = useDispatch()
  const getAdminPotins = React.useCallback(() => dispatch(potinsAdminAPI.list()), [dispatch]);
  const approvePotin = React.useCallback((id) => dispatch(potinsAPI.updateOne(id)), [dispatch]);
  const deletePotin = React.useCallback((id) => dispatch(potinsAPI.delete(id)), [dispatch]);
  const resetUpdate = React.useCallback(() => dispatch(potinsAPI.resetUpdate()), [dispatch])
  const { adminPotins, statusUpdate } = useSelector(state => ({ adminPotins: potinsAdminAPI.getValuesFromState(state), statusUpdate: potinsAPI.getStatusFromState(state) }));

  useEffect(() => {
    fetchPotins(setFetched, getAdminPotins)
  }, [])

  React.useEffect(() => {

    if (statusUpdate === true) {
        resetUpdate()
        showMessage({
           message: "Potin updated !",
           type: "success",
        });
        fetchPotins(setFetched, getAdminPotins)
    } else if (statusUpdate === false) {
        resetUpdate()
        showMessage({
           message: "Un erreur est survenue, ré-essayes !",
           type: "error",
        });
        fetchPotins(setFetched, getAdminPotins)
    }
  },[statusUpdate])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}
                  contentContainerStyle={styles.contentContainer}
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                      <RefreshControl
                          refreshing={!potinFetched}
                          onRefresh={() => fetchPotins(setFetched, getAdminPotins)}
                          colors={[colors.primaryBlue]}
                          tintColor={colors.primaryBlue}
                      />
                  }>
        <ScreenTitle title="Admin Potins">
          <PlusBlock icon="create" adminIcon="backspace" color={colors.white}
                     isAdmin={isAdmin}
                     action={() => showEditer(true)}
                     adminAction={() => showAdmin(false)}
          />
        </ScreenTitle>
        {
          adminPotins.map(potin => (
            <Swipeable
            key={potin.getKey()}
            leftThreshold={30}
            rightThreshold={40}
            renderRightActions={(prog) => renderRightActions(prog, [approvePotin, deletePotin], potin.getKey())}>
              <Block
                key={potin.getKey()}
                title={potin.getTitle()}
                text={potin.getText()}
                info={potin.getAnonymous() ? "Anonyme" : potin.getSender()}
                adminBlock={true}
                />
            </Swipeable>
          ))
        }
      </ScrollView>
    </View>
  );
}


/**
 * renderer for swipeable element
 *
 * @param progress
 * @param actions
 * @param potinId
 * @returns {*}
 */
const  renderRightActions = (progress, actions, potinId) => (

    <View style={{ width: 140, flexDirection: I18nManager.isRTL? 'row-reverse' : 'row' }}>
      {renderRightAction('Valider', colors.successColor, 100, progress, actions[0], potinId)}
      {renderRightAction('Refuser', colors.errorColor, 50, progress, actions[1], potinId)}
    </View>
);

const renderRightAction = (text, color, x, progress, action, potinId) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    const pressHandler = () => {
      action(potinId)
    };

    return (
      <Animated.View style={{transform: [{ translateX: trans }], ...styles.swipedZone }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };


/**
 * Potin manager screen
 *
 * @returns {*}
 * @constructor
 */
export const PotinsScreenManager = () => {
  const [editer, showEditer] = React.useState(false);
  const [admin, showAdmin] = React.useState(false);
  const { isAdmin }  = useSelector(state => ({ isAdmin: getConnectedUser(state).getAdmin() }))

  const dispatch = useDispatch()

  const resetCurrent = React.useCallback(() => dispatch(potinsAPI.resetCurrent()), [dispatch]);
  const { resPotin } = useSelector(state => ({ resPotin: potinsAPI.getCurrentFromState(state) }));

  useEffect(() => {
    if (resPotin) {
      if (resPotin.error) {
        showMessage({
           message: "Un problème a été détecté !",
           type: "error",
        });
      } else {
        showMessage({
           message: "Ton potin a bien été envoyé bg !",
           type: "success",
        });
      }
      resetCurrent()
    }
  }, [resPotin])

  if (editer) {
    return <Form showEditer={showEditer}/>
  }

  if (admin) {
    return <AdminPotinScreen showEditer={ showEditer } showAdmin={ showAdmin } isAdmin={ isAdmin } />
  }

  return <PotinsScreen showEditer={ showEditer } showAdmin={ showAdmin } isAdmin={ isAdmin } />
}

PotinsScreenManager.navigationOptions = {
  header: null,
};


/**
 *
 *
 * @type {StyleSheet.NamedStyles<T> | any}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultBackgroud,
    padding: 5
  },
  contentContainer: {
    paddingTop: 30,
  },
  swipedZone: {
    alignItems: 'center',
    flexDirection: 'row',
    height: "auto"
  },
  actionText: {
    color: colors.white,
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
});
