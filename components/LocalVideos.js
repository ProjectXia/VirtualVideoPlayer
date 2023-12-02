import { useEffect, useState } from "react";
import React from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  setHeight,
  setStream,
  setValue,
  setWidth,
} from "../features/playSlice";

const LocalVideos = () => {
  const [videos, setVideos] = useState([]);
  const [videoload, setVideoLoad] = useState(50);
  const [showLoading, setShowLoading] = useState(false);
  const [filter, setFilter] = useState(MediaLibrary.MediaType.video);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleButtonPress = () => {
    setShowLoading(true); // Set loading state to true
    // Simulate an asynchronous action (e.g., API call) for 2 seconds
    var nextLoading = videoload + 50;
    setVideoLoad(nextLoading);
    fetchVideos();
    setTimeout(() => {
      setShowLoading(false); // Set loading state to false after the action is complete
    }, 5000);
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        console.log("Permission granted!");
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
      console.log("Local videos fetched.................");
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
          dispatch(setHeight(item.height));
          dispatch(setWidth(item.width));
          dispatch(setStream("Local"));
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
    <View
      style={{
        marginVertical: 20,
        flex: 1,
        width: "100%",
      }}
    >
      <Button
        mode="contained"
        onPress={handleButtonPress}
        disabled={showLoading} // Disable the button when in loading state
        style={styles.button}
        labelStyle={styles.buttonLabel}
        loading={showLoading}
      >
        Sync Video From Local Storage
      </Button>
      <View style={styles.container}>
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          renderItem={renderVideoItem}
          numColumns={2}
          // Adjust the number of columns as needed
          refreshing={false}
          // onEndReached={() => {
          //   var nextLoading = videoload + 50;
          //   setVideoLoad(nextLoading);
          //   fetchVideos();
          // }}
          extraData={videos}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
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
    opacity: 0.5,
  },
  button: {
    marginRight: 5,
  },
  highlightedButton: {
    backgroundColor: "#9BBEC8", // Change to the color you want when button is highlighted
  },
});

export default LocalVideos;
