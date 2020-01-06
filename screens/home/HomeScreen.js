import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
} from 'react-native';
import { news as newsAPI } from "../../api/state";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import Block from "../../components/blocks/Block";
import ScreenTitle from "../../components/ScreenTitle";
import PlusBlock from "../../components/blocks/PlusBlock";
import Form from "./form";
import { getConnectedUser } from "../../api/connect"
import { users as usersAPI } from "../../api/state"
import { handleMessage } from "../../utils/message";

function HomeScreen({ showEditer }) {

  const [fetched, setFetched] = React.useState(false);
  const { news } = useSelector(state => ({ news: newsAPI.getValuesFromState(state) }))
  const dispatch = useDispatch()
  const listNews = React.useCallback(() => {
    dispatch(newsAPI.list());
    setFetched(true);
  }, [dispatch, setFetched, fetched]);

  const resetCurrentNews = React.useCallback(() => dispatch(newsAPI.resetCurrent()), [dispatch]);
  const { currentNews, currentError } = useSelector(state => ({ currentNews: newsAPI.getCurrentFromState(state), currentError: usersAPI.getErrorFromState(state) }));
  const { currentUser } = useSelector((state) => ({ currentUser: getConnectedUser(state)}))
  handleMessage(currentNews, currentError, resetCurrentNews, "Impossible de poster la news !","News envoyée !");

  React.useEffect(() => {
    listNews();
  }, [])

  return (
    <View style={styles.container}>
      <ScreenTitle title="Accueil">
        <PlusBlock icon="create" color={ Colors.white } action={() => showEditer(true)}/>
      </ScreenTitle>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
            <RefreshControl
                refreshing={!fetched}
                onRefresh={() => listNews() }
                colors={[Colors.primaryBlue]}
                tintColor={Colors.primaryBlue}
            />
        }>
        {
          news.map(oneNew => (
            <Block
              key={oneNew.getKey()}
              title={oneNew.getTitle()}
              text={oneNew.getText()}
              date={oneNew.getDate()}
              info={oneNew.getType()}
              img = {oneNew.getImage() }
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
    padding: 5,
    paddingBottom: 0
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
