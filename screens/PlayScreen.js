import * as React from "react";
import { useSelector } from "react-redux";
import { selectPlayValue, selectStream } from "../features/playSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomVideoPlayer from "../components/CustomVideoPlayer";
import YouTubePlayer from "../components/YouTubePlayer";

const PlayScreen = () => {
  const playSelector = useSelector(selectPlayValue);
  const streamSelector = useSelector(selectStream);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {streamSelector === "Local" ? (
        <CustomVideoPlayer videoUri={playSelector} />
      ) : (
        <YouTubePlayer videoID={playSelector} />
      )}
    </SafeAreaView>
  );
};

export default PlayScreen;
