import React from "react";
import {
    Text,
    View,
    Platform,
    TextInput,
    StyleSheet, Button,
} from "react-native";
import Colors from "../../constants/Colors";
import { Input, Divider, CheckBox  } from 'react-native-elements';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { potins as potinsAPI } from "../../api/state"
import { useDispatch } from "react-redux";

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
       <View style={ styles.headerContainer }>
         <Button onPress = { () => showEditer(false) } color={Platform.OS === 'ios' ? Colors.primaryBlue : Colors.tintColor } style={styles.button} title="Annuler"/>
         <Text style={styles.text}>Création du potin</Text>
         <Button disabled={!isSendable} onPress = { () => addPotin(add,data, showEditer) } color={Platform.OS === 'ios' ? Colors.primaryBlue : Colors.tintColor} style={styles.button} title="Envoyer"/>
       </View>
       <View style={ styles.contentContainer }>
         <Input placeholder='Ton titre' style={styles.input} onChangeText={title => changeData({...data, title})} color={Platform.OS === 'ios' ? Colors.primaryBlue : null} />
         <View style={ styles.textArea }>
           <TextInput
               placeholder='Raconte ton potin'
               multiline
               numberOfLines={9}
               textAlignVertical="top"
               onChangeText={text => changeData({...data, text})}
               value={data.text}
               style={{height: "75%"}}
           />
         </View>
         <Divider style={{ backgroundColor: Colors.primaryBlue }} />
         <CheckBox
             center
             title='Potin Anonyme'
             checkedIcon='dot-circle-o'
             uncheckedIcon='circle-o'
             checkedColor={Colors.primaryBlue}
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

//UX with Iphone 11 large header
const headerHeight = ifIphoneX(88, 60)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackgroud,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: headerHeight-40,
    height: headerHeight,
    backgroundColor: "#fff",
    borderBottomWidth: 0.5
  },
  title: {
    textAlign: 'center'
  },
  text: {
    padding: 10,
  },
  button: {
    color: Colors.primaryBlue
  },
  contentContainer: {
    padding: 5,
    paddingTop: 30,
  },
  input: {
    borderBottomColor: Colors.tintColor,
  },
  textArea: {
    paddingTop: 30,
    padding: 10
  }
})


export default Form;
