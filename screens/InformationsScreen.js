import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    View,
    ListView,
    Button,
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import CollapsibleList from 'react-native-collapsible-list';
import {ListItem} from 'react-native-elements'
import StyledText from "../components/StyledText";
import static_infos from "../assets/static_infos.json";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ScreenTitle from "../components/ScreenTitle";

const contactsSkiut = static_infos.Contacts;
const contactsImportants = static_infos.ContactsAutres;


function AssoContactList({ data }) {
  return (
     data.map((l, i) => 
        <ListItem 
          key={i}
          leftAvatar={{ source: {uri: l.Photo}}} 
          title={l.Nom} 
          subtitle={l.Poste} 
          bottomDivider 
          chevron />)
   );
};
function AutresContactList({ data }) {
  return (
     data.map((l, i) => 
        <ListItem 
          key={i} 
          title={l.Nom}  
          bottomDivider
          chevron />)
   );
};

export const InfosScreenManager = () => {
  const [PlanPistes, showPlanPistes] = React.useState(false);

  if (PlanPistes) {
    return <PlanPistesScreen showPlanPistes={ showPlanPistes } />
  }

  return <InformationsScreen showPlanPistes={ showPlanPistes } />
}
function InformationsScreen({showPlanPistes}) {
    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}>
                <ScreenTitle title="Informations">
                </ScreenTitle>

                <View><Text>Les Contacts:</Text></View>

                <CollapsibleList
                          numberOfVisibleItems={1}
                          wrapperStyle={styles.wrapperCollapsibleList}
                          buttonContent={
                            <View style={styles.button}>
                              <Text style={styles.buttonText}>Afficher/Cacher</Text>
                            </View>
                          }
                >

                <View style={styles.collapsibleItem}><Text>Team Skiutc</Text></View>
                <View style={styles.collapsibleItem}>
                <AssoContactList data={contactsSkiut}/>
                </View>
                </CollapsibleList>

                <CollapsibleList
                          numberOfVisibleItems={1}
                          wrapperStyle={styles.wrapperCollapsibleList}
                          buttonContent={
                            <View style={styles.button}>
                              <Text style={styles.buttonText}>Afficher/Cacher</Text>
                            </View>
                          }
                >
                <View style={styles.collapsibleItem}><Text>Importants</Text></View>
                <View style={styles.collapsibleItem}>
                <AutresContactList data={contactsImportants}/>
                </View>
                </CollapsibleList>

                <Button
                title="Le plan des pistes"
                onPress={() => showPlanPistes(true)}
                />
            </ScrollView>
        </View>
    );
}

function PlanPistesScreen() {
  return(
    <PlanPistes>
    </PlanPistes>
  )
}

InformationsScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    Contact: {
      marginTop: 15,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    wrapperCollapsibleList: {
        flex: 1,
        marginTop: 20,
        overflow: "hidden",
        backgroundColor: "#FFF",
        borderRadius: 5
    },
    collapsibleItem: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: "#CCC",
      padding: 10
    }
})
