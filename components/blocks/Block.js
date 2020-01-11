import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { getImage } from "../../api/image";
import Colors from "../../constants/Colors";
import Sizes from "../../constants/Sizes";
import { Icon } from "react-native-elements";

const Block = ({ title, img, text, date, info, adminBlock = false }) => {
  let imgWidth = null;
  let imgHeight = null;
  let imgUri = '';
  if(img) {
    const dimensions = Dimensions.get('window')
    imgWidth = parseInt(dimensions.width - 30)
    imgHeight = parseInt((dimensions.width * img.height) / img.width)
  }

  return (
    <View style={ styles.globalContainer }>
      <View style={ styles.container }>
        <Text style = { styles.title }>{ title }</Text>
        { img ? <Image style = {{...styles.img, width: imgWidth, height: imgHeight }} source = { {uri: getImage(img.uri)} } resizeMethod="scale"/> : null}
        <Text style = { styles.text }>{ text }</Text>
        <View style = { styles.payloads}>
          <Text style = { styles.info }>{ info }</Text>
          <Text style = { styles.date }>{ date }</Text>
        </View>
      </View>
      <View>
        {adminBlock && <Icon name="arrow-back" color={Colors.grey}/>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  globalContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
    padding: 5
  },
  container : {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  title: {
    color: Colors.darkGrey,
    fontSize: Sizes.h3,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,

  },
  text: {
    color: Colors.darkGrey,
    fontSize: Sizes.default,
    textAlign: 'justify',
    marginBottom: 5,
  },
  payloads: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    color: Colors.grey,
  },
  img: {
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 10
  },
  date: {
    fontStyle: 'italic',
    color: Colors.grey,
  }
});

export default Block;
