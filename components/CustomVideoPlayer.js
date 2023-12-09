import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { Slider } from "react-native-elements";
import { Video, ResizeMode } from "expo-av";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";

const CustomVideoPlayer = ({ videoUri, vw, vh, type, poster }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentVolume, setCurrentVolume] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [speedIcon, setSpeedIcon] = useState("speedometer-medium");
  const [setting, setSetting] = useState(false);
  const { height, width } = useWindowDimensions();
  const [clicked, setClicked] = useState(true);

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
    console.log("Video Duration: " + videoDuration);
    console.log("Video Value: " + value);
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
  const toggleFullScreenUpdate = async () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
  };
  const handleFullscreenUpdate = async ({ fullscreenUpdate, status }) => {
    // console.log(fullscreenUpdate);
    try {
      switch (fullscreenUpdate) {
        case 1:
          console.log("The fullscreen player is about to present");

          break;
        case 2:
          console.log("The fullscreen player just finished presenting");
          // Handle the action after the player finishes presenting
          break;
        case 3:
          console.log("The fullscreen player is about to dismiss");
          setIsFullscreen(!isFullscreen);
          break;
        case 4:
          console.log("The fullscreen player just finished dismissing");
          // Handle the action after the player finishes dismissing
          break;
        default:
          // Handle any other cases here
          break;
      }
      return Promise.resolve(); // Resolve the promise after completion
    } catch (error) {
      return Promise.reject(error); // Reject the promise if an error occurs
    }
  };
  _onLoad = async (status) => {
    try {
      console.log(`ON LOAD: ${JSON.stringify(status)}`);
      await ScreenOrientation.unlockAsync();
      // const PPI = 409;
      // const heightInches = height / PPI;
      // const widthInches = width / PPI;
      // console.log(heightInches.toFixed(2));
      // console.log(widthInches.toFixed(2));
      // console.log("WW:" + width + " WH: " + height);
      return Promise.resolve(); // Resolve the promise after completion
    } catch (error) {
      return Promise.reject(error); // Reject the promise if an error occurs
    }
  };

  _onError = (error) => {
    try {
      console.error(`ON ERROR : ${error}`);
      return Promise.resolve(); // Resolve the promise after completion
    } catch (error) {
      return Promise.reject(error); // Reject the promise if an error occurs
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {isFullscreen ? <StatusBar hidden /> : <></>}
      {/* /////////////////// Video View/////////////////////////// */}
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          setClicked(true);
          setTimeout(() => {
            setClicked(false);
            setSetting(false);
          }, 10000);
        }}
      >
        <Video
          ref={videoRef}
          source={{
            uri: videoUri,
          }}
          style={{
            width: width,
            height: height,
            borderWidth: 2,
            borderColor: "orange",
          }}
          isLooping={false}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          volume={volume}
          usePoster={poster}
          posterSource={{
            uri: "https://media3.giphy.com/media/MydKZ8HdiPWALc0Lqf/giphy.gif",
          }}
          onReadyForDisplay={async (event) => {
            console.log(event.naturalSize);
            // switch (event.naturalSize.orientation) {
            //   case "landscape":
            //     await ScreenOrientation.lockAsync(
            //       ScreenOrientation.OrientationLock.PORTRAIT
            //     );
            //     setIsFullscreen(false);
            //     break;
            //   case "portrait":
            //     break;
            // }
          }}
          posterStyle={{
            width: "100%",
            height: 250,
          }}
          isBuffering={true}
          isPlaying={type === "Local" ? false : true}
          onLoad={this._onLoad}
          onError={this._onError}
          resizeMode={ResizeMode.CONTAIN}
          // onFullscreenUpdate={handleFullscreenUpdate}
        />
        {clicked && (
          <View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              backgroundColor: "rgba(0,0,0,.2)",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "rgba(0,0,0,0.4)",
                paddingVertical: 8,
                // paddingHorizontal: 40,
                width: width,
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                onPress={async () => {
                  if (isFullscreen) {
                    await ScreenOrientation.lockAsync(
                      ScreenOrientation.OrientationLock.PORTRAIT
                    );
                  } else {
                    await ScreenOrientation.lockAsync(
                      ScreenOrientation.OrientationLock.LANDSCAPE
                    );
                  }
                  setIsFullscreen(!isFullscreen);
                }}
                style={{
                  borderWidth: 1,
                  borderColor: "white",
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isFullscreen ? (
                  <Ionicons
                    name="phone-portrait-outline"
                    size={27}
                    color={"white"}
                  />
                ) : (
                  <Ionicons
                    name="phone-landscape-outline"
                    size={27}
                    color={"white"}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSetting(!setting);
                  setTimeout(() => {
                    setSetting(false);
                  }, 5000);
                }}
                style={{
                  borderWidth: 1,
                  borderColor: "white",
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name={setting ? "settings" : "settings-outline"}
                  size={28}
                  color={"white"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "white",
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  setClicked(false);
                  setSetting(false);
                }}
              >
                <Entypo name="cross" size={32} color={"white"} />
              </TouchableOpacity>
            </View>
            {setting ? (
              <View
                style={{
                  flexDirection: "column",
                  height: 100,
                  borderWidth: 0.5,
                  borderColor: "orange",
                  position: "absolute",
                  backgroundColor: "rgba(0,0,0,0.4)",
                  top: 60,
                  right: 40,
                  padding: 2,
                  borderRadius: 10,
                  justifyContent: "center",
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
                      height: 5,
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
                      height: 5,
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: width,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  //seek back
                }}
              >
                <Image
                  source={require("../assets/backward.png")}
                  style={{ width: 40, height: 40, tintColor: "white" }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={togglePlayPause}>
                <Image
                  source={
                    isPlaying
                      ? require("../assets/pause.png")
                      : require("../assets/play-button.png")
                  }
                  style={{
                    width: 40,
                    height: 40,
                    tintColor: "white",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // seek forward
                  videoRef.current.setPositionAsync;
                }}
              >
                <Image
                  source={require("../assets/forward.png")}
                  style={{
                    width: 40,
                    height: 40,
                    tintColor: "white",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "rgba(0,0,0,0.6)",
                width: "100%",
                padding: 10,
              }}
            >
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
                  height: 5,
                  width: width - 30,
                  backgroundColor: "white",
                }}
                thumbStyle={{
                  height: 14,
                  width: 8,
                  backgroundColor: "orange",
                }}
              />
              <View style={{ position: "absolute", left: 10 }}>
                <Text style={{ color: "white" }}>
                  {formatTime(currentPosition)}
                </Text>
              </View>
              <View style={{ position: "absolute", right: 15 }}>
                <Text style={{ color: "white" }}>
                  {formatTime(videoDuration)}
                </Text>
              </View>
            </View>
          </View>
          /////////////////////////Controls//////////////////////
        )}
      </TouchableOpacity>
      {/* ///////////END//////// Video View/////////////////////////// */}
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
