import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { Slider } from "react-native-elements";
import { Video, ResizeMode } from "expo-av";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const BACKGROUND_COLOR = "#FFF8ED";
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "...buffering...";
const RATE_SCALE = 3.0;
const VIDEO_CONTAINER_HEIGHT = (DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2;

const CustomVideoPlayer = ({ videoUri, type }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentVolume, setCurrentVolume] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [speedIcon, setSpeedIcon] = useState("speedometer-medium");
  const [setting, setSetting] = useState(false);
  const [videoWidth, setVideoWidth] = useState(Dimensions.get("window").width);
  const [videoHeight, setVideoHeight] = useState(VIDEO_CONTAINER_HEIGHT); // Assuming VIDEO_CONTAINER_HEIGHT is available

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
  _onLoad = (status) => {
    console.log(`ON LOAD : ${JSON.stringify(status)}`);
  };

  _onError = (error) => {
    console.log(`ON ERROR : ${error}`);
  };

  const onReadyForDisplay = (event) => {
    const { naturalSize } = event;
    const widestHeight =
      (Dimensions.get("window").width * naturalSize.height) / naturalSize.width;

    if (widestHeight > VIDEO_CONTAINER_HEIGHT) {
      setVideoWidth(
        (VIDEO_CONTAINER_HEIGHT * naturalSize.width) / naturalSize.height
      );
      setVideoHeight(VIDEO_CONTAINER_HEIGHT);
    } else {
      setVideoWidth(Dimensions.get("window").width);
      setVideoHeight(
        (Dimensions.get("window").width * naturalSize.height) /
          naturalSize.width
      );
    }
    Promise.reject();
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
          source={{
            uri: videoUri,
          }}
          style={{
            width: "100%",
            height: "auto",
            aspectRatio: 16 / 9,
          }}
          isLooping={false}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          volume={volume}
          usePoster={true}
          posterSource={{
            uri: "https://media3.giphy.com/media/MydKZ8HdiPWALc0Lqf/giphy.gif",
          }}
          posterStyle={{
            width: "100%",
            height: 300,
            backgroundColor: "#FFFBF5",
          }}
          isBuffering={true}
          isPlaying={type === "Local" ? false : true}
          onLoad={this._onLoad}
          onError={this._onError}
          resizeMode={ResizeMode.STRETCH}
          // onReadyForDisplay={this._onReadyForDisplay}
          //onFullscreenUpdate={handleFullscreenUpdate}
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
                style={{ marginHorizontal: -2 }}
              />
            </TouchableOpacity>

            <Slider
              // step={0.01}
              minimumValue={0}
              maximumValue={1}
              value={
                isNaN(currentPosition / videoDuration)
                  ? 0
                  : currentPosition / videoDuration
              }
              onValueChange={handleSliderChange}
              trackStyle={{
                height: 10,
                width: 290,
                backgroundColor: "white",
              }}
              thumbStyle={{
                height: 20,
                width: 10,
                backgroundColor: "orange",
              }}
            />

            <View style={{ flexDirection: "column", marginLeft: 0 }}>
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
              right: 20,
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
                step={0.01}
                minimumValue={0}
                maximumValue={1}
                value={volume}
                onValueChange={handleVolumeChange}
                trackStyle={{
                  height: 10,
                  width: 120,
                  backgroundColor: "orange",
                }}
                thumbStyle={{
                  height: 20,
                  width: 20,
                  backgroundColor: "orange",
                }}
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
                minimumValue={0}
                maximumValue={2}
                step={0.25}
                value={playbackSpeed}
                onValueChange={handlePlaybackSpeed}
                trackStyle={{
                  height: 10,
                  width: 120,
                  backgroundColor: "lightblue",
                }}
                thumbStyle={{
                  height: 20,
                  width: 20,
                  backgroundColor: "lightblue",
                }}
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
