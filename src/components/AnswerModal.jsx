import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";

// sounds for correct and wrong answer
import correctAnswer from "../assets/sounds/gameSounds/win.mp3";
import wrongAnswer from "../assets/sounds/gameSounds/wrong.mp3";

const AnswerModal = ({ isVisible, onClose, isCorrect }) => {
  const correctSound = useRef(new Audio.Sound());
  const wrongSound = useRef(new Audio.Sound());
  const [soundsLoaded, setSoundsLoaded] = useState({
    correct: false,
    wrong: false,
  });
  const [playedSound, setPlayedSound] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Preload sounds
    const loadSounds = async () => {
      try {
        await correctSound.current.loadAsync(correctAnswer);
        await wrongSound.current.loadAsync(wrongAnswer);
        setSoundsLoaded({ correct: true, wrong: true });
      } catch (error) {
        console.error("Error loading sounds:", error);
      }
    };

    loadSounds();

    return () => {
      // Unload sounds when component unmounts
      correctSound.current.unloadAsync();
      wrongSound.current.unloadAsync();
    };
  }, []);

  useEffect(() => {
    const playSoundAndAnimate = async () => {
      if (
        !isVisible ||
        !soundsLoaded.correct ||
        !soundsLoaded.wrong ||
        playedSound
      )
        return;

      try {
        // Stop any currently playing sound before playing a new one
        await correctSound.current.stopAsync();
        await wrongSound.current.stopAsync();

        if (isCorrect) {
          await correctSound.current.replayAsync();
        } else {
          await wrongSound.current.replayAsync();
        }
        setPlayedSound(true); // Prevent re-triggering

        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          speed: 1,
          bounciness: 20,
        }).start();
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    };

    if (isVisible) {
      playSoundAndAnimate();
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setPlayedSound(false);
      scaleAnim.setValue(0);
    }
  }, [isVisible, isCorrect, onClose, soundsLoaded, playedSound, scaleAnim]);

  const handleClose = async () => {
    try {
      // Stop any currently playing sound
      if (soundsLoaded.correct) await correctSound.current.stopAsync();
      if (soundsLoaded.wrong) await wrongSound.current.stopAsync();
    } catch (error) {
      console.error("Error stopping sound:", error);
    }
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <MaterialIcons
              name={isCorrect ? "check-circle" : "cancel"}
              size={50}
              color={isCorrect ? "#4CAF50" : "#f44336"}
            />
          </Animated.View>
          <Text
            style={[styles.text, { color: isCorrect ? "#4CAF50" : "#f44336" }]}
          >
            {isCorrect ? "Correct!" : "Wrong!"}
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 250,
    padding: 30,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AnswerModal;
