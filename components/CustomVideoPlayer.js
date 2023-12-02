import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Slider from "react-native-slider";
import { Video } from "expo-av";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

const CustomVideoPlayer = ({ videoUri, vheight, vwidth }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentVolume, setCurrentVolume] = useState();
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [speedIcon, setSpeedIcon] = useState("speedometer-medium");
  const [setting, setSetting] = useState(false);

  const togglePlayPause = async () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (value) => {
    if (!videoRef.current) return;

    videoRef.current.setPositionAsync(value * videoDuration);
    setCurrentPosition(value * videoDuration);
  };

  const handlePlaybackSpeed = async (speed) => {
    const roundedSpeed = Math.round(speed * 10) / 10; // Round to one decimal point
    if (videoRef.current) {
      await videoRef.current.setRateAsync(roundedSpeed, true);
      if (roundedSpeed < 1) {
        setSpeedIcon("speedometer-slow");
      } else if (roundedSpeed > 1) {
        setSpeedIcon("speedometer");
      } else {
        setSpeedIcon("speedometer-medium");
      }
      setPlaybackSpeed(roundedSpeed);
    }
  };

  const handleVolumeChange = (value) => {
    if (!videoRef.current) return;
    videoRef.current.setVolumeAsync(value);
    setVolume(value);
  };

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setVideoDuration(status.durationMillis);
      setCurrentPosition(status.positionMillis);
      setIsPlaying(status.isPlaying);
    }
    if (status.didJustFinish) {
      videoRef.current.setPositionAsync(0);
      videoRef.current.pauseAsync();
    }
  };
  const toggleFullScreenUpdate = () => {
    setIsFullscreen(!isFullscreen);
    if (isFullscreen) {
      videoRef.current.presentFullscreenPlayer();
    }
  };
  const handleFullscreenUpdate = ({ fullscreenUpdate, status }) => {
    // console.log(fullscreenUpdate);
    switch (fullscreenUpdate) {
      case 1:
        console.log(" the fullscreen player is about to present");
        break;
      case 2:
        console.log("the fullscreen player just finished presenting");
        break;
      case 3:
        console.log("the fullscreen player is about to dismiss");
        setIsFullscreen(!isFullscreen);
        break;
      case 4:
        console.log("the fullscreen player just finished dismissing");
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {/* /////////////////// Video View/////////////////////////// */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Video
          ref={videoRef}
          source={{ uri: videoUri }}
          style={[styles.video, { height: 400, width: 300 }]}
          resizeMode="contain"
          isLooping={false}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          volume={volume}
          onFullscreenUpdate={handleFullscreenUpdate}
        />
      </View>
      {/* ///////////END//////// Video View/////////////////////////// */}
      {/* //////////////////////Contorls Area//////////////////////// */}
      <View
        style={{
          flex: 0.1,
          backgroundColor: "rgba(124,147,195,0.9)",
          justifyContent: "center",
          alignItems: "center",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      >
        {/* Controls setting play slider and setting and fullScreen icons */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 6,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={togglePlayPause}>
              <MaterialIcons
                name={isPlaying ? "pause" : "play-arrow"}
                size={30}
                color="white"
                style={{ marginHorizontal: -10 }}
              />
            </TouchableOpacity>

            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={currentPosition / videoDuration}
              onValueChange={handleSliderChange}
              trackStyle={{ height: 10, backgroundColor: "white" }}
              thumbStyle={{
                height: 20,
                width: 10,
                backgroundColor: "orange",
              }}
            />

            <View style={{ flexDirection: "column", marginLeft: -10 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  position: "absolute",
                  bottom: -33,
                  left: -285,
                }}
              >
                {formatTime(currentPosition)}
              </Text>

              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  position: "absolute",
                  bottom: -33,
                  left: -20,
                }}
              >
                {formatTime(videoDuration)}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                setSetting(!setting);
              }}
            >
              <Ionicons
                name={setting ? "settings" : "settings-outline"}
                size={30}
                color="white"
              />
            </TouchableOpacity>
            <MaterialIcons
              name={isFullscreen === true ? "fullscreen" : "fullscreen-exit"}
              size={35}
              color={"white"}
              onPress={toggleFullScreenUpdate}
            />
          </View>
        </View>
        {/* END Controls setting play slider and setting and fullScreen icons */}

        {setting ? (
          <View
            style={{
              width: 160,
              height: 100,
              backgroundColor: "rgba(124,147,195,0.5)",
              position: "absolute",
              top: -105,
              right: 10,
              borderRadius: 10,
            }}
          >
            {/* //////////////////Volume//////////////////////// */}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setCurrentVolume(volume);
                  if (volume === 0) {
                    setVolume(currentVolume);
                  } else {
                    setVolume(0);
                  }
                }}
              >
                <MaterialIcons
                  name={volume > 0 ? "volume-up" : "volume-off"}
                  size={30}
                  color="orange"
                />
                <Text style={{ color: "white" }}>
                  {Math.round(volume * 100)}%
                </Text>
              </TouchableOpacity>

              <Slider
                style={{ width: 120, height: 30 }}
                step={0.01}
                minimumValue={0}
                maximumValue={1}
                value={volume}
                onValueChange={handleVolumeChange}
                trackStyle={{
                  height: 10,
                  backgroundColor: "orange",
                }}
                thumbStyle={{
                  height: 20,
                  width: 20,
                  backgroundColor: "orange",
                }}
                // vertical // Set the slider to vertical
              />
            </View>
            {/* ///////////END///////Volume//////////////////////// */}
            {/* //////////////////Speed//////////////////////// */}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setSpeedIcon("speedometer-medium");
                  setPlaybackSpeed(1);
                }}
              >
                <MaterialCommunityIcons
                  name={speedIcon}
                  size={30}
                  color="lightblue"
                />
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    marginTop: -5,
                    textAlign: "center",
                  }}
                >
                  {playbackSpeed.toFixed(1)}
                </Text>
              </TouchableOpacity>

              <Slider
                style={{ width: 120, height: 30 }}
                minimumValue={0}
                maximumValue={2}
                step={0.1}
                value={playbackSpeed}
                onValueChange={handlePlaybackSpeed}
                trackStyle={{ height: 10, backgroundColor: "lightblue" }}
                thumbStyle={{
                  height: 20,
                  width: 20,
                  backgroundColor: "lightblue",
                }}
                //vertical // Set the slider to vertical
              />
            </View>
            {/* ///////////END///////Speed//////////////////////// */}
          </View>
        ) : (
          <></>
        )}
      </View>
      {/* ///////////////////////Controls Area End//////////////////////////// */}
    </View>
  );
};

const formatTime = (millis) => {
  if (millis < 0) {
    return "00:00";
  }
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const padWithZero = (number) => {
    return number.toString().padStart(2, "0");
  };
  return `${padWithZero(minutes)}:${padWithZero(seconds)}`;
};

const styles = StyleSheet.create({
  video: {
    flex: 1,
    aspectRatio: 16 / 9,
  },

  slider: {
    flex: 0.95,
    marginLeft: 10,
  },
});

export default CustomVideoPlayer;
