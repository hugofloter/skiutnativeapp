import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated
} from "react-native";
import {
  Divider,
  ListItem,
  Button
} from "react-native-elements";
import { Colors, Sizes } from "../../constants";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Modal from "./modal";

import {useSelector} from "react-redux";
import { getConnectedUser } from "../../api/connect";

const ListGroupManager = ({ list, setSelectedGroup, onDelete }) => {
  const [modal, showModal] = React.useState(null);

  const onInvitationPress = React.useCallback((group) => showModal(group),[showModal]);
  const onBelongsPress = React.useCallback((groupID) => setSelectedGroup(groupID), [setSelectedGroup]);

  if(!list || !list.length){
    return <Text style={styles.text}>Ici apparaissent les groupes auxquels tu appartiens, crées-en un et invites tes potes !</Text>
  }

  const invitations = list.filter(element => element.getUserStatus() === "P");
  const belongs = list.filter(element => element.getUserStatus() === "V");



  return (
    <View>
      <View style={styles.listContainer}>
        <Text style={styles.textContainer}>Tes groupes</Text>
        <BelongsGroups list={belongs} onPress={ onBelongsPress } onDelete={onDelete}/>
      </View>
      <Divider style={styles.divider}/>
      <View style={ styles.listContainer }>
        <Text style={styles.textContainer}>On t'a invité ici</Text>
        <RequestsGroups list={invitations} onPress={ onInvitationPress }/>
      </View>
      <Modal group={ modal } setVisible={ showModal }/>
    </View>
  )
}

const BelongsGroups = ({ list, onPress, onDelete }) => {

  const { currentUser } = useSelector(state => ({ currentUser: getConnectedUser(state) }));

  const isOwner = (owner) => (currentUser && currentUser.getKey() === owner )
  return list.map(
    group => (
      <Swipeable
        key={group.getKey()}
        leftThreshold={30}
        rightThreshold={40}
        renderRightActions={(prog) => renderRightAction(prog, () => onDelete(group.getKey()), isOwner(group.getOwner()))}
        >
        <ListItem
          key={group.getKey()}
          leftAvatar={{}}
          title={group.getName()}
          subtitle={`Groupe de ${group.getOwner()}`}
          bottomDivider
          chevron
          containerStyle = {{ backgroundColor: Colors.white }}
          onPress={() => onPress(group)}
          />
      </Swipeable>
    ))
}

const RequestsGroups = ({ list, onPress }) => list.map(
  group => (
    <ListItem
      key={group.getKey()}
      leftAvatar={{}}
      title={group.getName()}
      subtitle={`Invité par: ${group.getOwner()}`}
      bottomDivider
      chevron
      containerStyle = {{ backgroundColor: Colors.grey }}
      onPress={() => onPress(group)}
      />
  )
)

const renderRightAction = (progress, onPress, isOwner) => {
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  return (
    <View style={{ width: 150, flexDirection: 'row' }}>
      <Animated.View style={{transform: [{ translateX: trans }], ...styles.swipedZone }}>
        <Button
          buttonStyle={styles.rightAction}
          onPress={ () => onPress() }
          title={ isOwner ? "Supprimer" : "Quitter"}
          />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    margin: '20%',
    fontSize: Sizes.h3,
  },
  listContainer: {
    paddingBottom: 5
  },
  swipedZone: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  rightAction: {
    backgroundColor: Colors.errorColor
  },
  textContainer: {
    padding: 10
  },
  divider: {
    height: 1,
    backgroundColor: Colors.primaryBlue
  }
})
export default ListGroupManager;
