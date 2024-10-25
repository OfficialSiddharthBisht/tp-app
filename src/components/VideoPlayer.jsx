import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  StatusBar,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";

const VideoPlayer = ({ level }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          "https://web-true-phonetics-backend-production.up.railway.app/api/v1/all-videos"
        );
        const data = await response.json();
        if (data.success) {
          setVideos(data.videos);
        } else {
          setError("Failed to fetch videos");
        }
      } catch (err) {
        setError("An error occurred while fetching the videos");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const video = videos.find((vid) => vid.level === level);

  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      setVideoEnded(true);
    }
  };

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  const replayVideo = () => {
    videoRef.current.setPositionAsync(0);
    videoRef.current.playAsync();
    setVideoEnded(false);
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#79d2eb" style={styles.loader} />
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={[styles.container, fullScreen && styles.fullScreenContainer]}>
      {video ? (
        <View>
          <Video
            ref={videoRef}
            source={{ uri: video.link }}
            style={fullScreen ? styles.fullScreenVideo : styles.video}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          />
          {videoEnded && (
            <TouchableOpacity style={styles.replayButton} onPress={replayVideo}>
              <MaterialIcons name="replay" size={40} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <Text style={styles.error}>Video for level {level} not found</Text>
      )}
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
  fullScreenContainer: {
    backgroundColor: "#000",
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
    width: "100%",
    height: Dimensions.get("window").width * 0.85,
  },
  fullScreenVideo: {
    width: Dimensions.get("window").height,
    height: Dimensions.get("window").width,
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
