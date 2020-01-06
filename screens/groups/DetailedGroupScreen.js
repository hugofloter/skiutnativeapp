import React from "react";
import {
   Text,
   View,
   ScrollView,
   Platform,
   StyleSheet,
   Button,
   TextInput,
} from "react-native";
import Colors from "../../constants/Colors";
import ScreenTitle from "../../components/ScreenTitle";
import { useSelector, useDispatch } from "react-redux";
import GestureRecognizer from 'react-native-swipe-gestures';
import { groups as groupsAPI } from "../../api/state";
import PlusBlock from "../../components/blocks/PlusBlock";

const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
}

const DetailedGroupScreen = ({ showDetail, selectedGroup }) => {

  const [fetched, setFetched] = React.useState(false);

  const { groupInfos } = useSelector((state) => ({ groupInfos: groupsAPI.getCurrentFromState(state) }))

  const dispatch = useDispatch()

  const getGroupInfos = React.useCallback((id) => {
    dispatch(groupsAPI.retrieve(id));
    setFetched(true);
  }, [dispatch, setFetched, fetched]);

  React.useEffect(() => {
    getGroupInfos(selectedGroup.getKey());
  }, []);

  return (

        <GestureRecognizer
            onSwipeRight={() => showDetail(false)}
            config={config}
            style={styles.container}>
            <View style={styles.container}>
          <ScreenTitle title="FocusedGroup">
            <PlusBlock icon="backspace" color={ Colors.white } action={() => showDetail(false)}/>
          </ScreenTitle>
          <ScrollView>
            <Text>groupInfos</Text>
          </ScrollView>
          </View>
        </GestureRecognizer>
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
