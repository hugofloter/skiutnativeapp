import { API_URL } from "../../config";
import { AsyncStorage } from "react-native";

export const fetch_ = async(options={}) => {
  const headers =  options.headers = options.headers || {};
  headers['Content-Type'] = "application/json";
  options.method = "POST";
  options.body = options.data ? JSON.stringify(options.data) : {};
  delete options.data;

  return fetch(`${API_URL}/authenticate`, options).then(
    async (response) => {
      if(!response.ok) {
        throw response.message;
      }
      const contentType = response.headers.get('Content-Type') || '';
      if(contentType.indexOf('application/json') === -1) {
        return null;
      }
      response = await response.json();

      await _storeData(response);

      return response;
    }
  ).catch((err) => err)
}

const _storeData = async (data) => {
  try {
    await AsyncStorage.setItem('@skiutcapp:key', JSON.stringify(data))
  }

  catch (error) {
    return error
  }
}

export const retrieveStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('@skiutcapp:key');
    if(value !== null) {
      return await JSON.parse(value)
    }
  } catch (error) {
    return error
  }
}

export const deleteStorage = async () => {
  try {
    await AsyncStorage.removeItem('@skiutcapp:key')
  }
  catch (error) {
    return error
  }
}
