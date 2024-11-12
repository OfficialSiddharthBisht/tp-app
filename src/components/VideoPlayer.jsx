import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";

const VideoPlayer = ({
  video,
  loading,
  error,
  videoEnded,
  handlePlaybackStatusUpdate,
  videoRef,
}) => {
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
          {videoEnded && (
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
    backgroundColor: "#f0f0f0",
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
