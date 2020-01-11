import React from "react";
import {
   Text,
   View,
   ScrollView,
   Platform,
   StyleSheet,
   Button,
   TextInput,
   TouchableOpacity
} from "react-native";
import Colors from "../../constants/Colors";
import { ScreenAddingTitle } from "../../components/ScreenTitle";
import { Input, Icon, ListItem } from "react-native-elements";
import Avatar from "../../components/avatar/avatar";
import { useSelector, useDispatch } from "react-redux";
import { groups as groupsAPI, users as usersAPI } from "../../api/state";
import MembersBlock from "./membersBlock/membersBlock";
import AutocompleteInput from "../../components/inputs/autocompleteInput";

const Form = ({ showEditer }) => {

  const inputTitle = React.createRef();

  const [name, setName] = React.useState('');
  const [data, setData] = React.useState({'users': []});

  const dispatch = useDispatch()

  const createGroup = React.useCallback((data) => {
    data['list_login'] = data.users.map(user => user.getKey());
    delete data['users'];
    dispatch(groupsAPI.create(data));
    showEditer(false);
  }, [dispatch]);

  const removeFromList = React.useCallback((user) => {
    const newList = data.users.filter(u => u.getKey() !== user.getKey())
    setData({...data, users: newList })
  }, [data, setData]);

  React.useEffect(() => {
      if (name && name.length) {
          setSendable(true)
      }
  }, [name])

  return (
    <View style = { styles.container }>
      <ScreenAddingTitle title="Création du Groupe" showEditer={showEditer}>
        <Button
          disabled={!data || !data.name || !data.name.length }
          onPress = { () => createGroup(data)}
          color = { Colors.primaryBlue }
          style={styles.button}
          title="Envoyer"/>
      </ScreenAddingTitle>
      <View style={ styles.contentContainer }>
        <Input placeholder="Le nom de ton groupe" inputStyle={ styles.input }
               onChangeText = { name => setData({...data, name})}
               value={ data.name } color={Colors.primaryBlue}
               leftIconContainerStyle={{marginRight: 15}}
               leftIcon={<Icon name='group' size={24} color={Colors.primaryBlue} />}
        />
      <View style={styles.membersContainer}>
        <View style={styles.membersBlock}>
          <MembersBlock
            users={data.users}
            editButton = {{ name:"cancel"}}
            onMemberPress = { removeFromList }
            />
        </View>
        <AutocompleteInput
          onSelect={ (user) => setData({...data, users:[...data.users, user]})}
          filterList={data.users}
          />
      </View>
       </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackgroud,
  },
  membersBlock: {
    height: 70,
  },
  contentContainer: {
    flex:1,
    marginTop: 20
  }  ,
  button: {
    color: Colors.primaryBlue,
  },
  input: {
    borderBottomColor: Colors.primaryBlue,
  },
  text: {
    fontSize: 18
  },
  membersContainer: {
    padding: 10,
    flex: 1,
  }
});

export default Form;
