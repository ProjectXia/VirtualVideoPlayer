import {
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { setStream, setValue } from "../features/playSlice";
import React, { useEffect, useState } from "react";

const StreamingVideos = () => {
  const [fileChannelContent, setFileChannelContent] = useState([]);
  const [fileKidsContent, setFileKidsContent] = useState([]);
  const [fileSportsContent, setFileSportsContent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const renderItem = ({ item }) => {
    return (
      <Card
        style={{
          margin: 2,
          width: 115.5,
          height: 135,
          elevation: 1,
          marginHorizontal: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            dispatch(setValue(item.http));
            dispatch(setStream("URL"));
            navigation.navigate("Play");
            // console.log(item);
          }}
        >
          <Card.Cover
            source={{
              uri: item.logo,
            }}
            style={{ height: 135, width: 115, padding: 3 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {/* <Card.Content>
          <Text style={{ fontSize: 10, fontWeight: "800" }}>{item.name}</Text>
        </Card.Content> */}
      </Card>
    );
  };
  const renderSportsItem = ({ item }) => {
    return (
      <Card
        style={{
          margin: 2,
          width: 115.5,
          height: 135,
          elevation: 1,
          marginHorizontal: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            dispatch(setValue(item.http));
            dispatch(setStream("URL"));
            navigation.navigate("Play");
            console.log(item);
          }}
        >
          <Card.Cover
            source={{
              uri: item.logo,
            }}
            style={{ height: 135, width: 115, padding: 3 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {/* <Card.Content>
          <Text style={{ fontSize: 10, fontWeight: "800" }}>{item.name}</Text>
        </Card.Content> */}
      </Card>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/ProjectXia/images/main/channels.m3u8"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const text = await response.text();
        const lines = text.split("\n");
        const parsedData = lines
          .map((line) => {
            if (line.length < 1) {
              return;
            }
            const parts = line.split(","); // Splitting by the first comma
            const logo = parts[0]; // Splitting name and logo section
            const name = parts[1];
            const http = parts[2]?.trim(); // Assuming the URL is in the third part
            return { name, logo, http };
          })
          .filter(Boolean);
        setFileChannelContent(parsedData);
        console.log("Channels: " + parsedData.length);
      } catch (error) {
        console.error("Error fetching the file:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/ProjectXia/images/main/kids.m3u8"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const text = await response.text();
        const lines = text.split("\n");
        const parsedData = lines
          .map((line) => {
            if (line.length < 1) {
              return;
            }
            const parts = line.split(","); // Splitting by the first comma
            const logo = parts[0]; // Splitting name and logo section
            const name = parts[1];
            const http = parts[2]?.trim(); // Assuming the URL is in the third part
            return { name, logo, http };
          })
          .filter(Boolean);
        console.log("Kids: " + parsedData.length);
        setFileKidsContent(parsedData);
      } catch (error) {
        console.error("Error fetching the file:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/ProjectXia/images/main/sports.m3u8"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const text = await response.text();
        const lines = text.split("\n");
        const parsedData = lines
          .map((line) => {
            if (line.length < 1) {
              return;
            }
            const parts = line.split(","); // Splitting by the first comma
            const logo = parts[0]; // Splitting name and logo section
            const name = parts[1];
            const http = parts[2]?.trim(); // Assuming the URL is in the third part
            return { name, logo, http };
          })
          .filter(Boolean);
        setFileSportsContent(parsedData);
        console.log("Sports: " + parsedData.length);
      } catch (error) {
        console.error("Error fetching the file:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={{ paddingHorizontal: 2 }}>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderWidth: 1,
          borderColor: "#AE445A",
          borderRadius: 20,
          backgroundColor: "transparent",
        }}
      >
        <TextInput
          placeholder="Paste streaming url..."
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

        <TouchableOpacity
          onPress={() => {
            dispatch(setValue(searchQuery));
            dispatch(setStream("URL"));
            navigation.navigate("Play");
            // console.log(item);
          }}
        >
          <Ionicons name="search" size={35} color={"#AE445A"} />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 10,
          color: "gray",
          alignSelf: "center",
          marginTop: -5,
          marginBottom: 25,
        }}
      >
        e.g:https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
      </Text>
      <View style={{ height: 175, marginVertical: 3 }}>
        <Text style={{ fontSize: 20, fontWeight: "800", color: "gray" }}>
          NEWS Channels [{fileChannelContent.length}]
        </Text>
        <FlatList
          data={fileChannelContent}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id}
          horizontal={true}
        />
      </View>
      <View style={{ height: 175, marginVertical: 3 }}>
        <Text style={{ fontSize: 20, fontWeight: "800", color: "gray" }}>
          Kids Channels [{fileKidsContent.length}]
        </Text>
        <FlatList
          data={fileKidsContent}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id}
          horizontal={true}
        />
      </View>
      <View style={{ height: 230, marginVertical: 3 }}>
        <Text style={{ fontSize: 20, fontWeight: "800", color: "gray" }}>
          Sports Channels [{fileSportsContent.length}]
        </Text>
        <FlatList
          data={fileSportsContent}
          renderItem={renderSportsItem}
          // keyExtractor={(item) => item.id}
          horizontal={true}
        />
      </View>
    </View>
  );
};

export default StreamingVideos;
