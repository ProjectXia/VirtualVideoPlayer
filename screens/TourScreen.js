import { View, Text, Image, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectTourValue, setValue } from "../features/tourSlice";

const slides = [
  {
    key: 1,
    title: "Video Streaming",
    text: "The VVPA must be able to support or handle video streaming from URLs.",
    image: require("../assets/tour/1.jpg"),
    backgroundColor: "#59b2ab",
  },
  {
    key: 2,
    title: "Media Library",
    text: "Media library must scan, and index videos stored on the device. Also, allow users to add and remove videos from playlists or mark them as favorites. ",
    image: require("../assets/tour/2.jpg"),
    backgroundColor: "#febe29",
  },
  {
    key: 3,
    title: "Video Playback",
    text: "Develop features like play, pause, seek, volume control, and playback speed adjustment.",
    image: require("../assets/tour/3.jpg"),
    backgroundColor: "#22bcb5",
  },
  {
    key: 4,
    title: "Videos Playlist",
    text: "Allow the user to remove or play all videos from playlist",
    image: require("../assets/tour/4.jpg"),
    backgroundColor: "#febe29",
  },
  {
    key: 5,
    title: "Favorities Videos",
    text: "Here are the favorities videos user can remove from favorite",
    image: require("../assets/tour/5.jpg"),
    backgroundColor: "#22bcb5",
  },
  {
    key: 6,
    title: "Setting",
    text: "Find the about of this app application tour and lot more settings!",
    image: require("../assets/tour/6.jpg"),
    backgroundColor: "#febe29",
  },
];

const TourScreen = () => {
  const isTour = useSelector(selectTourValue);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  console.log("tour val:" + isTour);
  const _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center",
          paddingVertical: 50,
          backgroundColor: item.backgroundColor,
        }}
      >
        <Text
          style={{
            fontSize: 26,
            color: "white",
            fontWeight: "400",
            marginBottom: 20,
          }}
        >
          {item.title}
        </Text>
        <Image
          source={item.image}
          style={{
            width: 350,
            height: 400,
            marginVertical: 20,
            borderRadius: 20,
            opacity: 0.8,
          }}
        />
        <Text
          style={{
            fontSize: 16,
            paddingHorizontal: 20,
            textAlign: "center",
            color: "white",
          }}
        >
          {item.text}
        </Text>
      </View>
    );
  };

  const _onDone = () => {
    dispatch(setValue(false));
    console.log("tour val:" + isTour);
    navigation.replace("Home");
  };
  const _onSkip = () => {
    // dispatch(setValue(false));
    // console.log("tour val:" + isTour);
    navigation.replace("Home");
  };
  useEffect(() => {
    if (isTour === false) {
      navigation.replace("Home");
    }
    console.log("tour screen: " + isTour);
  }, [isTour]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppIntroSlider
        renderItem={_renderItem}
        data={slides}
        onDone={_onDone}
        onSkip={_onSkip}
        showSkipButton={true}
      />
    </SafeAreaView>
  );
};

export default TourScreen;
