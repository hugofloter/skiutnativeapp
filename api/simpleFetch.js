import { API_URL } from "../config";
import {retrieveStorage } from "../utils/asyncStorage";

export const simpleFetch = async (path, options = {}) => {
  const headers = options.headers = options.headers || {};

  const authorization = await retrieveStorage('@skiutcapp:key');
  if(authorization && authorization.token) {
    headers['Authorization'] = authorization.token;
  }

  headers['Content-Type'] = 'application/json';

  options.body = options.data ?  JSON.stringify(options.data) : {};
  delete options.data;


  return fetch(`${API_URL}${path}`, options).then(
    async (response) =>  {
      if(!response.ok) {
        throw response.message;
      }
      const contentType = response.headers.get('Content-Type') || '';
      if(contentType.indexOf('application/json') === -1) {
        return null;
      }
      response = await response.json();
      return response;
    }
  ).catch((err) => err);
}
