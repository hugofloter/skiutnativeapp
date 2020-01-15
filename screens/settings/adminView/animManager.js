import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Text
} from "react-native";
import { ListItem } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { qrcodeAdmin as qrcodeAdminAPI } from "../../../api/state";
import { Colors, Sizes } from "../../../constants";

const AnimManager = () => {
  const dispatch = useDispatch();

  const getTopAnimation = React.useCallback(() => {
    dispatch(qrcodeAdminAPI.list());
  }, [dispatch]);

  const { top, isLoading } = useSelector(state => ({
    top: qrcodeAdminAPI.getValuesFromState(state),
    isLoading: qrcodeAdminAPI.getLoadingFromState(state)
  }));

  React.useEffect(() => {
    getTopAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => getTopAnimation()}
            colors={[Colors.primaryBlue]}
            tintColor={Colors.primaryBlue}
            />
        }>
        <View>
          <Text style={styles.textTitle}>Leaderboard Actuel</Text>
          {
            top.map(user => (
              <ListItem
                key={user.getKey()}
                title={`${user.getLogin()} - ${user.getLevel()}`}
                bottomDivider
                />
            ))
          }
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    textAlign: 'center',
  },
  textTitle: {
    fontSize: Sizes.h3,
  },
})

export default AnimManager;
