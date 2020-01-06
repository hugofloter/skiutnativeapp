import { API_URL } from "../../config";
import { retrieveStorage } from "../../utils/asyncStorage";

export const fetch_ = async(path, fileURI, options={}) => {

  const formData = new FormData()

  const headers = options.headers = options.headers || {};
  const authorization = await retrieveStorage('@skiutcapp:key');
  if(authorization && authorization.token) {
    headers['Authorization'] = authorization['token'];
  }

  options.method = "POST";

  headers['Content-Type'] = 'multipart/form-data';

  const uriParts = fileURI.split('.');
  const fileType = uriParts[uriParts.length -1];
  const filename = fileURI.substring(fileURI.lastIndexOf('/') + 1);

  formData.append('image', {
    uri: fileURI,
    type: `image/${fileType}`,
    name: filename,
  }, filename)

  options.body = formData;
  return fetch(`${API_URL}${path}`, options).then(
    async (response) => {
      if(!response.ok) {
        throw response.message;
      }
      const contentType = response.headers.get('Content-Type') || '';
      if(contentType.indexOf('application/json') === -1) {
        return null;
      }
      response = await response.json();

      return response
    }
  ).catch((err) => err)
}
