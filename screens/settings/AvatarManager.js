import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Overlay, Divider,Button } from "react-native-elements";
import Avatar from "../../components/avatar/avatar";
import { useSelector, useDispatch } from "react-redux";
import { getConnectedUser, refreshData } from "../../api/connect";
import { users as usersAPI } from "../../api/state";
import { avatarImage } from "../../api/image";
import { Sizes, Colors } from "../../constants";
import ModalPicker from "../../components/images/modalPicker"
const AvatarManager = ({}) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => ({ currentUser: getConnectedUser(state) }));

  const [modalVisible, setVisible] = React.useState(false);

  const updateAvatar = React.useCallback(async (data) => {
    if(data && data.uri) {
      const { img_url } = await avatarImage(data.uri)
      data['img_width'] = data['width'];
      data['img_height'] = data['height'];
      data['img_url'] = img_url;

      delete data['uri'];
      delete data['width'];
      delete data['height'];
    }

    dispatch(usersAPI.update(data));
    setVisible(false);
    dispatch(refreshData())
  }, [dispatch])
  return (
    <View style={styles.container}>
      <TouchableOpacity style = {styles.container} onPress={() => setVisible(true)}>
        <Avatar user={ currentUser } size="large" showEditButton/>
      </TouchableOpacity>
      <ModalPicker isVisible={modalVisible} setVisible={setVisible} onValidate={updateAvatar}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center'
  },
})
export default AvatarManager;
