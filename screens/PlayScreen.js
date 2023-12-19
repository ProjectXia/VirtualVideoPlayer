import * as React from "react";
import { useSelector } from "react-redux";
import { selectPlayValue, selectStream } from "../features/playSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomVideoPlayer from "../components/CustomVideoPlayer";

const PlayScreen = () => {
  const playSelector = useSelector(selectPlayValue);
  const streamSelector = useSelector(selectStream);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      {streamSelector === "Local" ? (
        <CustomVideoPlayer videoUri={playSelector} type={"Local"} />
      ) : (
        <CustomVideoPlayer videoUri={playSelector} type={"URL"} />
      )}
    </SafeAreaView>
  );
};

export default PlayScreen;
