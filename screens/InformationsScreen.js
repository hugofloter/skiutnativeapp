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


export default function InformationsScreen() {

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.container}
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
