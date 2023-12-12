import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import React from "react";

const AboutScreen = () => {
  return (
    <View style={{ flex: 1, marginTop: 45 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "#EEEDED",
          paddingVertical: 10,
          paddingHorizontal: 5,
          marginBottom: 10,
          width: "100%",
        }}
      >
        <MaterialIcons name="settings-applications" size={30} />
        <Text style={{ fontSize: 20, fontWeight: "800", paddingLeft: 20 }}>
          About VVPA
        </Text>
      </View>
      <ScrollView>
        <Text
          style={{ paddingHorizontal: 10, fontSize: 18, fontWeight: "600" }}
        >
          Introduction:
        </Text>
        <Text
          style={{ paddingHorizontal: 10, fontSize: 14, textAlign: "left" }}
        >
          The VVPA app is a multimedia solution designed to redefine the video
          playback experience for users of Android devices. In an era where
          video content has become a central aspect of our digital lives, VVPA
          addresses the need for a comprehensive, user-friendly, and versatile
          platform. This application's core functionality includes an appealing
          splash screen, an informative initial tour, a robust media library,
          advanced video playback capabilities, support for various video
          formats, seamless video streaming, and accessibility features such as
          subtitles and closed captions. It ensures effortless media management
          for the users of android.
        </Text>
        <Text
          style={{ paddingHorizontal: 10, fontSize: 18, fontWeight: "600" }}
        >
          At its core, the application is built upon several key
          functionalities:
        </Text>
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <Text style={styles.feature}>
            <Text style={styles.featureTitle}>Engaging Splash Screen:</Text>{" "}
            VVPA kicks off the user experience with a visually captivating
            splash screen, setting the tone for an immersive journey ahead.
          </Text>
          <Text style={styles.feature}>
            <Text style={styles.featureTitle}>Informative Initial Tour:</Text>{" "}
            To familiarize users, the app provides an informative initial tour,
            ensuring that users swiftly acquaint themselves with its features
            and functionalities.
          </Text>
          <Text style={styles.feature}>
            <Text style={styles.featureTitle}>Robust Media Library:</Text> VVPA
            boasts a robust and user-friendly media library, empowering users to
            effortlessly organize and access their diverse collection of media
            content.
          </Text>
          <Text style={styles.feature}>
            <Text style={styles.featureTitle}>
              Advanced Video Playback Capabilities:
            </Text>{" "}
            The app offers advanced video playback features that enhance the
            viewing experience, providing users with control and customization
            options tailored to their preferences.
          </Text>
          <Text style={styles.feature}>
            <Text style={styles.featureTitle}>
              Support for Various Video Formats:
            </Text>{" "}
            It supports a wide array of video formats, ensuring compatibility
            and seamless playback across different file types.
          </Text>
          <Text style={styles.feature}>
            <Text style={styles.featureTitle}>Seamless Video Streaming:</Text>{" "}
            VVPA facilitates smooth and uninterrupted video streaming, enabling
            users to enjoy their favorite content without interruptions.
          </Text>
          <Text style={styles.feature}>
            <Text style={styles.featureTitle}>Accessibility Features:</Text> The
            app is equipped with accessibility features such as subtitles and
            closed captions, making video content more inclusive and accessible
            to all users.
          </Text>
          <Text style={styles.feature}>
            <Text style={styles.featureTitle}>
              Effortless Media Management:
            </Text>{" "}
            VVPA simplifies media management for Android users, offering
            intuitive tools and functionalities for easy organization and
            navigation of media files.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = {
  feature: {
    marginBottom: 10,
    lineHeight: 22,
  },
  featureTitle: {
    fontWeight: "bold",
  },
};
export default AboutScreen;
