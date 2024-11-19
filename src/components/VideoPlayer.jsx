import React, { useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import Context from "../contexts/context";

const VideoPlayer = ({
  video,
  loading,
  error,
  handlePlaybackStatusUpdate,
  videoRef,
}) => {
  const { videoEnded, videoLevel, isAnswerModalVisible } = useContext(Context);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#79d2eb" style={styles.loader} />
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {video ? (
        <View style={{ flex: 1 }}>
          <Video
            ref={videoRef}
            source={{ uri: video.link }}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          />
          {videoEnded && Platform.OS === "android" && (
            <TouchableOpacity
              style={styles.replayButton}
              onPress={() => videoRef.current.playAsync()}
            >
              <MaterialIcons name="replay" size={40} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <Text style={styles.error}>Video for this level not found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a0c1ca",
    marginTop: "-4%",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  video: {
    flex: 1,
  },
  replayButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }],
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
    borderRadius: 25,
  },
});

export default VideoPlayer;
