import React, {useState} from 'react';
import { Notifications } from 'expo';
import { useSelector, useDispatch } from "react-redux";
import {getConnectedUser, isLogged} from "../api/connect";
import {getPermission, askPermission} from "./permissions";
import {users as usersAPI} from "../api/state";

const _effect = async (currentUser, logged, createToken, handleNotifications) => {
  let permission = await getPermission('NOTIFICATIONS');
  
  if(!permission) {
    permission = await askPermission('NOTIFICATIONS');
  }

  if(logged && permission && !currentUser.getPushToken()) {
    registerForPushNotificationsAsync(createToken)
    Notifications.addListener(handleNotifications)
  }
}
export const NotificationMiddleware = () => {

  const { currentUser } = useSelector(state => ({ currentUser: getConnectedUser(state) }))
  const { logged } = useSelector(state => ({ logged: isLogged(state) }))

  const dispatch = useDispatch()
  const [notification, setNotification] = useState({})
  const createToken = React.useCallback((token) => dispatch(usersAPI.update({token: token})), [dispatch]);

  const handleNotifications = (notification) => {
    setNotification(notification)
  };

  React.useEffect(() => {
    _effect(currentUser, logged, createToken, handleNotifications);
  }, [logged])
};

async function registerForPushNotificationsAsync(createToken) {

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return createToken(token)
};
