import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { users as usersAPI } from "../api/state";
import { useDispatch, useSelector } from "react-redux";

export default function InformationsScreen() {

  const dispatch = useDispatch();
  const listUsers = React.useCallback(() => dispatch(usersAPI.list()), [dispatch])

  const { users } = useSelector(state => ({ users: usersAPI.getValuesFromState(state) }));

  React.useEffect(() => {
    listUsers()
  }, [])

    console.log(users)

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}>
                <View>
                    <Text>Les informations</Text>
                </View>
                {
                  users.map(user => (
                    <Text key={ user.getLogin() }>{user.getLogin()}: {user.getFirstname()} {user.getLastname()} - user.getEmail()</Text>
                  ))
                }
            </ScrollView>
        </View>
    );
}

InformationsScreen.navigationOptions = {
    title: 'Informations',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    contentContainer: {
    }
});
