import React from 'react';
import { getImage } from "../api/image";
import { Avatar as NativeAvatar } from "react-native-elements";

const Avatar = ({ user, ...params }) => {
  if(user.getAvatar()) {
    const {img_url, img_width, img_height} = user.getAvatar();
    return (
      <NativeAvatar
        rounded
        source={{ uri: getImage(img_url)}}
        {...params}
      />
    )
  }
  return (
    <NativeAvatar
      rounded
      title = { `${user.getFirstname()[0]}${user.getLastname()[0]}` }
      {...params}
      />
  )
}

export default Avatar;
