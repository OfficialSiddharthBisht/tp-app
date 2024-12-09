import React, { useContext, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/MaterialIcons";
import Context from "../contexts/context";

const AudioPlayer = ({ isLoading }) => {
  const { soundUri, isPlaying, setIsPlaying, currentSound, setCurrentSound } =
    useContext(Context);

  const handlePlayPause = async () => {
    if (currentSound) {
      await currentSound.unloadAsync();
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
