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
import { Input, Icon, ListItem, Avatar } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { groups as groupsAPI, users as usersAPI } from "../../api/state";
import { UserTag } from "../../components/tag";

const Form = ({ showEditer }) => {

  const inputTitle = React.createRef();

  const [name, setName] = React.useState('');
  const [userTag, setUserTag] = React.useState({userTagText: '', userTagsArray: []});
  const [isSendable, setSendable] = React.useState(false);

  const { usersComplete } = useSelector((state) => ({ usersComplete: usersAPI.getValuesFromState(state) }))

  const dispatch = useDispatch()

  const createGroup = React.useCallback((data) => {
    dispatch(groupsAPI.create(data));
    showEditer(false);
  }, [dispatch]);

  const autoComplete = React.useCallback((query) => {
    dispatch(usersAPI.list({parameters: {'query': query}}));
  }, [dispatch]);

  React.useEffect(() => {
      if (name && name.length) {
          setSendable(true)
      }
  }, [name])

  return (
    <View style = { styles.container }>
      <ScreenAddingTitle title="Création du Groupe" showEditer={showEditer}>
        <Button disabled={!isSendable} onPress = { () => createGroup({name: name, list_login: userTag.userTagsArray.map(user => user.getLogin())})} color = { Platform.OS === 'ios' ? Colors.primaryBlue : Colors.tintColor } style={styles.button} title="Envoyer"/>
      </ScreenAddingTitle>
      <View style={ styles.contentContainer }>
        <Input placeholder="Le nom de ton groupe" inputStyle={ styles.input }
               onChangeText = { name => setName(name)}
               value={ name } color={Platform.OS === 'ios' ? Colors.primaryBlue : null}
               leftIconContainerStyle={{marginRight: 15}}
               leftIcon={<Icon name='group' size={24} color='black' />}
        />
        <HandleTag setUserTag={setUserTag} userTag={userTag} />
        <Input placeholder="User"
               inputStyle={ styles.input }
               onChangeText = { userTagText => {
                   setUserTag({...userTag, userTagText});
                   if (userTagText) autoComplete(userTagText)
               }}
               value={ userTag.userTagText }
               color={Platform.OS === 'ios' ? Colors.primaryBlue : null}
               onSubmitEditing={(e) => {
                   console.log(e)
                 updateTags(e.nativeEvent.text, setUserTag, userTag, usersComplete, inputTitle)
               }}
               ref={inputTitle}
        />
        <AutoCompleteShower usersComplete={usersComplete} setUserTag={setUserTag} userTag={userTag} inputTitle={inputTitle}/>
       </View>
    </View>
  )
};


const HandleTag = ({ setUserTag, userTag }) => {

    if (Array.isArray(userTag.userTagsArray) && userTag.userTagsArray.length) {
        return <ScrollView style={styles.tagStyle} >
            <View style={{alignItems:'center'}}>
            {
                userTag.userTagsArray.map((user, i) => {
                    return <UserTag key={user.getLogin()} user={user} setUserTag={setUserTag} userTag={userTag} />
                })
            }
            </View>
        </ScrollView>
    } else {
        return <View style={styles.tagStyle} >
            <Text style={styles.text}>Ajoutes tes amis !</Text>
        </View>
    }
};

const updateTags = (text, setUserTag, userTag, usersComplete, inputTitle) => {

    let newTags = userTag.userTagsArray

    const userIdentified = text ? usersComplete.filter(user => user.getLogin().includes(text)) : [];

    if (Array.isArray(userIdentified) && userIdentified.length) {
        const isInList = userTag.userTagsArray.filter(user => user.getLogin() === userIdentified[0].getLogin());
        if (!isInList.length) {
            newTags.push(userIdentified[0]);
            setUserTag({userTagText: '', userTagsArray: newTags})
        } else {
            setUserTag({...userTag, userTagText: ''})
            inputTitle.current.shake()
        }
    }
};

const AutoCompleteShower = ({ usersComplete, setUserTag, userTag, inputTitle }) => {
    if (userTag.userTagText) {
        return <View style={styles.autoCompleteShower}>
            {
             usersComplete.map( user => {
                 return <View key={user.getLogin()}>
                     <ListItem
                         leftAvatar={<Avatar rounded title={user.getFirstname()[0]+user.getLastname()[0]} />}
                         title={`${user.getFirstname()} ${user.getLastname()}`}
                         subtitle={user.getLogin()}
                         bottomDivider
                         onPress={() => {
                             updateTags(user.getLogin(), setUserTag, userTag, usersComplete, inputTitle)
                         }}
                     />
                 </View>
             })
            }
        </View>
    }
    return null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackgroud,
  },
  contentContainer: {
    marginTop: 20
  }  ,
  button: {
    color: Colors.primaryBlue,
  },
  input: {
    borderBottomColor: Colors.tintColor,
  },
  text: {
    fontSize: 18
  },
  tagStyle: {
    padding: 10,
    maxHeight: '50%'
  },
  autoCompleteShower: {
      padding: 10
  }
});

export default Form;
