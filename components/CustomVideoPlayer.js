import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { Video } from "expo-av";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const CustomVideoPlayer = ({ videoUri }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSpeedSlider, setShowSpeedSlider] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [speedIcon, setSpeedIcon] = useState("speedometer-medium");

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

  const changePlaybackSpeed = async (speed) => {
    const roundedSpeed = Math.round(speed * 10) / 10; // Round to one decimal point
    if (videoRef.current) {
      await videoRef.current.setRateAsync(roundedSpeed, true);
      setPlaybackSpeed(roundedSpeed);
      if (roundedSpeed < 1) {
        setSpeedIcon("speedometer-slow");
      } else if (roundedSpeed > 1) {
        setSpeedIcon("speedometer");
      } else {
        setSpeedIcon("speedometer-medium");
      }
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
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: videoUri }}
        style={styles.video}
        resizeMode="contain"
        isLooping={false}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        volume={volume}
        onFullscreenUpdate={handleFullscreenUpdate}
      />

      <View style={styles.controls}>
        <View
          style={{
            flexDirection: "row",
            flex: 0.8,
            justifyContent: "center",
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
          />
          <View style={{ flexDirection: "column", marginLeft: -10 }}>
            <Text
              style={{
                color: "white",
                fontSize: 12,
                position: "absolute",
                bottom: -25,
                left: -250,
              }}
            >
              {formatTime(currentPosition)}
            </Text>
            <View style={{}}></View>
            <Text
              style={{
                color: "black",
                fontSize: 12,
                position: "absolute",
                bottom: -25,
                left: -35,
              }}
            >
              {formatTime(videoDuration)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 0.2,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setShowVolumeSlider(!showVolumeSlider);
              setShowSpeedSlider(false);
            }}
          >
            <MaterialIcons
              name={volume > 0 ? "volume-up" : "volume-off"}
              size={30}
              color="white"
            />
            <Text style={styles.volumeText}>{Math.round(volume * 100)}%</Text>
          </TouchableOpacity>
          {showVolumeSlider && (
            <View style={styles.volumeSliderContainer}>
              <Slider
                style={{
                  width: 100,
                  height: 30,
                  transform: [{ rotate: "-90deg" }],
                  backgroundColor: "#C683D7",
                  position: "absolute",
                  top: -110,
                  right: -20,
                }}
                minimumValue={0}
                maximumValue={1}
                value={volume}
                onValueChange={handleVolumeChange}
                thumbTintColor="red"
                vertical // Set the slider to vertical
              />
            </View>
          )}

          <TouchableOpacity
            onPress={() => {
              setShowSpeedSlider(!showSpeedSlider);
              setShowVolumeSlider(false);
            }}
          >
            <MaterialCommunityIcons name={speedIcon} size={30} color="white" />
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
          {showSpeedSlider && (
            <View style={styles.speedSliderContainer}>
              <Slider
                style={{
                  width: 100,
                  height: 30,
                  transform: [{ rotate: "-90deg" }],
                  backgroundColor: "#C683D7",
                  position: "absolute",
                  top: -110,
                  right: -55,
                }}
                minimumValue={0}
                maximumValue={2}
                value={playbackSpeed}
                onValueChange={changePlaybackSpeed}
                thumbTintColor="orange"
                vertical // Set the slider to vertical
              />
            </View>
          )}
        </View>
        <MaterialIcons
          name={isFullscreen === true ? "fullscreen" : "fullscreen-exit"}
          size={35}
          color={"white"}
          onPress={toggleFullScreenUpdate}
        />
      </View>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    flex: 1,
    aspectRatio: 16 / 9,
  },
  controls: {
    flexDirection: "row",
    height: "8%",
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: "center",
    backgroundColor: "#C683D7",
  },
  slider: {
    flex: 1,
  },
  volumeSlider: {
    flex: 1,
  },
  volumeSliderContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    alignItems: "center",
  },
  speedSliderContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    alignItems: "center",
  },
  volumeText: {
    color: "white",
    fontSize: 14,
    marginTop: -5,
  },
});

export default CustomVideoPlayer;
