import React from "react";
import {
   Text,
   View,
   ScrollView,
   Platform,
   StyleSheet,
   Button,
   TextInput,
} from "react-native";
import Colors from "../../constants/Colors";
import {ScreenAddingTitle} from "../../components/ScreenTitle";
import { Input } from "react-native-elements";
import {useDispatch} from "react-redux";
import { groups as groupsAPI } from "../../api/state";

const Form = ({ showEditer }) => {

  const [data, setData] = React.useState({name: ''});
  const [isSendable, setSendable] = React.useState(false);

  const dispatch = useDispatch()

  const createGroup = React.useCallback((data) => {
    dispatch(groupsAPI.create(data));
    showEditer(false);
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




       </View>
    </View>
  )
};

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
