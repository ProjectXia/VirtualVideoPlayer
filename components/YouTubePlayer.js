import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert, Dimensions } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const YouTubePlayer = ({ videoID }) => {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      //   Alert.alert("video has finished playing!");
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 300,
      }}
    >
      <YoutubePlayer
        ref={playerRef}
        height={400}
        width={390}
        play={playing}
        initialPlayerParams={{ color: "blue", controls: false }}
        videoId={videoID}
        onChangeState={onStateChange}
      />
    </View>
  );
};

export default YouTubePlayer;
