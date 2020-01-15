import {Dimensions, Image, StyleSheet, View, ScrollView} from "react-native";
import Colors from "../../constants/Colors";
import React from 'react';
import ScreenTitle from "../../components/ScreenTitle";
import PlusBlock from "../../components/blocks/PlusBlock";
import ImageZoom from "react-native-image-pan-zoom";

const { width, height } = Dimensions.get("window");

export function SlopesMapScreen({showPOIMap, showSlopesMap, rotated, setRotated}) {
  return(
    <View style={styles.container}>
      <ScreenTitle title="Plan des pistes">
        <PlusBlock icon="backspace" adminIcon="rotate-right" color={Colors.white}
                   isAdmin={true}
                   action={() => showSlopesMap(false)}
                adminAction={() => setRotated(!rotated)}
        />
      </ScreenTitle>
      <View style={styles.mapContainer}>
        <ImageZoom
          cropHeight={height}
          cropWidth={width}
          imageHeight={rotated ? 4961 : 1749}
          imageWidth={4961}
          minScale={0.1}
          maxScale={2}
          enableCenterFocus={false}
        >
          <Image style={[(rotated) ? styles.landscapeMap : styles.portraitMap]} source={require('../../assets/images/SlopesMap.png')} resizeMode='contain'/>
        </ImageZoom>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackgroud,
    padding: 5
  },
  ContactList: {
    padding:15,
  },
  mapContainer: {
    flex: 1,
  },
  landscapeMap: {
    height:1749,
    width:4961,
    transform: [{ rotate: '90deg'}]
  },
  portraitMap: {
    height:1749,
    width:4961
  }
});