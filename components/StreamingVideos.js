import React, { useState } from "react";
import {
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { setStream, setValue } from "../features/playSlice";

const LeftContent = (props) => <Avatar.Icon {...props} icon="search-web" />;

const StreamingVideos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const searchVideos = async () => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            key: "AIzaSyAMlNGu1majTRYUpaZnMauUQY7YmpLy8nI",
            q: searchQuery,
            part: "snippet",
            maxResults: 25, // Number of results to retrieve (adjust as needed)
            type: "video",
          },
        }
      );

      if (response.data && response.data.items) {
        setVideos(response.data.items);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <Card
        style={{
          marginHorizontal: 5,
          marginVertical: 5,
          borderWidth: 1.5,
          borderColor: "gray",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            dispatch(setValue(item.id.videoId));
            dispatch(setStream("URL"));
            navigation.navigate("Play");
          }}
        >
          <Card.Cover source={{ uri: item.snippet.thumbnails.medium.url }} />
          <Entypo
            name="youtube"
            size={60}
            color={"red"}
            style={{ position: "absolute", top: 60, left: 150 }}
          />
        </TouchableOpacity>

        <Card.Title title={item.snippet.title} />
        <Card.Content>
          <Text variant="titleMedium">{item.snippet.title}</Text>
          <Text variant="bodySmall">{item.snippet.description}</Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={{ paddingHorizontal: 2 }}>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderWidth: 1,
          borderRadius: 20,
          backgroundColor: "transparent",
        }}
      >
        <TextInput
          placeholder="Search youtube videos..."
          style={{
            height: 40,
            paddingHorizontal: 10,
            flex: 1,
            backgroundColor: "transparent",
            borderRadius: 20,
            color: "#645CBB",
            fontWeight: "600",
          }}
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <TouchableOpacity onPress={searchVideos}>
          <Ionicons name="search" size={35} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.videoId}
      />
    </View>
  );
};

export default StreamingVideos;
