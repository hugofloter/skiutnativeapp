import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { qrcodeAdmin as qrcodeAdminAPI } from "../../api/state"

const AdminView = ({}) => {

  const dispatch = useDispatch();

  const getTopAnimation = React.useCallback(() => {
    dispatch(qrcodeAdminAPI.list());
  }, [dispatch]);

  const { top } = useSelector(state => ({ top: qrcodeAdminAPI.getValuesFromState(state) }));

  React.useEffect(() => {
      getTopAnimation()
  },[]);

  return (
    <View style={styles.container}>
        <Text style={styles.textTitle}>Leaderboard actuel</Text>
        {
            top.map(user => {
                return <Text key={user.getKey()} style={styles.text}>{user.getLogin()} - Niveau {user.getLevel()}</Text>
            })
        }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: 'center',
    textAlign: 'center'
  },
  textTitle: {
    fontSize: 18
  },
  text: {
    padding: 5
  }
});

export default AdminView;
