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
   CheckBox
 } from "react-native-elements";

import Colors from "../../constants/Colors";
import Sizes from "../../constants/Sizes";
import ImagePicker from "../../components/images/ImagePicker";
import { useDispatch } from "react-redux";
import { news as newsAPI } from "../../api/state";
import { newsImage } from "../../api/image";
import { ScreenAddingTitle } from "../../components/ScreenTitle"

//@TODO Add checkbox bottom to launch notification or not
const Form = ({ showEditer }) => {

  const dispatch = useDispatch()
  const add = React.useCallback(async (data) => {
    if(data.image && data.image.uri) {
      const { img_url } = await newsImage(data.image.uri);
      data['img_url'] = img_url;
      data['img_width'] = data.image.width;
      data['img_height'] = data.image.height;
      delete data['image'];
    }

    dispatch(newsAPI.create(data));
    showEditer(false);
  }, [dispatch])

  const [data, setData] = React.useState({title: '', text: '', type: 'news'});
  const [isSendable, setSendable] = React.useState(false);

  React.useEffect(() => {
    if(data.text && data.text.length && data.title && data.title.length) {
      setSendable(true)
    }
  }, [data])

   return (
     <View style = { styles.container }>
       <ScreenAddingTitle title="Création de News" showEditer={showEditer}>
         <Button disabled={!isSendable} onPress = { () => add(data)} color = { Platform.OS === 'ios' ? Colors.primaryBlue : Colors.tintColor } style={styles.button} title="Envoyer"/>
       </ScreenAddingTitle>
       <View style={ styles.contentContainer }>
         <Input placeholder="Titre" style={ styles.input } onChangeText = { title => setData({ ...data, title})} value={ data.title } color={Platform.OS === 'ios' ? Colors.primaryBlue : null}/>
         <ImagePicker setData={ setData} data={data}/>
       <View style={ styles.textArea }>
           <ScrollView>
             <TextInput
                 placeholder='Ecris ton message'
                 multiline
                 numberOfLines={100}
                 textAlignVertical="top"
                 onChangeText={text => setData({...data, text})}
                 value={data.text}
                 style={styles.textInput}
             />
           </ScrollView>
         </View>
         <Divider style={{ backgroundColor: Colors.primaryBlue }} />
           <CheckBox
             checked = { data.type === "email" }
             title = "Envoyer par Email"
             center
             containerStyle = { styles.checkboxContainer }
             onPress = { () => setData({...data, type: ( data.type === "email" ? "news" : "email")})}
             checkedColor = { Colors.tintColor }
             />
       </View>

     </View>
   )
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: Colors.defaultBackgroud,
   },
   text: {
     padding: 10,
   },
   button: {
     color: Colors.primaryBlue,
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
     padding: 10,
   },
   textInput: {
     minHeight: '100%'
   },
   checkboxContainer: {
     backgroundColor: Colors.defaultBackgroud,
   }
 })



export default Form;
