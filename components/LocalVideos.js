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
import { Button, Card } from "react-native-paper";
import { Ionicons, Entypo } from "@expo/vector-icons";
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
        // fetchVideos();
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
      <Card style={{ margin: 2, width: 182.5 }}>
        {/* <Card.Title title="Card Title" subtitle="Card Subtitle" /> */}
        {/* <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content> */}
        <TouchableOpacity
          onPress={() => {
            console.log(item.uri);
            dispatch(setValue(item.uri));
            dispatch(setHeight(item.height));
            dispatch(setWidth(item.width));
            dispatch(setStream("Local"));
            navigation.navigate("Play");
          }}
        >
          <Card.Cover
            source={{ uri: item.uri }}
            style={{ height: 120 }}
            mode="contained"
          />
          <Ionicons
            name="play-circle-outline"
            color={"red"}
            size={45}
            style={{ position: "absolute", top: 35, left: 70 }}
          />
        </TouchableOpacity>

        <Card.Actions>
          <Button>Add to Playlist</Button>
        </Card.Actions>
      </Card>
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
          extraData={videos}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
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
