import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { qrcodeAdmin as qrcodeAdminAPI } from "../../../api/state"
import PlusBlock from "../../../components/blocks/PlusBlock";
import ScreenTitle from "../../../components/ScreenTitle";
import {Colors} from "../../../constants";
import NavigationButtons from "./navigationButtons";
import AnimManager from "./animManager";
import MessageManager from "./messagesManager";

const PanelManager = ({activeButton, modal, displayModal }) => {
  if(activeButton == "anim") {
    return <AnimManager/>
  }

  if(activeButton == "messages") {
    return <MessageManager modal={modal} displayModal={displayModal}/>
  }
  return null;
}
const AdminView = ({ onSuccess, showAdmin }) => {

  const [activeButton, setActiveButton] = React.useState('anim');
  const [modal, displayModal] = React.useState(false);

  return (
    <View style={styles.container}>
      <ScreenTitle title="Settings Admin">
        <PlusBlock
          icon="backspace"
          color={Colors.white}
          action={() => showAdmin(false)}
          isAdmin={activeButton==="messages" ? true : false}
          adminIcon={activeButton==="messages" ? "create" : null}
          adminAction={() => displayModal(true)}
          />
      </ScreenTitle>
      <NavigationButtons active={activeButton} setActive={setActiveButton}/>
      <View style={styles.contentContainer}>
        <Divider style={styles.divider}/>
        <PanelManager activeButton={activeButton} modal={modal} displayModal={displayModal}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackgroud,
  },
  contentContainer: {
    flex: 1,
    padding: 5,

  },
  divider: {
    backgroundColor: Colors.primaryBlue,
    width: '50%',
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center'
  }
});

export default AdminView;
