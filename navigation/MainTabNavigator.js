import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/home/HomeScreen';
import {InfosScreenManager} from '../screens/informations/InformationsScreen';
import GroupScreen from '../screens/groups/GroupScreenManager';
import SettingsScreen from '../screens/settings/SettingsScreen';
import {PotinsScreenManager} from '../screens/potins/PotinsScreen';
import { Colors } from "../constants";

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});


/**
 * Navigator button generator
 * @param {string} route - the named route of the component
 * @param {ReactComponent} component - the rendered screen
 * @param {string} label - the label of the navigation icon
 * @param {string} iosIcon
 * @param {string} androidIcon
 *@returns {function}
**/
const createNavigator = (route, component, label, iosIcon, androidIcon) => {
  const navigator = createStackNavigator(
    {
      [route]: component,
    },
    config
  );

  navigator.navigationOptions = {
    tabBarLabel: label,
    tabBarOptions: {
      activeTintColor: Colors.primaryBlue,
    },
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={ Platform.OS === "ios" ? `${iosIcon}` : `${androidIcon}`}
        />
    )
  }
  navigator.path = '';

  return navigator;
}

const tabNavigator = createBottomTabNavigator({
  HomeStack: createNavigator("Home", HomeScreen, "Actualités", "ios-notifications", "md-notifications"),
  InformationNavigator: createNavigator("Infos", InfosScreenManager, "Informations", "ios-information-circle", "md-information-circle"),
  GroupNavigator: createNavigator("Group", GroupScreen, "Groupes", "ios-beer", "md-beer"),
  PotinNavigator: createNavigator("Potins", PotinsScreenManager, "Potins", "ios-chatbubbles", "md-chatbubbles"),
  SettingsStack: createNavigator("Settings", SettingsScreen, "Paramètres", "ios-options", "md-options")
});

tabNavigator.path = '';

export default tabNavigator;
