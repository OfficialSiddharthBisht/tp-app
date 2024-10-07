import React, { useState, useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { ResizeMode, Video } from "expo-av";

const VideoPlayer = ({ levelVideo }) => {
  const [paused, setPaused] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [, setVideoDuration] = useState(0);
  const [, setCurrentTime] = useState(0);
  const videoRef = useRef(null);

  // Handle video load
  const onLoad = (data) => {
    setVideoDuration(data.durationMillis / 1000);
  };

  // Handle video progress
  const onProgress = (data) => {
    setCurrentTime(data.positionMillis / 1000);
  };

  return (
    <View style={styles.container}>
      {/* Video Player */}
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: levelVideo.link }}
          style={fullScreen ? styles.fullScreenVideo : styles.video}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded) {
              onLoad(status);
              onProgress(status);
            }
          }}
          shouldPlay={!paused}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  videoContainer: {
    position: "relative",
    backgroundColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: Dimensions.get("window").width * 0.5625,
  },
  fullScreenVideo: {
    width: Dimensions.get("window").height,
    height: Dimensions.get("window").width,
  },
  controls: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
  progressText: {
    color: "#fff",
  },
});

export default VideoPlayer;
