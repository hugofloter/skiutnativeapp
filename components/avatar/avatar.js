import React from 'react';
import { getImage } from "../../api/image";
import { Avatar as NativeAvatar } from "react-native-elements";
import { Colors } from "../../constants";

const Avatar = ({ user, ...params }) => {
  if(user.getAvatar()) {
    const {img_url, img_width, img_height} = user.getAvatar();
    return (
      <NativeAvatar
        rounded
        source={{ uri: getImage(img_url)}}
        overlayContainerStyle={user.getStatus() === 'P' ? {opacity: 0.2} : null}
        {...params}
      />
    )
  }
  return (
    <NativeAvatar
      rounded
      title = { `${user.getFirstname()[0]}${user.getLastname()[0]}` }
      overlayContainerStyle = {{ backgroundColor: Colors.primaryBlue, opacity: (user.getStatus() === 'P' ? 0.2 : 1)}}
      activeOpacity={0.7}
      {...params}
      />
  )
}

export default Avatar;
