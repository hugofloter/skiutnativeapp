import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet
} from "react-native";

import Colors from "../../constants/Colors";
import Sizes from "../../constants/Sizes";
import { Icon } from "react-native-elements";

const Block = ({ title, photo, text, date, info, adminBlock = false }) => {
  return (
    <View style={ styles.globalContainer }>
      <View style={ styles.container }>
        <Text style = { styles.title }>{ title }</Text>
        { photo ? <Image style = { styles.image } source = { photo }/> : null}
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
    padding: 5,
    backgroundColor: Colors.white,
    borderRadius: 5,
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
  photo: {

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
  date: {
    fontStyle: 'italic',
    color: Colors.grey,
  }
});

export default Block;
