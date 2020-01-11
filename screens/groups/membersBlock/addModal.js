import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Overlay, Button, Divider } from "react-native-elements";
import { Sizes, Colors } from "../../../constants";
import MembersBlock from "./membersBlock";
import AutocompleteInput from "../../../components/inputs/autocompleteInput";

import { useDispatch } from "react-redux";
/**
 * Modal to add new users to a group
 * @param {boolean} isVisible - to display the modal
 * @param {function} setVisible - to change the display
 * @param {function} onValidate - execute this method on validate
 * @param {array} currentUsers - list of users not to display in the autoComplete list
**/
const AddModal = ({ isVisible, setVisible, onValidate, currentUsers= []}) => {

  const [selectedUsers, setSelectedUsers] = React.useState([]);

  const handleValidate = React.useCallback(() => {
    const logins = selectedUsers.map(user => user.getKey() )
    onValidate(logins);
    setSelectedUsers([]);
    setVisible(false);
  }, [selectedUsers, onValidate]);

  const removeFromList = React.useCallback((user) => {
    const newList = selectedUsers.filter(u => u.getKey() !== user.getKey());
    setSelectedUsers(newList);
  }, [setSelectedUsers, selectedUsers])
  return (
    <Overlay
      isVisible={ isVisible }
      borderRadius={ 5 }
      height="60%"
      onBackdropPress={() => { setSelectedUsers([]); setVisible(false)}}
      >
      <View style={styles.container}>
        <Text style={styles.modalTitle}>Ajouter un utilisateur au groupe</Text>
        <View style={styles.memberBlock}>
          <MembersBlock
            users={selectedUsers}
            size="small"
            editButton={{name: 'cancel'}}
            onMemberPress={ removeFromList }
            />
        </View>
        <AutocompleteInput
          onSelect={ (user) => setSelectedUsers([...selectedUsers, user]) }
          filterList={[...selectedUsers, ...currentUsers]}
          />
        <Button
          buttonStyle={styles.button}
          title="Ajouter"
          disabled={Boolean(!selectedUsers || !selectedUsers.length)}
          onPress={ handleValidate }
          />
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  memberBlock: {
    height: 60,
  },
  modalTitle: {
    textAlign: 'center',
    color: Colors.darkGrey,
    fontSize: Sizes.h3,
    padding: 5,
  },
  divider: {
    height: 1,
    marginBottom: 10,
    backgroundColor: Colors.primaryBlue
  },
  button: {
    backgroundColor: Colors.buttonBackground,
    margin: 5,
    minWidth: '70%',
  },
});

export default AddModal;
