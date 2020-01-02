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

 import {
   Input,
   Divider,
 } from "react-native-elements";

import Colors from "../../constants/Colors";
import { useDispatch } from "react-redux";
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { news as newsAPI } from "../../api/state";

//@TODO Add checkbox bottom to launch notification or not
const Form = ({ showEditer }) => {

  const dispatch = useDispatch()
  const add = React.useCallback((data) => {
    dispatch(newsAPI.create(data));
    showEditer(false);
  }, [dispatch])

  const [data, setData] = React.useState({});
  const [isSendable, setSendable] = React.useState(false);

  React.useEffect(() => {
    if(data.text && data.text.length && data.title && data.title.length) {
      setSendable(true)
    }
  }, [data])

   return (
     <View style = { styles.container }>
       <View style={ styles.headerContainer }>
         <Button onPress = { () => showEditer(false) } color = { Platform.OS === 'ios' ? Colors.primaryBlue : Colors.tintColor } style={styles.button} title="Annuler"/>
         <Text style={ styles.text }>Création de News</Text>
         <Button disabled={!isSendable} onPress = { () => add(data)} color = { Platform.OS === 'ios' ? Colors.primaryBlue : Colors.tintColor } style={styles.button} title="Envoyer"/>
       </View>
       <View style={ styles.contentContainer }>
         <Input placeholder="Titre" style={ styles.input } onChangeText = { title => setData({ ...data, title})} value={ data.title } color={Platform.OS === 'ios' ? Colors.primaryBlue : null}/>
         <View style={ styles.textArea }>
           <ScrollView>
             <TextInput
                 placeholder='Ecris ton message'
                 multiline
                 numberOfLines={50}
                 textAlignVertical="top"
                 onChangeText={text => setData({...data, text})}
                 value={data.text}
                 style={{height: "75%"}}
             />
           </ScrollView>
         </View>
         <Divider style={{ backgroundColor: Colors.primaryBlue }} />
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
     padding: 5,
     alignItems: 'center',
     justifyContent: 'space-between',
     flexDirection: 'row',
     paddingTop: headerHeight - 40,
     height: headerHeight,
     backgroundColor: Colors.white,
     borderBottomWidth: 0.5,
   },
   text: {
     padding: 10,
   },
   button: {
     color: Colors.primaryBlue,
   },
   contentContainer: {
     paddingTop: 30,
     padding: 5,
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
