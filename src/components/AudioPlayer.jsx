import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/MaterialIcons";

const AudioPlayer = ({ soundIndex }) => {
  const [currentSound, setCurrentSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundUri, setSoundUri] = useState(null);

  useEffect(() => {
    const fetchSound = async () => {
      try {
        const response = await fetch(
          "https://web-true-phonetics-backend-production.up.railway.app/api/v1/sounds"
        );
        const data = await response.json();
        if (data.success && data.sounds[soundIndex]) {
          setSoundUri(data.sounds[soundIndex].sound);
        }
      } catch (error) {
        console.error("Error fetching sound:", error);
      }
    };
    fetchSound();
  }, [soundIndex]);

  const handlePlayPause = async () => {
    if (currentSound) {
      await currentSound.unloadAsync();
      setCurrentSound(null);
      setIsPlaying(false);
      return;
    }

    if (soundUri) {
      const { sound } = await Audio.Sound.createAsync({ uri: soundUri });
      setCurrentSound(sound);
      setIsPlaying(true);

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

  return (
    <View>
      <TouchableOpacity style={styles.voiceButton} onPress={handlePlayPause}>
        <Icon
          name={isPlaying ? "pause" : "play-arrow"}
          size={24}
          color="#888"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  voiceButton: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 5,
    borderWidth: 0.3,
  },
});

export default AudioPlayer;
