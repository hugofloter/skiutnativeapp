import React from 'react';
import { getImage } from "../api/image";
import { Avatar as NativeAvatar } from "react-native-elements";

const Avatar = ({ user, ...params }) => {
  // TODO: implement user.getImageURI()
  /*
  if(user.getImageURI()) {
    return (
      <NativeAvatar
        rounded
        source={{ uri: getImage(user.getImageURI())}}
        {...params}
      />
    )
  }
  */
  return (
    <NativeAvatar
      rounded
      title = { `${user.getFirstname()[0]}${user.getLastname()[0]}` }
      {...params}
      />
  )
}

export default Avatar;
