import React from "react";
import {
   Text,
   View,
   ScrollView,
   Platform,
   StyleSheet,
   Button,
   ActivityIndicator
} from "react-native";
import Colors from "../../constants/Colors";
import ScreenTitle from "../../components/ScreenTitle";
import { useSelector, useDispatch } from "react-redux";
import { groups as groupsAPI } from "../../api/state";
import { getConnectedUser } from "../../api/connect";
import PlusBlock from "../../components/blocks/PlusBlock";
import Map from "../../components/map/map";
import MembersBlock from "./membersBlock/membersBlock";
import AddModal from "./membersBlock/addModal";

const INTERVAL = 60000

const DetailedGroupScreen = ({ setSelectedGroup, selectedGroup }) => {

  const { currentUser } = useSelector(state => ({ currentUser: getConnectedUser(state) }));
  const { groupInfos } = useSelector((state) => ({
    groupInfos: groupsAPI.getCurrentFromState(state),
  }))

  const dispatch = useDispatch()

  const getGroupInfos = React.useCallback((id) => dispatch(groupsAPI.retrieve(id)), [dispatch]);
  const resetCurrent = React.useCallback(() => dispatch(groupsAPI.resetCurrent()), [dispatch]);
  const updateGroup = React.useCallback((id, data) => dispatch(groupsAPI.updateOne(id, data)), [dispatch]);

  const [addModal, showAddModal] = React.useState(false);

  React.useEffect(() => {
    getGroupInfos(selectedGroup.getKey());
    const interval = setInterval(() => { getGroupInfos(selectedGroup.getKey()) }, INTERVAL);
    return () => {
      clearInterval(interval)
      resetCurrent();
    }
  }, []);

  if(!groupInfos) {
    return (
      <View style={styles.container}>
        <ScreenTitle title="Groupe">
          <PlusBlock
            icon="backspace"
            color={ Colors.white }
            action={() => setSelectedGroup(null)}
            />
        </ScreenTitle>
        <ActivityIndicator size="large" color={Colors.primaryBlue}/>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <ScreenTitle title={ groupInfos.getName() }>
        <PlusBlock
          icon="backspace"
          color={ Colors.white }
          action={() => setSelectedGroup(null)}
          isAdmin={true}
          adminIcon={ groupInfos.getSharePosition() ? "location-on" : "location-off"}
          adminAction={() => updateGroup(selectedGroup.getKey(), { 'location_permission': !groupInfos.getSharePosition() })}
          />
      </ScreenTitle>
      <ScrollView>
        <MembersBlock
          users={ groupInfos.getUsersInGroup() }
          isOwner={ currentUser && currentUser.getKey() === groupInfos.getOwner() }
          buttonBlock
          onButtonPress={() => showAddModal(true) }
          onMemberPress={(member) => updateGroup(selectedGroup.getKey(), { 'to_remove': member.getKey()}) }
          />
        <Map users={ groupInfos.getUsersInGroup() }/>

      </ScrollView>
      <AddModal
        isVisible={addModal}
        setVisible={showAddModal}
        currentUsers={groupInfos.getUsersInGroup()}
        onValidate={(logins) => updateGroup(selectedGroup.getKey(), { 'list_login': logins })}
        />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackgroud,
    padding: 5,
  },
});

export default DetailedGroupScreen;
