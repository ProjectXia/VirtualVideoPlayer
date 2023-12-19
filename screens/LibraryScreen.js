import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Toggle from "react-native-toggle-element";
import LocalVideos from "../components/LocalVideos";
import StreamingVideos from "../components/StreamingVideos";
import { MaterialIcons } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";
import { useFocusEffect } from "@react-navigation/native";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const LibraryScreen = () => {
  const [isLocal, setIsLocal] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      async function doPortrait() {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        );
      }
      doPortrait();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View>
        {/* ///////////// Header/////////////////////// */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 26, fontWeight: "500", color: "#5C5470" }}>
              Welcome to
            </Text>
            <Text
              style={{
                fontSize: 23,
                fontWeight: "500",
                color: "#5C5470",
                marginBottom: 10,
              }}
            >
              Virtual Video Player
            </Text>
          </View>
          <View style={{ paddingHorizontal: 5 }}>
            <Toggle
              value={!isLocal}
              onPress={() => {
                setIsLocal(!isLocal);
              }}
              thumbActiveComponent={
                <MaterialIcons name="live-tv" size={25} color={"white"} />
              }
              thumbInActiveComponent={
                <MaterialIcons name="folder" size={30} color={"white"} />
              }
              trackBar={{
                activeBackgroundColor: "#AE445A",
                inActiveBackgroundColor: "#5C8374",
                height: 30,
                width: 150,
              }}
              thumbButton={{
                inActiveBackgroundColor: "#183D3D",
                activeBackgroundColor: "#662549",
                width: 40,
                height: 40,
              }}
            />
          </View>
        </View>
        {/* ///////////////////Header END//////////////// */}
      </View>
      <ScrollView>{isLocal ? <LocalVideos /> : <StreamingVideos />}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});

export default LibraryScreen;
