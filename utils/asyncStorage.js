import { AsyncStorage } from "react-native";

export const storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) { return e}
}

export const retrieveStorage = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if(data !== null) {
      return await JSON.parse(data);
    }
    return {}
  } catch (e) { return e}
}

export const deleteStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) { return e}
}
