import React from "react";
import {
   Text,
   View,
   ScrollView,
   Platform,
   StyleSheet,
   Button,
   TextInput,
   ActivityIndicator
} from "react-native";
import Colors from "../../constants/Colors";
import ScreenTitle from "../../components/ScreenTitle";
import { useSelector, useDispatch } from "react-redux";
import { groups as groupsAPI } from "../../api/state";
import PlusBlock from "../../components/blocks/PlusBlock";


const DetailedGroupScreen = ({ setSelectedGroup, selectedGroup }) => {

  const { groupInfos, isLoading } = useSelector((state) => ({
    groupInfos: groupsAPI.getCurrentFromState(state),
    isLoading: groupsAPI.getCurrentLoadingFromState(state),
  }))

  const dispatch = useDispatch()

  const getGroupInfos = React.useCallback((id) => dispatch(groupsAPI.retrieve(id)), [dispatch]);
  const resetCurrent = React.useCallback(() => dispatch(groupsAPI.resetCurrent()), [dispatch]);

  React.useEffect(() => {
    getGroupInfos(selectedGroup.getKey());

    return () => resetCurrent();
  }, []);

  if(isLoading || !groupInfos) {
    return (
      <View style={styles.container}>
        <ScreenTitle title="Groupe">
          <PlusBlock icon="backspace" color={ Colors.white } action={() => setSelectedGroup(null)}/>
        </ScreenTitle>
        <ActivityIndicator size="large" color={Colors.primaryBlue}/>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <ScreenTitle title={ groupInfos.getName() }>
        <PlusBlock icon="backspace" color={ Colors.white } action={() => setSelectedGroup(null)}/>
      </ScreenTitle>
      <ScrollView>
        <Text>groupInfos</Text>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackgroud,
    paddingTop: 5
  },
});

export default DetailedGroupScreen;
