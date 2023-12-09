import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
// import Video from "react-native-video";

const SettingsScreen = () => {
  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <Text>Setting </Text>
      {/* <Video
        source={{
          uri: "https://playout.cdn.cartoonnetwork.com.br/playout_05/playlist.m3u8",
        }} // Can be a URL or a local file.
        // Store reference
        onBuffer={true}
        onError={(err) => {
          console.log(err);
        }}
        paused={false}
        style={styles.backgroundVideo}
      /> */}
    </View>
  );
};
var styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default SettingsScreen;
