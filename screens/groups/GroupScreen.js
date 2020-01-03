import React from 'react';
import {
  Image,
  Platform, RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Divider, ListItem, Overlay} from 'react-native-elements'
import { groups as groupsAPI } from "../../api/state"
import Form from "../groups/form";
import DetailedGroupScreen from "../groups/DetailedGroupScreen";
import Colors from "../../constants/Colors";
import ScreenTitle from "../../components/ScreenTitle";
import PlusBlock from "../../components/blocks/PlusBlock";
import { useSelector, useDispatch } from "react-redux";
import { getConnectedUser } from "../../api/connect";


function GroupScreen({ showEditer, showDetail, setSelectedGroup, selectedGroup }) {

  const [fetched, setFetched] = React.useState(false);
  const [showGroupRequest, setShowGroupRequest] = React.useState(false);

  const { currentUser } = useSelector((state) => ({ currentUser: getConnectedUser(state) }))
  const { groups } = useSelector((state) => ({ groups: groupsAPI.getValuesFromState(state) }))

  const dispatch = useDispatch()

  const listGroups = React.useCallback(() => {
    dispatch(groupsAPI.list());
    setFetched(true);
  }, [dispatch, setFetched, fetched]);

  const validateInvitation = React.useCallback((id, data) => {
    dispatch(groupsAPI.updateOne(id, data));
    setShowGroupRequest(false)
  }, [dispatch, setFetched, fetched]);

  const cancelInvitation = React.useCallback((id, data) => {
    dispatch(groupsAPI.delete(id, data));
    setShowGroupRequest(false)
  }, [dispatch, setFetched, fetched]);

  React.useEffect(() => {
    listGroups();
  }, []);

  return (
    <View style={styles.container}>
      <ScreenTitle title="Groupes">
        <PlusBlock icon="create" color={ Colors.white } action={() => showEditer(true)}/>
      </ScreenTitle>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
            <RefreshControl
                refreshing={!fetched}
                onRefresh={() => listGroups() }
                colors={[Colors.primaryBlue]}
                tintColor={Colors.primaryBlue}
            />
        }
      >
      <View style={styles.listContainer}>
        <Text style={styles.textContainer} >Tes groupes</Text>
        {
          groups.map(group => {
            if (group.getUserStatus() === 'V') {
              return <ListItem
                key={group.getKey()}
                leftAvatar={{}}
                title={group.getName()}
                subtitle={group.getBeerCall() ?  "Prochain appel à la soif : " + group.getBeerCall() : "Aucun appel à la soif prévu" }
                bottomDivider
                chevron
                onPress={() => {
                  setSelectedGroup(group)
                  showDetail(true)
                }}
              />
            }
          })
        }
      </View>
      <Divider style={{ backgroundColor: Colors.primaryBlue }} />
      <View style={styles.listContainer}>
        <Text style={styles.textContainer} >On t'a invité ici</Text>
        {
          groups.map(group => {
            if (group.getUserStatus() === 'P') {
              return <ListItem
                key={group.getKey()}
                leftAvatar={{}}
                title={group.getName()}
                subtitle={"Invité par : " + group.getOwner()}
                bottomDivider
                chevron
                containerStyle={{backgroundColor: Colors.grey}}
                onPress={() => {
                  setSelectedGroup(group)
                  setShowGroupRequest(true)
                }}
              />
            }
          })
        }
      </View>
      </ScrollView>
      <Overlay
        isVisible={showGroupRequest}
        borderRadius={5}
        height="40%"
        onBackdropPress={() => {
          setShowGroupRequest(false)
        }}
      >
        <View style={{padding: 20}}>
          <Text>Veux tu réellement rejoindre el famoso groupe de {selectedGroup && selectedGroup.getOwner()}?</Text>
          <Button onPress = { () => validateInvitation(selectedGroup.getKey(), {'invitation': 'V'}) }
                        buttonStyle={{
                          backgroundColor: Colors.buttonBackground
                        }}
                        style = {styles.button}
                        title="Accepter"/>
          <Button onPress = { () => cancelInvitation(selectedGroup.getKey(), {'invitation': 'A'}) }
                        buttonStyle={{
                          backgroundColor: Colors.errorColor
                        }}
                        style = {styles.button}
                        title="Refuser"/>
        </View>
      </Overlay>
    </View>
  );
}

const GroupeScreenManager = () => {
  const [editer, showEditer] = React.useState(false);
  const [detail, showDetail] = React.useState(false);
  const [selectedGroup, setSelectedGroup] = React.useState(null);

  if (editer) {
    return <Form showEditer={showEditer}/>
  }

  if (detail) {
     return <DetailedGroupScreen showDetail={ showDetail } selectedGroup={ selectedGroup }/>
  }

  return <GroupScreen showEditer={ showEditer } showDetail={ showDetail } setSelectedGroup={ setSelectedGroup } selectedGroup={ selectedGroup }/>
}

GroupeScreenManager.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackgroud,
    paddingTop: 5
  },
  listContainer: {
    paddingBottom: 5
  },
  textContainer: {
    padding: 10
  },
  button: {
    marginTop: 50
  },
});

export default GroupeScreenManager;

