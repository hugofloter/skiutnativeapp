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
import { Input } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { groups as groupsAPI, users as usersAPI } from "../../api/state";

const Form = ({ showEditer }) => {

  const [data, setData] = React.useState({name: '', list_login: []});
  const [userTag, setUserTag] = React.useState({userTagText: '', userTagsArray: []});
  const [isSendable, setSendable] = React.useState(false);

  const dispatch = useDispatch()

  const createGroup = React.useCallback((data) => {
    dispatch(groupsAPI.create(data));
    showEditer(false);
  }, [dispatch]);

  const autoComplete = React.useCallback((query) => {
    dispatch(usersAPI.list({parameters: {'query': query}}));
  }, [dispatch]);

  React.useEffect(() => {
      if (data.name && data.name.length) {
          setSendable(true)
      }
  }, [data])

  return (
    <View style = { styles.container }>
      <ScreenAddingTitle title="Création du Groupe" showEditer={showEditer}>
        <Button disabled={!isSendable} onPress = { () => createGroup(data)} color = { Platform.OS === 'ios' ? Colors.primaryBlue : Colors.tintColor } style={styles.button} title="Envoyer"/>
      </ScreenAddingTitle>
      <View style={ styles.contentContainer }>
        <Input placeholder="Le nom de ton groupe" style={ styles.input } onChangeText = { name => setData({ ...data, name})} value={ data.name } color={Platform.OS === 'ios' ? Colors.primaryBlue : null}/>
        <Input placeholder="User" style={ styles.input } onChangeText = { user => {
             autoComplete(user)
             updateTags(user, setUserTag, userTag)
        }} value={ data.user } color={Platform.OS === 'ios' ? Colors.primaryBlue : null}/>
       </View>
    </View>
  )
};

const updateTags = (text, setUserTag, userTag) => {
    if (text.length === 0) {
      //detect if user is erasing
      setUserTag({userTagText:  userTag.userTagsArray.slice(-1)[0], userTagsArray: userTag.userTagsArray.slice(0, -1)})
    } else if (
      text.length > 1 &&
      this.props.createTagOnString.includes(text.slice(-1)) &&
      !(this.state.tags.indexOf(text.slice(0, -1).trim()) > -1)
    ) {
      this.addTag(text.slice(0, -1));
    } else {
      this.setState({ text });
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor: Colors.defaultBackgroud,
  },
  button: {
    color: Colors.primaryBlue,
  },
});

export default Form;
