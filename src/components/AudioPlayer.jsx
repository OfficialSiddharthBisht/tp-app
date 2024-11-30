import React, { useContext, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import Context from "../contexts/context";

const AudioPlayer = ({ isLoading }) => {
  const {
    soundUri,
    isPlaying,
    setIsPlaying,
    currentSound,
    setCurrentSound,
    playableSound,
    setPlayableSound,
  } = useContext(Context);

  const handlePlayPause = async () => {
    if (playableSound) {
      await playableSound.unloadAsync();
      setPlayableSound(null);
      setIsPlaying(false);
      return;
    }

    if (currentSound) {
      setIsPlaying(true);
      const { sound } = await Audio.Sound.createAsync({
        uri: currentSound?.sound,
      });
      setPlayableSound(sound);

      const status = await sound.getStatusAsync();
      const durationMs = status.durationMillis;

      sound.playAsync();

      setTimeout(async () => {
        setIsPlaying(false);
        await sound.unloadAsync();
        setPlayableSound(null);
      }, durationMs);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.voiceButton} onPress={handlePlayPause}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#888" />
        ) : (
          <Ionicons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={48}
            color="green"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  voiceButton: {
    // backgroundColor: "#fff",
    // paddingVertical: 4,
    // borderRadius: 5,
    // borderWidth: 0.3,
  },
});

export default AudioPlayer;
