import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import virtualKeyboardWithSound from '../utils/en.keyboardSounds.utils';
import { Audio } from 'expo-av'; // Assuming you're using Expo's Audio library

const { width: SCREEN_WIDTH } = Dimensions.get('window'); // Get screen width
const keyWidth = SCREEN_WIDTH / 10 - 10; // Subtract margin for better fit

const Keyboard: React.FC = () => {
  const audioRef = useRef<Audio.Sound | null>(null);

  const handleLongPress = async (key: string) => {
    const keyData = virtualKeyboardWithSound
      .flatMap(row => Object.entries(row))
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

  return (
    <View style={styles.keyboardContainer}>
      {virtualKeyboardWithSound.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {Object.keys(row).map((key, keyIndex) => {
            const keyData = row[key];

            return (
              <TouchableOpacity
                key={keyIndex}
                style={styles.key}
                onLongPress={() => handleLongPress(key)}  // Trigger sound on long press
                onPressOut={handlePressOut}               // Stop sound on release
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
      flexDirection: 'row',
      flexWrap: 'wrap', // Allows keys to wrap onto new rows
      justifyContent: 'center',
      padding: 10,
      backgroundColor: '#bdd8dd',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 5,
    },
    key: {
      width: keyWidth, // Dynamically adjust key width to fit 7 keys per row
      height: 50,
      margin: 1, // Adjust margin for consistent spacing
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f9e3d2',
      borderRadius: 5,
      borderColor: '#ccc',
      borderWidth: 1,
    },
    keyText: {
      fontSize: 20,
      color: '#333',
    },
  });

export default Keyboard;
