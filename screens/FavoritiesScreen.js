import { View, Text, Image, StyleSheet, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { Video } from "expo-av";
import { ScreenOrientation } from "expo-screen-orientation";

const FavoritiesScreen = () => {
  const url =
    "https://llhls-live.akamaized.net/exp=1701859652~acl=%2F6feea0d5-e9f3-435b-8941-4513a6e5c585_llhls%2F%2A~hmac=cc6a0717c3866dbd6504e5a9c06277c56e5917a0f21309731de037af7d0c2eff/6feea0d5-e9f3-435b-8941-4513a6e5c585_llhls/chunklist_b600000_cmaf_v.m3u8"; // Replace with your actual streaming URL
  // https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
  //   https://d15umi5iaezxgx.cloudfront.net/LA7/CLN/HLS-B/Live.m3u8
  // https://mondotv-mondotvkids-1-it.samsung.wurl.tv/playlist.m3u8     cartoon Mondo TV Kids http://api.new.livestream.com/accounts/547271/events/4237509/live.m3u8
  //https://playout.cdn.cartoonnetwork.com.br/playout_05/playlist.m3u8
  const lockToLandscape = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  };

  const lockToPortrait = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>FavoritiesScreen</Text>
      <Text>Streaming URL TEST</Text>
      <Image
        source={{ uri: "https://i.imgur.com/Kat9kjm.png" }}
        width={100}
        height={100}
      />
      <Button title="Lock to Landscape" onPress={lockToLandscape} />
      <Button title="Lock to Portrait" onPress={lockToPortrait} />
      <Video
        source={{ uri: url }}
        style={styles.video}
        shouldPlay={true}
        usePoster={true}
        isMuted={true}
        useNativeControls={true}
        onError={(err) => {
          console.log(err);
        }}
        onLoad={async () => {
          await ScreenOrientation.unlockAsync();
        }}
        posterSource={{
          uri: "https://media3.giphy.com/media/MydKZ8HdiPWALc0Lqf/giphy.gif",
        }}
        posterStyle={{ width: "100%", height: 300, backgroundColor: "#FFFBF5" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    height: "50%",
    width: "100%",
    resizeMode: "stretch",
  },
});

export default FavoritiesScreen;
