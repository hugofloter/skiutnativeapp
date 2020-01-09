import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import { Colors } from "../../constants";
import { Overlay, Button } from "react-native-elements";
import { groups as groupsAPI } from "../../api/state";
import { useDispatch } from "react-redux";

const Modal = ({ group, setVisible }) => {
  const dispatch = useDispatch();
  const validateInvitation = React.useCallback((id, data) => {
    dispatch(groupsAPI.updateOne(id, data));
    setVisible(null);
  }, [dispatch]);

  const declineInvitation = React.useCallback((id, data) => {
    dispatch(groupsAPI.delete(id, data));
    setVisible(null);
  }, [dispatch]);

  if(!group) {
    return null;
  }

  return (
    <Overlay
      isVisible={ Boolean(group) }
      borderRadius={ 5 }
      height="40%"
      onBackdropPress={ () => setVisible(null) }
      >
      <View style = { styles.container }>
        <Text>Veux tu réellement rejoindre el famoso groupe de { group.getOwner() }?</Text>
        <Button
          buttonStyle={styles.buttonValidate}
          style={styles.button}
          title="Accepter"
          onPress = { () => validateInvitation(group.getKey(), {"invitation": "V"}) }
          />
        <Button
          buttonStyle={styles.buttonDecline}
          style={styles.button}
          title="Refuser"
          onPress = { () => declineInvitation(group.getKey(), {"invitation": "A"}) }
          />
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  buttonValidate: {
    backgroundColor: Colors.buttonBackground,
    marginTop: 10,
  },
  buttonDecline: {
    backgroundColor: Colors.errorColor,
    marginTop: 10
  },
  button: {
    marginTop: 50
  },
});

export default Modal;
