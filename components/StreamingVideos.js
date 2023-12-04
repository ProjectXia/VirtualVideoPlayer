import {
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { setStream, setValue } from "../features/playSlice";
import React, { useEffect, useState } from "react";

const LeftContent = (props) => <Avatar.Icon {...props} icon="search-web" />;

const StreamingVideos = () => {
  const [fileChannelContent, setFileChannelContent] = useState([]);
  const [fileKidsContent, setFileKidsContent] = useState([]);
  const [fileSportsContent, setFileSportsContent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const renderItem = ({ item }) => {
    return (
      <Card style={{ margin: 2, width: 182.5, height: 195, elevation: 1 }}>
        {/* <Card.Title title="Card Title" subtitle="Card Subtitle" /> */}
        <Card.Content>
          <Text style={{ fontSize: 14, fontWeight: "800" }}>{item.name}</Text>
        </Card.Content>
        <TouchableOpacity
          onPress={() => {
            dispatch(setValue(item.http));
            dispatch(setStream("URL"));
            navigation.navigate("Play");
          }}
        >
          <Card.Cover
            source={{
              uri: item.logo,
            }}
            style={{ height: 120 }}
            mode="contained"
          />
          <Ionicons
            name="play"
            color={"red"}
            size={45}
            style={{ position: "absolute", top: 35, left: 70 }}
          />
        </TouchableOpacity>
      </Card>
    );
  };
  const fetchData = async (filePathName) => {
    try {
      const response = await fetch(
        "https://github.com/ProjectXia/IP-TV/blob/Carlinhos027-patch-1/streams/channels.m3u8"
      ); // Assuming filePathName is a valid URL
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const text = await response.text();
      const lines = text.split("\n");
      console.log(lines[0]);
      const parsedData = lines
        .map((line) => {
          const parts = line.split(","); // Splitting by the first comma
          const logo = parts[0]; // Splitting name and logo section
          const name = parts[1];
          const url = parts[2]?.trim(); // Assuming the URL is in the third part
          //console.log(name);
          return { name, logo, url };
        })
        .filter(Boolean);

      setFileChannelContent(parsedData);
    } catch (err) {
      console.error("Error fetching or parsing data:", err);
    }
  };
  // const fetchData = async (filePathName) => {
  //   const response = await fetch(
  //     "https://github.com/ProjectXia/IP-TV/blob/Carlinhos027-patch-1/streams/channels.m3u8"
  //   )
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return res.text();
  //     })
  //     .then((text) => {
  //       const lines = text.split("\n");

  //       const filteredLines = [];
  //       const extinfLiness = [];
  //       const logo_tv = [];

  //       lines.forEach((line) => {
  //         const parts = line.split(",");
  //         extinfLiness.push(parts.length > 1 ? parts[2] : parts[2]);
  //         filteredLines.push(parts.length > 1 ? parts[3] : parts[3]);
  //         logo_tv.push(parts.length > 1 ? parts[1] : parts[1]);
  //         console.log(parts[2]);
  //       });

  //       const combinedArray = filteredLines.map((http, index) => ({
  //         http: http,
  //         name: extinfLiness[index], // Ensure matching extinf or empty string if not available
  //         logo: logo_tv[index],
  //       }));
  //       setFileChannelContent(combinedArray);
  //     })
  //     .catch((err) => {});
  // };

  useEffect(() => {
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

        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="search" size={35} />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 10,
          color: "gray",
          alignSelf: "center",
          marginTop: -5,
        }}
      >
        e.g:https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
      </Text>
      <ScrollView>
        <View style={{ height: 230, marginVertical: 3 }}>
          <Text style={{ fontSize: 20, fontWeight: "800", color: "gray" }}>
            Favoritie Channels
          </Text>
          <FlatList
            data={fileChannelContent}
            renderItem={renderItem}
            // keyExtractor={(item) => item.id}
            horizontal={true}
          />
        </View>
        <View style={{ height: 230, marginVertical: 3 }}>
          <Text style={{ fontSize: 20, fontWeight: "800", color: "gray" }}>
            Kids Channels
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
            Sports Channels
          </Text>
          <FlatList
            data={fileSportsContent}
            renderItem={renderItem}
            // keyExtractor={(item) => item.id}
            horizontal={true}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default StreamingVideos;
