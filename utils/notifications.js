import React, {useState} from 'react';
import { Notifications } from 'expo';
import { useSelector, useDispatch } from "react-redux";
import {getConnectedUser, isLogged} from "../api/connect";
import {getPermission} from "./permissions";
import {users as usersAPI} from "../api/state";

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
    if (logged && getPermission('NOTIFICATIONS') && !currentUser.getPushToken()) {
      console.log("push token")
      registerForPushNotificationsAsync(createToken)
      Notifications.addListener(handleNotifications)
    }
  }, [logged])
};

async function registerForPushNotificationsAsync(createToken) {

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return createToken(token)
};
