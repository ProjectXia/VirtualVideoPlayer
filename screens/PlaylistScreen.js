import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from "react-native";

const PlaylistScreen = () => {
  const [fileContent, setFileContent] = useState([]);
  const [httpsLinks, setHttpsLinks] = useState([]);
  const [extInfLines, setExtInfLines] = useState([]);

  useEffect(() => {
    const url = "http://103.186.77.21:8000/playlist.m3u8"; // Replace with the actual URL

    const fetchData = async () => {
      const response = await fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.text();
        })
        .then((text) => {
          const lines = text.split("\n");

          // const regex = /^http.*\.m3u8$/;

          // // Filter lines that match the pattern
          // const filteredLines = lines.filter((line) => regex.test(line));
          // setHttpsLinks(filteredLines);
          // const extinfLiness = lines.map((line) => {
          //   const parts = line.split("#EXTINF:-1,");
          //   return parts.length > 1 ? parts[1] : "";
          // });
          // setExtInfLines(extinfLiness);

          // // Combine filteredLines and extinfLiness into a single array
          // const combinedArray = [
          //   { http: filteredLines },
          //   { name: extinfLiness },
          // ];
          const regexHttp = /^http.*\.m3u8$/;
          const regexExtinf = /^#EXTINF/;

          const filteredLines = [];
          const extinfLiness = [];

          lines.forEach((line) => {
            if (regexHttp.test(line)) {
              filteredLines.push(line);
            } else if (regexExtinf.test(line)) {
              const parts = line.split("#EXTINF:-1,");
              extinfLiness.push(parts.length > 1 ? parts[1] : "");
            }
          });

          const combinedArray = filteredLines.map((http, index) => ({
            http: http,
            name: extinfLiness[index] || "", // Ensure matching extinf or empty string if not available
          }));

          // combinedArray will contain objects with corresponding http and extinf at the same index
          // console.log(combinedArray);
          setFileContent(combinedArray);
        })
        .catch((err) => {});
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>File Content:</Text>
      <ScrollView>
        <Text style={styles.title}>Extracted HTTPS Links:</Text>
        {httpsLinks.map((line, index) => (
          <Text key={index} style={styles.content}>
            {line}
          </Text>
        ))}
        <Text style={styles.title}>Extracted #EXTINF Lines:</Text>
        {extInfLines.map((line, index) => (
          <Text key={index} style={styles.content}>
            {line}
          </Text>
        ))}
        <Text style={styles.title}>Combine Lines:</Text>
        {fileContent.map((line, index) => (
          <Text key={index} style={styles.content}>
            {line.name} {"\n"}
            {line.http}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  content: {
    marginTop: 5,
  },
});

export default PlaylistScreen;
