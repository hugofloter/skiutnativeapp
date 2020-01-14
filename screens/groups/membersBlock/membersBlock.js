import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Divider, Avatar as NativeAvatar } from 'react-native-elements';
import { Colors, Sizes } from "../../../constants";
import Avatar from "../../../components/avatar/avatar";

const MembersBlock = ({ users, onButtonPress, onMemberPress, onMemberLongPress, isOwner = false, editButton, buttonBlock=false, ...params }) => {
  if(!users || !users.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        >
        { buttonBlock ? <Button onPress={ onButtonPress } {...params}/> : null }
        {
          users.map(user =><Member key={ user.getKey() } user={user} isOwner={isOwner} onPress={ onMemberPress } onLongPress={ onMemberLongPress } editButton={ editButton } {...params}/>)
        }
      </ScrollView>
    </View>
  )
}

const Member = ({ user, isOwner, onPress, onLongPress, editButton, ...params}) => {
  const editable = isOwner || Boolean(editButton);
  return (
    <TouchableOpacity onLongPress={ editable ? () => onLongPress(user) : () => {} } onPress={() => onPress(user)}>
      <View style={styles.memberContainer}>
        <Avatar user={ user } size="medium" showEditButton={ editable } editButton={editButton} {...params}/>
        <Text style={styles.memberText}>{ user.getFirstname() }</Text>
      </View>
    </TouchableOpacity>
  )
}

const Button = ({ onPress, ...params }) => (
  <TouchableOpacity onPress={ onPress }>
    <View style={styles.memberContainer}>
      <NativeAvatar rounded icon={{name:"add"}} size="medium" overlayContainerStyle = {{ backgroundColor: Colors.primaryBlue}} {...params}/>
      <Text style={styles.memberText}> </Text>
    </View>
  </TouchableOpacity>
)
const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  contentContainer: {
    marginHorizontal: 5,
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
  },
  memberContainer: {
    marginHorizontal: 10,
    textAlign: 'center',
    alignItems: 'center',
  },
  memberText: {
    fontSize: Sizes.default,
    color: Colors.darkGrey,
  },
  divider: {
    backgroundColor: Colors.primaryBlue,
    height: 1,
  },
})
export default MembersBlock;
