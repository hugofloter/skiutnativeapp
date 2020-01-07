import React from "react";
import {Text, View, StyleSheet} from "react-native";
import Colors from "../constants/Colors";
import Sizes from "../constants/Sizes";
import { Badge } from "react-native-elements";


export const UserTag = ({user, setUserTag, userTag}) => {

    return<View style={styles.tagTyle}>
            <Badge value="X" status="warning" containerStyle={styles.badgePost} onPress={() => {
                                    let userTagsArray = userTag.userTagsArray.filter(userTag => userTag.getLogin() !== user.getLogin());
                                    setUserTag({...userTag, userTagsArray})
                                }}/>
            <Text style={styles.text}>{user.getFirstname()} {user.getLastname()}</Text>
    </View>
};

const styles = StyleSheet.create({
  tagTyle: {
    height: 40,
    width: 200,
    margin: 2,
    backgroundColor: Colors.tintColor,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: Sizes.h2,
  },
  text: {
    color: Colors.white
  },
  badgePost: {
    position: 'absolute',
    top: -4,
    right: -4
  }
});