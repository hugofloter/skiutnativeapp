import { Notifications } from 'expo';

export default async function registerForPushNotificationsAsync(createToken) {

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return createToken(token)
};
