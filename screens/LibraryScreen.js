import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Toggle from "react-native-toggle-element";
import LocalVideos from "../components/LocalVideos";
import StreamingVideos from "../components/StreamingVideos";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

const LibraryScreen = () => {
  const [isLocal, setIsLocal] = useState(false);
  const [filteredbtn, setFilteredbtn] = useState("video");

  const handleToggle = (whichbutton) => {
    setFilteredbtn(whichbutton);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 25 }}>
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

        {/* <ScrollView horizontal={true}>
          <Button
            mode={filteredbtn === "video" ? "contained" : "outlined"}
            style={[styles.button]}
            icon={filteredbtn === "video" ? "video" : "video"}
            onPress={() => {
              setIsLocal(true);
              handleToggle("video");
              // setFilter(MediaLibrary.MediaType.video);
              // handleLoadItemOnFilter();
            }}
          >
            Local Video
          </Button>
          <Button
            mode={filteredbtn === "audio" ? "contained" : "outlined"}
            style={[styles.button]}
            icon={filteredbtn === "audio" ? "play" : "play"}
            onPress={() => {
              handleToggle("audio");
              setIsLocal(false);
              // setFilter(MediaLibrary.MediaType.audio);
              // handleLoadItemOnFilter();
            }}
          >
            Streaming Youtube
          </Button>
        </ScrollView> */}
      </View>
      {isLocal ? <LocalVideos /> : <StreamingVideos />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  videoItem: {
    flex: 1,
    margin: 5,
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 8,
    backgroundColor: "#9BBEC8",
    borderColor: "#427D9D",
  },
  videoThumbnail: {
    width: 173,
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  button: {
    marginRight: 5,
  },
  highlightedButton: {
    backgroundColor: "#9BBEC8", // Change to the color you want when button is highlighted
  },
});

export default LibraryScreen;
