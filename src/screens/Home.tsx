import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import VideoPlayer from "../components/VideoPlayer";
import { StatusBar } from "expo-status-bar";
import Keyboard from "../components/Keyboard";
import MainHeader from "../components/MainHeader";
import AudioPlayer from "../components/AudioPlayer";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Context from "../contexts/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HowToPlayModal from "../components/HowToPlayModal";

const Home = () => {
  // const [inputValue, setInputValue] = useState("");

  const [blinkerOpacity] = useState(new Animated.Value(1));
  const [isSoundLoading, setIsSoundLoading] = useState(false);
  const [howToPlayModal, setHowToPlayModal] = useState(true);

  // VideoPlayer-related states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  const {
    setUser,
    inputValue,
    setInputValue,
    videos,
    setVideos,
    videoEnded,
    setVideoEnded,
    setSoundUri,
    soundObj,
    setSoundObj,
    soundIndex,
    isPlaying,
    videoLevel,
    showHintNotification,
    showHintButton,
  } = useContext(Context);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const response = await fetch(
          "https://web-true-phonetics-backend-production.up.railway.app/api/v1/me",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        } else {
          console.error("Failed to fetch user profile:", data.message);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchSound = async () => {
      try {
        setIsSoundLoading(true);
        const response = await fetch(
          "https://web-true-phonetics-backend-production.up.railway.app/api/v1/sounds"
        );
        const data = await response.json();
        if (data.success && data.sounds[soundIndex]) {
          setSoundUri(data.sounds[soundIndex].sound);
          setSoundObj(data.sounds[soundIndex]);
        }
      } catch (error) {
        console.error("Error fetching sound:", error);
      } finally {
        setIsSoundLoading(false);
      }
    };
    fetchSound();
  }, [soundIndex]);

  // FOR FUTURE REFRENCE IF POINTER NEEDS THE BLINKING EFFECT

  // useEffect(() => {
  //   Animated.sequence([
  //     Animated.timing(blinkerOpacity, {
  //       toValue: 0,
  //       duration: 500,
  //       useNativeDriver: false,
  //     }),
  //     Animated.timing(blinkerOpacity, {
  //       toValue: 1,
  //       duration: 500,
  //       useNativeDriver: false,
  //     }),
  //   ]).start();
  // }, [blinkerOpacity]);

  // Function to handle hint button press
  const handleHintPress = () => {
    if (soundObj?.answer) {
      const currentLength = inputValue.length;
      const answerText = soundObj.answer;

      if (!answerText.startsWith(inputValue)) {
        setInputValue(answerText[0]);
      } else {
        if (currentLength < answerText.length) {
          setInputValue(inputValue + answerText[currentLength]);
        }
      }
    }
  };

  useEffect(() => {
    // Fetch videos from the server
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

  const handlePlaybackStatusUpdate = async (status) => {
    if (status.didJustFinish) {
      await videoRef.current.setPositionAsync(0);
      await videoRef.current.pauseAsync();
      setVideoEnded(true);
    } else if (status.isPlaying) {
      setVideoEnded(false);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      videoEnded ? videoRef.current.playAsync() : videoRef.current.pauseAsync();
      setVideoEnded(!videoEnded);
    }
  };

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.pauseAsync();
    }
  }, [isPlaying]);

  const video = videos.find((vid) => vid.level === videoLevel);

  return (
    <SafeAreaView style={styles.container}>
      {/* Hint Button */}
      {showHintButton && (
        <>
          <TouchableOpacity style={styles.hintButton} onPress={handleHintPress}>
            <FontAwesome name="lightbulb-o" size={28} color="red" />
          </TouchableOpacity>
          {showHintNotification && (
            <View style={styles.hintNotification}>
              <Text style={styles.hintText}>Press here for a hint!</Text>
            </View>
          )}
        </>
      )}
      <VideoPlayer
        video={video}
        loading={loading}
        error={error}
        handlePlaybackStatusUpdate={handlePlaybackStatusUpdate}
        videoRef={videoRef}
      />

      {/* Input with Voice Play/Pause Button */}
      <View style={styles.inputContainer}>
        <AudioPlayer isLoading={isSoundLoading} />

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#fff",
            borderRadius: 5,
            borderColor: "#ddd",
            borderWidth: 1,
          }}
        >
          <Text style={[styles.input, !inputValue && { color: "#999" }]}>
            {inputValue
              ? inputValue.length > 20
                ? `...${inputValue.slice(-30)}`
                : inputValue
              : "Enter your answer"}{" "}
          </Text>
          {inputValue && (
            <Text
              style={{
                alignSelf: "center",
                marginLeft: "-3.5%",
              }}
            >
              <Animated.View
                style={[
                  styles.blinker,
                  {
                    opacity: blinkerOpacity,
                  },
                ]}
              />
            </Text>
          )}
        </View>
      </View>
      <StatusBar style="dark" />
      <Keyboard videoRef={videoRef} />
      {howToPlayModal && (
        <HowToPlayModal
          isVisible={howToPlayModal}
          onClose={() => {
            setHowToPlayModal(false);
            if (videoRef?.current) videoRef.current.playAsync();
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#a0c1ca",
  },
  hintButton: {
    position: "absolute",
    zIndex: 100,
    top: "15%",
    right: 10,
    backgroundColor: "#a0c1ca",
    borderWidth: 0.5,
    borderColor: "#888",
    padding: 8,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  hintButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  hintNotification: {
    position: "absolute",
    alignSelf: "flex-end",
    top: "15.5%",
    borderWidth: 0.5,
    borderColor: "#888",
    right: 50,
    zIndex: 100,
    flexDirection: "row",
    backgroundColor: "#a0c1ca",
    padding: 5,
    borderRadius: 10,
  },
  hintText: {
    color: "black",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#a0c1ca",
    borderRadius: 10,
    paddingVertical: 10,
    gap: 15,
  },
  input: {
    fontSize: 16,
    padding: 10,
    color: "#666",
  },
  blinker: {
    width: 2,
    height: 20,
    backgroundColor: "#f11",
    borderRadius: 4,
  },
});

export default Home;
