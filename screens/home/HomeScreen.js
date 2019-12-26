import * as WebBrowser from 'expo-web-browser';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import {news as newsAPI, potins as potinsAPI} from "../../api/state";
import { useSelector, useDispatch } from "react-redux";
import { getConnectedUser } from "../../api/connect";
import Colors from "../../constants/Colors";
import Block from "../../components/blocks/Block";
import ScreenTitle from "../../components/ScreenTitle";
import PlusBlock from "../../components/blocks/PlusBlock";
import Form from "./form";
import {showMessage} from "react-native-flash-message";
import { getPermission } from "../../utils/permissions";
import registerForPushNotificationsAsync from "../../api/pushNotification";
import {Notifications} from "expo";
import { usersToken as usersTokenAPI } from "../../api/state"

function HomeScreen({ showEditer }) {

  const [fetched, setFetched] = React.useState(false);
  const { news } = useSelector(state => ({ news: newsAPI.getValuesFromState(state) }))
  const dispatch = useDispatch()
  const listNews = React.useCallback(() => {
    dispatch(newsAPI.list());
    setFetched(true);
  }, [dispatch, setFetched, fetched]);

  const { currentUser } = useSelector(state => ({ currentUser: getConnectedUser(state) }))

  const resetCurrent = React.useCallback(() => dispatch(newsAPI.resetCurrent()), [dispatch]);
  const { resNews } = useSelector(state => ({ resNews: newsAPI.getCurrentFromState(state) }));

  const [notification, setNotification] = useState({})
  const createToken = React.useCallback((token) => dispatch(usersTokenAPI.create({token: token})), [dispatch]);

  const handleNotifications = (notification) => {
    setNotification(notification)
  }

  React.useEffect(() => {
    if (getPermission('NOTIFICATIONS')) {
      registerForPushNotificationsAsync(createToken)
      Notifications.addListener(handleNotifications)
    }
    listNews();
  }, [])


  useEffect(() => {
    if (resNews) {
      if (resNews.error) {
        showMessage({
           message: "Un problème a été détecté !",
           type: "error",
        });
      } else {
        showMessage({
           message: "News envoyée !",
           type: "success",
        });
      }
      resetCurrent()
    }
  }, [resNews])

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
            <RefreshControl
                refreshing={!fetched}
                onRefresh={() => listNews() }
                colors={[Colors.primaryBlue]}
                tintColor={Colors.primaryBlue}
            />
        }>
        <ScreenTitle title="Accueil">
            <PlusBlock icon="create" color={ Colors.white } action={() => showEditer(true)}/>
        </ScreenTitle>
        {
          news.map(oneNew => (
            <Block
              key={oneNew.getKey()}
              title={oneNew.getTitle()}
              text={oneNew.getText()}
              date={oneNew.getDate()}
              info={oneNew.getType()}
              />
          ))
        }
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackgroud,
    padding: 5
  },
  contentContainer: {
    paddingTop: 30,
  }
});

const HomeScreenManager = () => {
  const [editer, showEditer] = React.useState(false);

  if (editer) {
    return <Form showEditer={showEditer}/>
  }

  return <HomeScreen showEditer={ showEditer }/>
}

HomeScreenManager.navigationOptions = {
  header: null,
};

export default HomeScreenManager;
