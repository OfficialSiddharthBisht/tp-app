import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Audio } from "expo-av";
import VideoPlayer from "./Home/VideoPlayer";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(false); // Track the state of the s ound
  const [sound, setSound] = useState(null); // Track the sound object
  const videoRef = useRef(null); // Reference for the video
  const [isVideoPlaying, setIsVideoPlaying] = useState(false); // Track video play/pause state

  useEffect(() => {
    // Cleanup when the component is unmounted
    return () => {
      if (sound) {
        sound.unloadAsync(); // Unload the sound when component unmounts
      }
    };
  }, [sound]);

  const playPauseSound = async () => {
    try {
      if (sound === null) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          require("../assets/sounds/letterSounds/stoppers/glottalStop.mp3")
        );
        setSound(newSound);

        // Handle status updates like when the sound finishes
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            // Sound has finished playing, reset state
            setIsPlaying(false);
            setSound(null); // Unload the sound to allow it to be reloaded later
          }
        });

        await newSound.playAsync();
        setIsPlaying(true);
      } else {
        // Toggle between play and pause
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.log("Error loading or playing sound: ", error);
    }
  };

  const toggleVideoPlayback = async () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const levelVideo = {
    link: "https://www.w3schools.com/html/mov_bbb.mp4", // Example video URL
    title: "Sample Video",
    description: "This is a sample video for demo purposes.",
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* App Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home</Text>
      </View>

      {/* Video Player */}
      {/* <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: "https://www.w3schools.com/html/mov_bbb.mp4" }} // Example video URL
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay={isVideoPlaying} // Control initial play state
          isLooping
          style={styles.video}
        />

        <TouchableOpacity
          style={styles.videoButton}
          onPress={toggleVideoPlayback}
        >
          <Icon
            name={isVideoPlaying ? "pause" : "play-arrow"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View> */}

      <VideoPlayer levelVideo={levelVideo} />

      {/* Input with Voice Play/Pause Button */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.voiceButton} onPress={playPauseSound}>
          <Icon
            name={isPlaying ? "pause" : "play-arrow"}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type something..."
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    marginBottom: 10,
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
    height: 250,
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
});

export default Home;
