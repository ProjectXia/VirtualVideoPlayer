import * as React from "react";
import { useSelector } from "react-redux";
import {
  selectHeight,
  selectPlayValue,
  selectStream,
  selectWidth,
} from "../features/playSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomVideoPlayer from "../components/CustomVideoPlayer";

const PlayScreen = () => {
  const playSelector = useSelector(selectPlayValue);
  const streamSelector = useSelector(selectStream);
  const heightSelector = useSelector(selectHeight);
  const widthSelector = useSelector(selectWidth);
  //console.log(playSelector);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
      }}
    >
      {streamSelector === "Local" ? (
        // https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8  Streaming Url Test
        <CustomVideoPlayer
          videoUri={playSelector}
          type={"Local"}
          poster={false}
          vw={widthSelector}
          vh={heightSelector}
        />
      ) : (
        <CustomVideoPlayer videoUri={playSelector} type={"URL"} poster={true} />
      )}
    </SafeAreaView>
  );
};

export default PlayScreen;
