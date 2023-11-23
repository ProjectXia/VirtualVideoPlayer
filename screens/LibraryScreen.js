import React from "react";
import { useEffect, useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { Button, Chip } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setValue } from "../features/playSlice";

const LibraryScreen = () => {
  const [videos, setVideos] = useState([]);
  const [videoload, setVideoLoad] = useState(50);
  const [showLoading, setShowLoading] = useState(true);
  const [filter, setFilter] = useState(MediaLibrary.MediaType.video);
  const [filteredbtn, setFilteredbtn] = useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        fetchVideos();
      } else {
        console.log("Permission denied");
        // Handle permission denied case
      }
    } catch (error) {
      console.error("Error requesting permission:", error);
    }
  };

  const fetchVideos = async () => {
    try {
      setShowLoading(true);
      const { assets } = await MediaLibrary.getAssetsAsync({
        mediaType: filter,
        first: videoload,
      });

      setVideos(assets);
      setShowLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const renderVideoItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.videoItem}
        onPress={() => {
          console.log(item.uri);
          dispatch(setValue(item.uri));
          navigation.navigate("Play");
        }}
      >
        <Image
          source={{ uri: item.uri }}
          style={styles.videoThumbnail}
          resizeMode="cover"
        />

        <View
          style={{
            backgroundColor: "#427D9D",
            width: "100%",
            paddingTop: 2,
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              paddingHorizontal: 3,
              color: "white",
              textAlign: "center",
            }}
          >
            ({index}) {item.filename}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleToggle = (whichbutton) => {
    setFilteredbtn(whichbutton);
  };

  const handleLoadItemOnFilter = () => {
    fetchVideos();
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50 }}>
        <Chip
          style={{ marginBottom: 4 }}
          icon="information"
          onPress={() => console.log("Pressed")}
        >
          Filter
        </Chip>
        <ScrollView horizontal={true}>
          <Button
            mode={filteredbtn === "video" ? "contained" : "outlined"}
            style={[styles.button]}
            icon={filteredbtn === "video" ? "video" : "video"}
            onPress={() => {
              handleToggle("video");
              setFilter(MediaLibrary.MediaType.video);
              handleLoadItemOnFilter();
            }}
          >
            Video
          </Button>
          {/* <Button
            mode={filteredbtn === "audio" ? "contained" : "outlined"}
            style={[styles.button]}
            icon={filteredbtn === "audio" ? "music" : "music"}
            onPress={() => {
              handleToggle("audio");
              setFilter(MediaLibrary.MediaType.audio);
              handleLoadItemOnFilter();
            }}
          >
            Audio
          </Button> */}
          {/* <Button
            mode={filteredbtn === "photo" ? "contained" : "outlined"}
            icon={filteredbtn === "photo" ? "camera" : "camera"}
            style={[styles.button]}
            onPress={() => {
              handleToggle("photo");
              setFilter(MediaLibrary.MediaType.photo);
              handleLoadItemOnFilter();
            }}
          >
            Photo
          </Button> */}
        </ScrollView>
      </View>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={renderVideoItem}
        numColumns={2}
        // Adjust the number of columns as needed
        onRefresh={showLoading}
        refreshing={false}
        onEndReached={() => {
          var nextLoading = videoload + 50;
          setVideoLoad(nextLoading);
          fetchVideos();
        }}
        extraData={videos}
      />
      {showLoading === true ? (
        <ActivityIndicator
          size={200}
          color={"lightgray"}
          style={{ flex: 1, position: "absolute", top: 300, left: 100 }}
        />
      ) : (
        <></>
      )}
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
