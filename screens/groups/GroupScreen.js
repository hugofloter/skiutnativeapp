import React from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text
} from "react-native";
import { Divider, ListItem } from "react-native-elements";
import { Colors, Sizes } from "../../constants";
import ScreenTitle from "../../components/ScreenTitle";
import PlusBlock from "../../components/blocks/PlusBlock";
import ListGroupManager from "./listManager";

import { useSelector, useDispatch } from "react-redux";
import { groups as groupsAPI } from "../../api/state";

const GroupScreen = ({ showEditer, setSelectedGroup }) => {

  const { groups, isLoading } = useSelector(state => ({
    groups: groupsAPI.getValuesFromState(state),
    isLoading: groupsAPI.getLoadingFromState(state)
  }));

  const dispatch = useDispatch();
  const fetchGroups = React.useCallback(() => dispatch(groupsAPI.list()), [dispatch]);
  const clear = React.useCallback(() => dispatch(groupsAPI.reset()), [dispatch]);
  const deleteGroup = React.useCallback((groupId) => {
    dispatch(groupsAPI.delete(groupId));
  }, [dispatch]);

  React.useEffect(() => {
    fetchGroups();

    return () => clear();
  }, [])

  return (
    <View style={styles.container}>
      <ScreenTitle title="Groupes">
        <PlusBlock icon="create" color={Colors.white} action={ () => showEditer(true) }/>
      </ScreenTitle>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={ isLoading }
            onRefresh={ fetchGroups }
            colors={[Colors.primaryBlue]}
            tintColor={Colors.primaryBlue}
            />
        }
        >
        <ListGroupManager list={ groups } setSelectedGroup={ setSelectedGroup } onDelete={deleteGroup}/>
      </ScrollView>
    </View>
  )
}
export default GroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackgroud,
    padding: 5,
  }
})
