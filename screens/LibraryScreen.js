import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Button, Chip } from "react-native-paper";
import LocalVideos from "../components/LocalVideos";
import StreamingVideos from "../components/StreamingVideos";

const LibraryScreen = () => {
  const [isLocal, setIsLocal] = useState(true);
  const [filteredbtn, setFilteredbtn] = useState();

  const handleToggle = (whichbutton) => {
    setFilteredbtn(whichbutton);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50 }}>
        {/* <Chip
          style={{ marginBottom: 4 }}
          icon="information"
          onPress={() => console.log("Pressed")}
        >
          Filter
        </Chip> */}
        <ScrollView horizontal={true}>
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
        </ScrollView>
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
