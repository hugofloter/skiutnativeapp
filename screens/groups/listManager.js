import React from "react";
import {
  View,
  StyleSheet,
  Text
} from "react-native";
import {
  Divider,
  ListItem
} from "react-native-elements";
import { Colors, Sizes } from "../../constants";
import Modal from "./modal";

const ListGroupManager = ({ list, setSelectedGroup }) => {
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
        <ListGroups list={belongs} onPress={ onBelongsPress }/>
      </View>
      <Divider style={styles.divider}/>
      <View style={ styles.listContainer }>
        <Text style={styles.textContainer}>On t'a invité ici</Text>
        <ListGroups list={invitations} requested={true} onPress={ onInvitationPress }/>
      </View>
      <Modal group={ modal } setVisible={ showModal }/>
    </View>
  )
}

const ListGroups = ({ list, onPress, requested=false }) => list.map(
  group => {
    const subtitle = requested ? "Invité par : " + group.getOwner() : group.getBeerCall() ? "Prochain appel à la soif : " + group.getBeerCall() : "Aucun appel à la soif prévu";
    return (
      <ListItem
        key={group.getKey()}
        leftAvatar={{}}
        title={group.getName()}
        subtitle={subtitle}
        bottomDivider
        chevron
        containerStyle={requested ? {backgroundColor: Colors.grey} : {backgroundColor: Colors.white}}
        onPress={() => onPress(group) }
      />)
  }
)

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    margin: '20%',
    fontSize: Sizes.h3,
  },
  listContainer: {
    paddingBottom: 5
  },
  textContainer: {
    padding: 10
  },
  divider: {
    backgroundColor: Colors.primaryBlue
  }
})
export default ListGroupManager;
