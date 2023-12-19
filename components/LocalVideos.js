import { useEffect, useState } from "react";
import React from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { Button, Card } from "react-native-paper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setStream, setValue } from "../features/playSlice";
import {
  addToPlaylist,
  removeFromPlaylist,
  selectPlaylistItems,
} from "../features/playlistSlice";
import {
  addTofavlist,
  removeFromfavlist,
  selectfavlistItems,
} from "../features/favoritiesSlice";

const LocalVideos = () => {
  const [videos, setVideos] = useState([]);
  const [videoload, setVideoLoad] = useState(50);
  const [showLoading, setShowLoading] = useState(false);
  const [filter, setFilter] = useState(MediaLibrary.MediaType.video);

  const navigation = useNavigation();
  const allfavlist = useSelector(selectfavlistItems);
  const allPlayList = useSelector(selectPlaylistItems);
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
    const isItemFavorite = allfavlist.some(
      (element) => element.http === item.uri
    );
    const isItemInPlaylist = allPlayList.some(
      (element) => element.http === item.uri
    );
    return (
      <Card style={{ margin: 2, width: 182.5 }}>
        <TouchableOpacity
          onPress={() => {
            console.log(item.uri);
            dispatch(setValue(item.uri));
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: 170,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                const data = {
                  id: index,
                  logo: item.uri,
                  name: item.filename,
                  http: item.uri,
                };
                // console.log(data);
                if (isItemInPlaylist) {
                  dispatch(removeFromPlaylist({ id: index }));
                } else {
                  dispatch(addToPlaylist(data));
                }
              }}
            >
              {isItemInPlaylist ? (
                <MaterialIcons
                  name="playlist-add-check"
                  size={30}
                  color={"green"}
                />
              ) : (
                <MaterialIcons
                  name="playlist-add"
                  size={30}
                  color={"lightgray"}
                />
              )}

              <Text style={{ fontSize: 8, marginTop: -5 }}>Playlist</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const data = {
                  id: index,
                  logo: item.uri,
                  name: item.filename,
                  http: item.uri,
                  isfav: true,
                };
                //console.log(data);
                if (isItemFavorite) {
                  dispatch(removeFromfavlist({ id: index }));
                } else {
                  dispatch(addTofavlist(data));
                }
              }}
            >
              {isItemFavorite ? (
                <MaterialIcons name={"favorite"} size={30} color={"red"} />
              ) : (
                <MaterialIcons
                  name={"favorite-outline"}
                  size={30}
                  color={"lightgray"}
                />
              )}

              <Text style={{ fontSize: 8, marginTop: -5 }}>Favorite</Text>
            </TouchableOpacity>
          </View>
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
