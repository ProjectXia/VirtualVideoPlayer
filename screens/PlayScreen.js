import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useSelector } from "react-redux";
import { selectPlayValue } from "../features/playSlice";
import { SafeAreaView } from "react-native-safe-area-context";

const PlayScreen = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const playSelector = useSelector(selectPlayValue);

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}
    >
      <Video
        ref={video}
        style={{ width: "100%", height: "100%" }}
        source={{
          uri: playSelector,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping={false}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        progressUpdateIntervalMillis={500}
        positionMillis={0}
        shouldPlay={false}
        rate={1.0}
        shouldCorrectPitch={false}
        volume={1.0}
        isMuted={true}
        videoStyle={{ backgroundColor: "#9BBEC8" }}
      />
      {/* <View>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View> */}
      <View
        style={{
          flexDirection: "column",
          position: "absolute",
          top: 50,
          right: 10,
        }}
      >
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default PlayScreen;
