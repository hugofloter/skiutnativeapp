import React from "react";
import {
    Text,
    View,
    Platform,
    TextInput,
    StyleSheet, Button, ScrollView,
} from "react-native";
import Colors from "../../constants/Colors";
import { Input, Divider, CheckBox  } from 'react-native-elements';
import { potins as potinsAPI } from "../../api/state"
import { useDispatch } from "react-redux";
import {ScreenAddingTitle} from "../../components/ScreenTitle";

const addPotin = (add, data, showEditer) => {
    if (data) {
        add(data)
        showEditer(false)
    }
}

const Form = ({showEditer}) => {

   const [data, changeData] = React.useState({title: '', text: '', isAnonymous: true})
   const [isSendable, setSendable] =  React.useState(false);

   const dispatch = useDispatch()
   const add = React.useCallback((data) => dispatch(potinsAPI.create(data)), [dispatch]);

   React.useEffect(() => {
     if(data.text && data.text.length && data.title && data.title.length) {
       setSendable(true)
     }
   },[data])

   return (
     <View style = { styles.container }>
       <ScreenAddingTitle title="Création du Potin" showEditer={showEditer}>
         <Button disabled={!isSendable} onPress = { () => addPotin(add,data, showEditer) } color={Platform.OS === 'ios' ? Colors.primaryBlue : Colors.tintColor} style={styles.button} title="Envoyer"/>
       </ScreenAddingTitle>
       <View style={ styles.contentContainer }>
         <Input placeholder='Ton titre' style={styles.input} onChangeText={title => changeData({...data, title})} color={Platform.OS === 'ios' ? Colors.primaryBlue : null} />
         <View style={ styles.textArea }>
           <ScrollView>
           <TextInput
                   placeholder='Raconte ton potin'
                   multiline
                   numberOfLines={9}
                   textAlignVertical="top"
                   onChangeText={text => changeData({...data, text})}
                   value={data.text}
               />
           </ScrollView>
         </View>
         <Divider style={{ backgroundColor: Colors.primaryBlue }} />
         <CheckBox
             center
             title='Potin Anonyme'
             checkedColor={Colors.tintColor}
             checked={data.isAnonymous}
             onPress={() => {
                 let isAnonymous = !data.isAnonymous;
                 changeData({...data, isAnonymous})
             }}
         />
       </View>
     </View>
   )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackgroud,
    padding: 5
  },
  text: {
    padding: 10,
  },
  button: {
    color: Colors.primaryBlue
  },
  contentContainer: {
    padding: 5,
  },
  input: {
    borderBottomColor: Colors.tintColor,
  },
  textArea: {
    height: '50%',
    paddingTop: 30,
    padding: 10
  }
})


export default Form;
