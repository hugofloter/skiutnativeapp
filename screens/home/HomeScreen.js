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
import { news as newsAPI } from "../../api/state";
import { useSelector, useDispatch } from "react-redux";
import { getConnectedUser } from "../../api/connect";
import Colors from "../../constants/Colors";
import Block from "../../components/blocks/Block";
import ScreenTitle from "../../components/ScreenTitle";
import PlusBlock from "../../components/blocks/PlusBlock";
import Form from "./form";



function HomeScreen({ showEditer }) {

  const { news } = useSelector(state => ({ news: newsAPI.getValuesFromState(state) }))
  const dispatch = useDispatch()
  const listNews = React.useCallback(() => dispatch(newsAPI.list()), []);

  const { currentUser } = useSelector(state => ({ currentUser: getConnectedUser(state) }))

  React.useEffect(() => {
    listNews();
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <ScreenTitle title="Accueil">
            <PlusBlock title="+" action={() => showEditer(true)}/>
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
    return <Form/>
  }

  return <HomeScreen showEditer={ showEditer }/>
}

export default Form;
