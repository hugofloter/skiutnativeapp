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

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}>
                <View>
                    <Text>Les informations</Text>
                </View>
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
