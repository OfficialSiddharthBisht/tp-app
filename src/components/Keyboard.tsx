import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import virtualKeyboardWithSound from "../utils/en.keyboardSounds.utils";
import { Audio } from "expo-av"; // Assuming you're using Expo's Audio library

const { width: SCREEN_WIDTH } = Dimensions.get("window"); // Get screen width
const keyWidth = SCREEN_WIDTH / 10 - 10; // Subtract margin for better fit

const Keyboard: React.FC = ({ setInputValue }) => {
  const audioRef = useRef<Audio.Sound | null>(null);

  const handleLongPress = async (key: string) => {
    const keyData = virtualKeyboardWithSound
      .flatMap((row) => Object.entries(row))
      .find(([k, data]) => k === key && data.audio instanceof Object);

    if (keyData && keyData[1].audio) {
      try {
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

    if (key === "Delete") {
      setInputValue("");
    }
  };

  const handlePressOut = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.stopAsync();
        await audioRef.current.unloadAsync(); // Release the audio resources after stopping
        audioRef.current = null;
      } catch (error) {
        console.error("Error stopping sound:", error);
      }
    }
  };

  const handleInput = (key) => {
    if (key === "Delete") {
      setInputValue((prev) => prev.slice(0, -1));
    } else if (key === "Space") {
      setInputValue((prev) => prev + " ");
    } else {
      setInputValue((prev) => prev + key);
    }
  };

  return (
    <View style={styles.keyboardContainer}>
      {virtualKeyboardWithSound.map((row, rowIndex) => (
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
                <Text style={styles.keyText}>{key}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10, // Optional padding for spacing without limiting the width
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
    backgroundColor: "#bdd8dd",
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
    width: "40%", // Key with 40% width
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
  },
});

export default Keyboard;
