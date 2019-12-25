import * as Permissions from "expo-permissions";

export const getPermission = async (permission) => {
  const { status } = await Permissions.askAsync(Permissions[permission]);
  if(status !== 'granted') {
    return false;
  }
  return true;
}
