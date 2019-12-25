import React from "react";
import {
  View,
  ImageBackground,
  Button,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import {
  Icon
} from "react-native-elements";
import * as  Picker from "expo-image-picker";
import { getPermission } from "../../utils/permissions";
import Colors from "../../constants/Colors";
import Sizes from "../../constants/Sizes";


const ImagePicker = (setData = null, data = null) => {
  const [image, setImage] = React.useState(null);

  const _pickImage = async () => {
    const result = await Picker.launchImageLibraryAsync({
      mediaTypes: Picker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16,9],
      quality: 1,
    });
    console.log(result)
    setImage(result);
  }

  React.useEffect(() => {
    getPermission('CAMERA_ROLL');
  }, []);

  return (
    <View style={styles.container}>
      {
        image ?
          <ImageBackground source = {{uri: image.uri}} style={styles.image}>
            <TouchableOpacity onPress = { () => setImage(null) } style={styles.crossContainer}>
              <Icon name="clear" color={Colors.white}/>
            </TouchableOpacity>
          </ImageBackground>
        :
        <TouchableOpacity onPress = {_pickImage} style={ styles.container }>
          <View style={styles.pickerView}>
            <Icon name='folder' color={ Colors.tintColor }/>
            <Text style={styles.text}>Ajouter une image</Text>
          </View>
        </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.darkGrey,
    fontWeight: 'bold',
    fontSize: Sizes.default,
  },
  crossContainer: {
    flexDirection: 'row-reverse',
  },
  image: {
    width: '100%',
    height: 150,
  }
})

export default ImagePicker;
