import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/MaterialIcons";

const AudioPlayer = ({ soundUri, isLoading }) => {
  const [currentSound, setCurrentSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
        {isLoading ? (
          <ActivityIndicator size="small" color="#888" />
        ) : (
          <Icon
            name={isPlaying ? "pause" : "play-arrow"}
            size={24}
            color="#888"
          />
        )}
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
