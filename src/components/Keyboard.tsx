import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import virtualKeyboardWithSound from "../utils/en.keyboardSounds.utils";
import { Audio } from "expo-av"; // Assuming you're using Expo's Audio library
import numericKeyboardWithSound from "../utils/numeric.keyboardSounds.utils";
import KeyboardModal from "./KeyboardModal";
import AnswerModal from "./AnswerModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import Context from "../contexts/context";

const { width: SCREEN_WIDTH } = Dimensions.get("window"); // Get screen width
const keyWidth = SCREEN_WIDTH / 10 - 10; // Subtract margin for better fit

const Keyboard: React.FC = ({ videoRef }) => {
  const audioRef = useRef<Audio.Sound | null>(null);
  const [flag, setFlag] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [videoReadyToPlay, setVideoReadyToPlay] = useState(false);
  const [previousVideoLevel, setPreviousVideoLevel] = useState(1);
  const {
    inputValue,
    setInputValue,
    soundObj,
    setSoundObj,
    setSoundIndex,
    videoLevel,
    setVideoLevel,
    isAnswerModalVisible,
    setIsAnswerModalVisible,
    showHintNotification,
    setShowHintNotification,
    setShowHintButton,
    soundUri,
    currentSound,
    setCurrentSound,
    isPlaying,
    setIsPlaying,
    validateAnswer,
    isCorrect,
    setIsCorrect,
  } = useContext(Context);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHintNotification(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showHintNotification]);

  const handleLongPress = async (key: string) => {
    const keyData = virtualKeyboardWithSound
      .flatMap((row) => Object.entries(row))
      .find(([k, data]) => k === key && data.audio instanceof Object);

    if (keyData && keyData[1].audio) {
      try {
        if (videoRef.current) {
          videoRef.current.pauseAsync();
        }
        const sound = await keyData[1].audio(); // Load and play the audio on long press
        if (sound) {
          audioRef.current = sound;
          await audioRef.current.setIsLoopingAsync(true); // Loop the audio
          await audioRef.current.playAsync();
        }
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    }

    if (key === "🗑️") {
      setInputValue("");
    }
  };

  const handlePressOut = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.stopAsync();
        await audioRef.current.unloadAsync();
        audioRef.current = null;
      } catch (error) {
        console.error("Error stopping sound:", error);
      }
    }
  };

  const handleAnswerCheck = () => {
    if (!inputValue) return;

    setIsAnswerModalVisible(true);
    if (videoRef.current) videoRef.current.pauseAsync();

    if (inputValue == currentSound.answer) {
      setInputValue("");
      setSoundIndex((prev) => {
        const newSoundIndex = prev + 1;

        if (newSoundIndex % 8 === 0) {
          setVideoLevel((prev) => prev + 1);
        }

        return newSoundIndex;
      });
      setSoundObj(null);
      setIsCorrect(true);
      setShowHintButton(false);
      setShowHintNotification(false);
    } else {
      setIsCorrect(false);
      console.log("wrong answer");
    }
  };

  const handleInput = (key) => {
    if (key === "🗑️") {
      setInputValue((prev) => prev.slice(0, -1));
    } else if (key === "␣") {
      setInputValue((prev) => prev + " ");
    } else if (key === "123") {
      setFlag((prev) => !prev);
    } else if (key === "☺️") {
      setModalVisible(true);
    } else if (key === "Submit") {
      validateAnswer();
    } else {
      setInputValue((prev) => prev + key);
    }
  };

  useEffect(() => {
    const handlePlayPause = async () => {
      if (currentSound) {
        await currentSound?.unloadAsync();
        setCurrentSound(null);
        setIsPlaying(false);
        return;
      }

      if (soundUri) {
        setIsPlaying(true);
        const { sound } = await Audio.Sound.createAsync({ uri: soundUri });
        setCurrentSound(sound);

        const status = await sound.getStatusAsync();
        const durationMs = status.durationMillis;

        sound.playAsync();

        setTimeout(async () => {
          setIsPlaying(false);
          await sound.unloadAsync();
          setCurrentSound(null);
        }, durationMs);
      }
    };

    if (videoLevel === previousVideoLevel && videoReadyToPlay) {
      handlePlayPause();
    } else {
      if (videoReadyToPlay && videoRef.current) {
        videoRef.current.playAsync();
        setPreviousVideoLevel(videoLevel);
      }
    }

    setVideoReadyToPlay(false);
  }, [videoReadyToPlay]);

  return (
    <View style={styles.keyboardContainer}>
      {!flag
        ? virtualKeyboardWithSound.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {Object.keys(row).map((key, keyIndex) => {
                const keyData = row[key];

                // Apply special styles for the bottom row
                const isBottomRow =
                  rowIndex === virtualKeyboardWithSound.length - 1;
                const bottomKeyStyle =
                  keyIndex === 0 || keyIndex === 1 || keyIndex === 2
                    ? styles.bottomKeySmall
                    : keyIndex === 3
                    ? styles.bottomKeyLarge
                    : keyIndex === 4
                    ? styles.bottomKeySmall
                    : styles.bottomKeyMedium;

                return (
                  <TouchableOpacity
                    key={keyIndex}
                    style={isBottomRow ? bottomKeyStyle : styles.key} // Apply the correct style based on row
                    onLongPress={() => handleLongPress(key)} // Trigger sound on long press
                    onPressOut={handlePressOut} // Stop sound on release
                    onPress={() => handleInput(key)}
                  >
                    {key == "🗑️" ? (
                      <Ionicons
                        name="backspace-outline"
                        size={24}
                        color="black"
                      />
                    ) : (
                      <Text style={styles.keyText}>{key}</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))
        : numericKeyboardWithSound.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {Object.keys(row).map((key, keyIndex) => {
                const keyData = row[key];

                // Apply special styles for the bottom row
                const isBottomRow =
                  rowIndex === numericKeyboardWithSound.length - 1;
                const bottomKeyStyle =
                  keyIndex === 0 || keyIndex === 1 || keyIndex === 2
                    ? styles.bottomKeySmall
                    : keyIndex === 3
                    ? styles.bottomKeyLarge
                    : keyIndex === 4
                    ? styles.bottomKeySmall
                    : styles.bottomKeyMedium;

                return (
                  <TouchableOpacity
                    key={keyIndex}
                    style={isBottomRow ? bottomKeyStyle : styles.key} // Apply the correct style based on row
                    onLongPress={() => handleLongPress(key)} // Trigger sound on long press
                    onPressOut={handlePressOut} // Stop sound on release
                    onPress={() => handleInput(key)}
                  >
                    {key == "🗑️" ? (
                      <Ionicons
                        name="backspace-outline"
                        size={24}
                        color="black"
                      />
                    ) : (
                      <Text style={styles.keyText}>{key}</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
      {isModalVisible && (
        <KeyboardModal
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
      {isAnswerModalVisible && (
        <AnswerModal
          isVisible={isAnswerModalVisible}
          onClose={() => {
            setIsAnswerModalVisible(false);
            // if (isCorrect && videoRef.current) {
            //   videoRef.current.playAsync();
            // }
            setVideoReadyToPlay(true);
            if (!isCorrect) {
              setShowHintButton(true);
              setShowHintNotification(true);
            }
          }}
          isCorrect={isCorrect}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 1,
    marginBottom: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginLeft: 20,
  },
  videoContainer: {
    position: "relative",
  },
  video: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  videoButton: {
    position: "absolute",
    bottom: 20,
    left: "45%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
    borderRadius: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20, // Add some spacing to avoid overlap with the keyboard
  },
  voiceButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  keyboardContainer: {
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#a0c1ca",
    marginHorizontal: -10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 1,
  },
  key: {
    width: "10%", // Regular key width for the top 4 rows
    height: 50,
    margin: 1, // Adjust margin for consistent spacing
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9e3d2",
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  // Special styles for the bottom row
  bottomKeySmall: {
    width: "10%", // Keys with 10% width
    height: 50,
    margin: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9e3d2",
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  bottomKeyLarge: {
    width: "42%", // Key with 40% width
    height: 50,
    margin: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9e3d2",
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  bottomKeyMedium: {
    width: "20%", // Key with 20% width
    height: 50,
    margin: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9e3d2",
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  keyText: {
    fontSize: 20,
    color: "#333",
    fontFamily: "NotoSans",
  },
});

export default Keyboard;
