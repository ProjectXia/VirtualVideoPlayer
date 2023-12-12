import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video, ResizeMode } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromPlaylist,
  selectPlaylistItems,
} from "../features/playlistSlice";

const PlaylistScreen = () => {
  //
  const videoRef = useRef(null);
  const [isPlayAll, setIsPlayAll] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0); // Keep track of current item being played

  const selectPlaylist = useSelector(selectPlaylistItems);
  const dispatch = useDispatch();

  //console.log(selectPlaylist[0]);

  const handlePlaybackStatusUpdate = (status) => {
    if (status.didJustFinish && isPlayAll) {
      playNextItem();
    }
  };

  const playNextItem = async () => {
    if (currentPlaylistIndex + 1 < selectPlaylist.length) {
      setCurrentPlaylistIndex(currentPlaylistIndex + 1);
      await videoRef.current.playAsync();
    } else {
      setIsPlayAll(false);
      setCurrentPlaylistIndex(0);
      await videoRef.current.pauseAsync();
    }
  };

  const handlePlayAll = async () => {
    if (!isPlayAll && selectPlaylist.length > 0) {
      setIsPlayAll(true);
      setCurrentPlaylistIndex(0);
      await videoRef.current.playAsync();
    } else {
      setIsPlayAll(false);
      setCurrentPlaylistIndex(0);
      await videoRef.current.pauseAsync();
    }
  };

  const farward = async () => {
    if (currentPlaylistIndex === selectPlaylist.length - 1) {
      setCurrentPlaylistIndex(0);
      await videoRef.current.pauseAsync();
    } else {
      setCurrentPlaylistIndex(currentPlaylistIndex + 1);
    }
  };

  const backward = async () => {
    if (currentPlaylistIndex === 0) {
      setCurrentPlaylistIndex(selectPlaylist.length - 1);
      await videoRef.current.pauseAsync();
    } else {
      setCurrentPlaylistIndex(currentPlaylistIndex - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "100%", height: 270, backgroundColor: "#F2F1EB" }}>
        <Video
          ref={videoRef}
          source={{
            uri:
              selectPlaylist.length === 0
                ? ""
                : selectPlaylist[currentPlaylistIndex].http,
          }}
          style={{
            width: "100%",
            height: 270,
          }}
          shouldPlay={false}
          usePoster={true}
          isMuted={false}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls={clicked}
          onError={(err) => {
            console.log(err);
          }}
          posterSource={{
            uri: "https://media3.giphy.com/media/MydKZ8HdiPWALc0Lqf/giphy.gif",
          }}
          posterStyle={{
            width: "100%",
            height: 300,
            backgroundColor: "#FFFBF5",
          }}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />

        <TouchableOpacity
          style={{
            position: "absolute",
            width: "100%",
            height: 210,
            justifyContent: "center",
          }}
          onPress={() => {
            setClicked(!clicked);
          }}
        >
          {clicked && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  backward();
                }}
              >
                <AntDesign name="stepbackward" size={30} color={"white"} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  farward();
                }}
              >
                <AntDesign name="stepforward" size={30} color={"white"} />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#EEEDED",
          paddingVertical: 5,
          paddingHorizontal: 5,
          marginBottom: 10,
        }}
      >
        <MaterialIcons name="playlist-play" size={30} />
        <Text style={styles.title}> Playlist [{selectPlaylist.length}] </Text>
        <TouchableOpacity
          onPress={() => {
            if (selectPlaylist.length === 0) {
              return;
            }
            handlePlayAll();
          }}
        >
          {isPlayAll ? (
            <Button icon={"stop"} mode="contained-tonal">
              Stop all
            </Button>
          ) : (
            <Button icon={"play"} mode="contained-tonal">
              Play all
            </Button>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={selectPlaylist}
        horizontal={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setCurrentPlaylistIndex(index);
              }}
            >
              <Image
                source={{ uri: item.logo }}
                width={190}
                height={190}
                style={
                  index === currentPlaylistIndex
                    ? { margin: 2, borderColor: "red", borderWidth: 2 }
                    : { margin: 2 }
                }
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 5, top: 5 }}
                onPress={() => {
                  dispatch(removeFromPlaylist({ id: item.id }));
                }}
              >
                <MaterialIcons name="cancel" size={35} color={"red"} />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListEmptyComponent={
          <View
            style={{
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: "https://i.pinimg.com/originals/69/f0/c4/69f0c4bf1628e22dfdb8248fa479503b.jpg",
              }}
              width={150}
              height={150}
            />
            <Text style={{ fontSize: 16, color: "gray", fontWeight: "600" }}>
              Play list is empty
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default PlaylistScreen;
