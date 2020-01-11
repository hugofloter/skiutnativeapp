import React from "react";
import { Platform, Alert } from "react-native";
import { getPermission, askPermission } from "./permissions";
import { retrieveStorage, storeData, deleteStorage } from "./asyncStorage";
import { simpleFetch } from "../api";
import * as Location from "expo-location";
import * as TaskManager from 'expo-task-manager';

const LOCATION_TASK_NAME = 'background-location-task';
export const LOCATION_STORAGE_NAME = '@skiutcapp:location';

/**
 * Method to get the location permissions
 * We check the existing permission and if it is false we ask again
 * if permission is granted we store the authorisation in local storage
 * @returns {Boolean}
**/
export const locationPermission = async () => {
  const permission = await getPermission('LOCATION');

  if(permission === false) {
    const perm = await askPermission('LOCATION');
    if(perm) {
      await storeData('@skiutcapp:localisation', { authorisation: true });
    }
    return perm;
  }

  await storeData('@skiutcapp:localisation', { authorisation: true });
  return true;
}

/**
 * Display an alert message
 * @param {function} - onAccept method
 * @param {function} - onCancel method
 * @returns {function}
 **/
const _alert = () => {
  Alert.alert(
    'Localisation',
    "Votre localisation est désactivée. Activez la pour une meilleur expérience. L'application envoie votre dernière position connue, vous pouvez désactiver cette fonctionnalité dans les paramètres.",
    [
      {text: 'Ok'},
    ]
  )
}

/**
 * Check if the GPS service is active for android and ios
 * @return {Boolean}
 **/
const _serviceAvailable = async () => {
  const service = await Location.getProviderStatusAsync();

  switch(Platform.OS) {
    case 'android':
      return (service['gpsAvailable'] && service['locationServicesEnabled']);
    case 'ios':
      return (service['locationServicesEnabled']);
    default:
      return false;
  }

  return isAvailable;
}

/**
 * Method to handle the display of the service activation alert
 **/
export const locationServiceHandler = async () => {
  const available = await _serviceAvailable()

  if(!available) {
    _alert()
  }
}

/**
 * Method to start the Location Start
 * this task run in background
 **/
const _startLocationBackground = async () => {
    //configure the Location Manager
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.High,
      foregroundService: {
        notificationTitle: "Ski UTC",
        notificationBody: "L'application est autorisée à partager votre position",
      }
    })
  }

/**
 * This Method stop the task
**/
export const stopLocationTask = async () => {
  await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  await deleteStorage(LOCATION_STORAGE_NAME);

  return false;
}

/**
 * This Method start the task
**/
export const startLocationTask = async () => {

  await storeData(LOCATION_STORAGE_NAME, { authorisation: true });

  const { authorisation } = await retrieveStorage(LOCATION_STORAGE_NAME);
  if(authorisation){
    await _startLocationBackground();
  }

  return Boolean(authorisation);
}

/**
 * This Method start the task only if the authorisation is already stored
**/
export const locationAppStart = async () => {
  const { authorisation } = await retrieveStorage(LOCATION_STORAGE_NAME);
  if(authorisation){
    await _startLocationBackground();
  }
}


/**
 * TaskManager to handle the named LOCATION_TASK_NAME task
 * it will send the location to the api
 * if the storage LOCATION_STORAGE_NAME has authorisation stored
**/
export const locationTaskManager = () => TaskManager.defineTask(LOCATION_TASK_NAME, async ({data, error}) => {
  if(error) {
    return;
  }

  const { authorisation } = await retrieveStorage(LOCATION_STORAGE_NAME);
  if(!authorisation) {
    return;
  }

  if(data) {
    const { locations } = data;
    if(locations.length) {
      const { coords } = locations[0];
      simpleFetch('/users', {
        method: 'PUT',
        data: { 'location': coords }
      })
    }
  }
})
