import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Modal,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoPlayer from "../components/VideoPlayer";
import { StatusBar } from "expo-status-bar";
import Keyboard from "../components/Keyboard";
import AudioPlayer from "../components/AudioPlayer";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Context from "../contexts/context";
import HowToPlayModal from "../components/HowToPlayModal";
import Quiz from "./Quiz";
import GameCompletedModal from "../components/GameCompletedModal";

const Home = () => {
  const [blinkerOpacity] = useState(new Animated.Value(1));
  const [isSoundLoading, setIsSoundLoading] = useState(false);
  const [howToPlayModal, setHowToPlayModal] = useState(true);

  // VideoPlayer-related states
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    currentVideo,
    setCurrentVideo,
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
    setVideoLevel,
    showHintNotification,
    showHintButton,
    currentSound,
    setCurrentSound,
    currentAnswer,
    setCurrentAnswer,
    videoRef,
    isMcq,
    mcqsData,
    setSelectedOption,
    theme,
    gameCompleted,
    handleLevelReset,
    setGameCompleted,
  } = useContext(Context);

  // useEffect(() => {
  //   const fetchSound = async () => {
  //     try {
  //       setIsSoundLoading(true);
  //       const response = await fetch(
  //         "https://web-true-phonetics-backend-production.up.railway.app/api/v1/sounds"
  //       );
  //       const data = await response.json();
  //       if (data.success && data.sounds[soundIndex]) {
  //         setSoundUri(data.sounds[soundIndex].sound);
  //         setSoundObj(data.sounds[soundIndex]);
  //       }

  //       if (data.success && soundIndex === data.sounds.length) {
  //         setGameCompleted(true);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching sound:", error);
  //     } finally {
  //       setIsSoundLoading(false);
  //     }
  //   };
  //   fetchSound();
  // }, [soundIndex]);

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
    if (isMcq && mcqsData) {
      setSelectedOption(mcqsData.correctAnswer + 1);
    } else if (currentSound?.answer) {
      const currentLength = inputValue.length;
      const answerText = currentSound.answer;

      if (!answerText.startsWith(inputValue)) {
        setInputValue(answerText[0]);
      } else {
        if (currentLength < answerText.length) {
          setInputValue(inputValue + answerText[currentLength]);
        }
      }
    }
  };

  // useEffect(() => {
  //   // Fetch videos from the server
  //   const fetchVideos = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://web-true-phonetics-backend-production.up.railway.app/api/v1/all-videos"
  //       );
  //       const data = await response.json();
  //       if (data.success) {
  //         setVideos(data.videos);
  //       } else {
  //         setError("Failed to fetch videos");
  //       }
  //     } catch (err) {
  //       setError("An error occurred while fetching the videos");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchVideos();
  // }, []);

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

  // const fetchInitialData = async () => {
  //   try {
  //     const soundResponse = await fetch(
  //       "https://web-true-phonetics-backend-production.up.railway.app/api/v1/sounds"
  //     );
  //     const soundData = await soundResponse.json();
  //     if (soundData.success) {
  //       setSoundUri(soundData.sounds[0].sound);
  //       setSoundObj(soundData.sounds[0]);
  //     }

  //     const videoResponse = await fetch(
  //       "https://web-true-phonetics-backend-production.up.railway.app/api/v1/all-videos"
  //     );
  //     const videoData = await videoResponse.json();
  //     if (videoData.success) {
  //       setVideos(videoData.videos);
  //     }
  //   } catch (err) {
  //     console.error("Error resetting data:", err);
  //   }
  // };

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.pauseAsync();
    }
  }, [isPlaying]);

  // const video = videos.find((vid) => vid.level === videoLevel);

  // useEffect(() => {
  //   console.log(levels[currentLevel]);
  // }, [levels]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme?.backgroundColor }]}
    >
      {/* Hint Button */}
      {showHintButton && (
        <>
          <TouchableOpacity
            style={[
              styles.hintButton,
              { backgroundColor: theme?.backgroundColor },
            ]}
            onPress={handleHintPress}
          >
            <FontAwesome
              name="lightbulb-o"
              size={28}
              color={theme?.hintIconColor || "red"}
            />
          </TouchableOpacity>
          {showHintNotification && (
            <View
              style={[
                styles.hintNotification,
                { backgroundColor: theme?.notificationBackground },
              ]}
            >
              <Text
                style={[styles.hintText, { color: theme?.notificationText }]}
              >
                Press here for a hint!
              </Text>
            </View>
          )}
        </>
      )}
      {isMcq ? (
        <Quiz />
      ) : (
        <>
          <VideoPlayer
            video={currentVideo}
            // loading={loading}
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
                backgroundColor: theme?.inputBackground || "#fff",
                borderRadius: 5,
                borderColor: theme?.inputBorder || "#ddd",
                borderWidth: 1,
              }}
            >
              <Text
                style={[
                  styles.input,
                  {
                    color: inputValue
                      ? theme?.inputTextColor
                      : theme?.placeholderColor || "#999",
                  },
                ]}
              >
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
                        backgroundColor: theme?.blinkerColor || "#000",
                      },
                    ]}
                  />
                </Text>
              )}
            </View>
          </View>
          <StatusBar style={theme?.statusBarStyle || "dark"} />
          <Keyboard videoRef={videoRef} />
        </>
      )}
      {howToPlayModal && (
        <HowToPlayModal
          isVisible={howToPlayModal}
          onClose={() => {
            setHowToPlayModal(false);
            if (videoRef?.current) videoRef.current.playAsync();
          }}
        />
      )}

      <GameCompletedModal
        visible={gameCompleted}
        onClose={() => setGameCompleted(false)}
        onConfirm={handleLevelReset}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  hintButton: {
    position: "absolute",
    zIndex: 100,
    top: "15%",
    right: 10,
    borderWidth: 0.5,
    padding: 8,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  hintButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  hintNotification: {
    position: "absolute",
    alignSelf: "flex-end",
    top: "15.5%",
    borderWidth: 0.5,
    right: 50,
    zIndex: 100,
    flexDirection: "row",
    padding: 5,
    borderRadius: 10,
  },
  hintText: {
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 10,
    gap: 15,
  },
  input: {
    fontSize: 16,
    padding: 10,
    fontFamily: "NotoSans",
  },
  blinker: {
    width: 2,
    height: 20,
    borderRadius: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  congratulationsText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default Home;
