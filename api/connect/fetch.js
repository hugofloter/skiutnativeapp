import { API_URL } from "../../config";
import { retrieveStorage, storeData } from "../../utils/asyncStorage";

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

      await storeData('@skiutcapp:key', response);

      return response;
    }
  ).catch((err) => err)
}
