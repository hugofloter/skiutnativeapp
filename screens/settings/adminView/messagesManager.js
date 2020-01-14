import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Text,
  Switch,
  Animated,
} from "react-native";
import { ListItem, Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { messages as messagesAPI } from "../../../api/state";
import { Colors, Sizes } from "../../../constants";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MessageModal from "./messagesModal";

const MessageManager = ({ modal, displayModal }) => {
  const dispatch = useDispatch();

  const getMessages = React.useCallback(() => {
    dispatch(messagesAPI.list());
  }, [dispatch]);

  const deleteMessage = React.useCallback((id) => {
    dispatch(messagesAPI.delete(id));
  }, [dispatch]);

  const addMessage = React.useCallback((data) => {
    dispatch(messagesAPI.create(data))
  }, [dispatch]);

  const { messages, isLoading } = useSelector(state => ({
    messages: messagesAPI.getValuesFromState(state),
    isLoading: messagesAPI.getLoadingFromState(state)
  }));

  React.useEffect(() => {
    getMessages();
  }, []);

  const [display, setDisplay] = React.useState(['image', 'new', 'other', 'text'])
  const handleDisplay = React.useCallback((value) => {
    if(display.indexOf(value) !== -1) {
      const newDisplay = display.filter(val => val !== value)
      setDisplay(newDisplay);
    }
    else {
      setDisplay([...display, value])
    }
  }, [display, setDisplay]);

  const newMessages = messages.filter(message => message.getType() == 'new')
  const otherMessages = messages.filter(message => message.getType() == 'other')
  const textMessages = messages.filter(message => message.getType() == 'text')
  const imageMessages = messages.filter(message => message.getType() == 'image')

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => getMessages()}
            colors={[Colors.primaryBlue]}
            tintColor={Colors.primaryBlue}
            />
        }>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={Colors.primaryBlue}
            value={Boolean(display.indexOf('text') !== -1)}
            onChange={() => handleDisplay('text')}
            />
          <Text style={styles.switchText}>Texte</Text>

          <Switch
            trackColor={Colors.primaryBlue}
            value={Boolean(display.indexOf('image') !== -1)}
            onChange={() => handleDisplay('image')}
            />
          <Text style={styles.switchText}>Images</Text>

          <Switch
            trackColor={Colors.primaryBlue}
            value={Boolean(display.indexOf('new') !== -1)}
            onChange={() => handleDisplay('new')}
            />
          <Text style={styles.switchText}>Nouveau</Text>

          <Switch
            trackColor={Colors.primaryBlue}
            value={Boolean(display.indexOf('other') !== -1)}
            onChange={() => handleDisplay('other')}
            />
          <Text style={styles.switchText}>Autres</Text>
        </View>
        <View>
          <List
            title="Réponses sur un message texte"
            list={textMessages}
            display={ display.indexOf("text") !== -1}
            onDelete={deleteMessage}
            />

          <List
            title="Réponses sur une image envoyée"
            list={imageMessages}
            display={ display.indexOf("image") !== -1}
            onDelete={deleteMessage}
            />

          <List
            title="Réponses après inscription"
            list={newMessages}
            display={display.indexOf("new") !== -1}
            onDelete={deleteMessage}
            />

          <List
            title="Réponses sur une erreur"
            list={otherMessages}
            display={display.indexOf("other") !== -1}
            onDelete={deleteMessage}
            />
        </View>
      </ScrollView>
      <MessageModal isVisible={modal} setVisible={displayModal} onValidate={addMessage}/>
    </View>
  )
}

const List = ({ title, list, display, onDelete }) => {
  if(display) {
    return (
      <React.Fragment>
        <Text style={styles.title}>{title}</Text>
        {
          list.map(
            message => (
              <Swipeable
                key={message.getKey()}
                leftThreshold={30}
                rightThreshold={40}
                renderRightActions={(prog) => renderRightAction(prog, () => onDelete(message.getKey()))}
                >
              <ListItem
                title={message.getText()}
                subtitle={message.getType()}
                bottomDivider
                />
            </Swipeable>
          ))
        }
      </React.Fragment>
    )
  }
  return null;
}

const renderRightAction = (progress, onPress) => {
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  return (
    <View style={{ width: 150, flexDirection: 'row' }}>
      <Animated.View style={{transform: [{ translateX: trans }], ...styles.swipedZone }}>
        <Button
          buttonStyle={styles.rightAction}
          onPress={ () => onPress() }
          title={ "Supprimer" }
          />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: Sizes.h3,
    marginVertical: 10,
  },
  switchContainer : {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  swipedZone: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  rightAction: {
    backgroundColor: Colors.errorColor
  },
})

export default MessageManager;
