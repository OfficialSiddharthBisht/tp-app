import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import VideoPlayer from "../components/VideoPlayer";
import { StatusBar } from "expo-status-bar";
import Keyboard from "../components/Keyboard";
import MainHeader from "../components/MainHeader";
import AudioPlayer from "../components/AudioPlayer";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [soundUri, setSoundUri] = useState(null);
  const [soundObj, setSoundObj] = useState(null);
  const [blinkerOpacity] = useState(new Animated.Value(1));
  const [soundIndex, setSoundIndex] = useState(0);
  const [isSoundLoading, setIsSoundLoading] = useState(false);

  useEffect(() => {
    const fetchSound = async () => {
      try {
        setIsSoundLoading(true);
        const response = await fetch(
          "https://web-true-phonetics-backend-production.up.railway.app/api/v1/sounds"
        );
        const data = await response.json();
        if (data.success && data.sounds[soundIndex]) {
          setSoundUri(data.sounds[soundIndex].sound);
          setSoundObj(data.sounds[soundIndex]);
        }
      } catch (error) {
        console.error("Error fetching sound:", error);
      } finally {
        setIsSoundLoading(false);
      }
    };
    fetchSound();
  }, [soundIndex]);

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

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader />

      <VideoPlayer level={1} />

      {/* Input with Voice Play/Pause Button */}
      <View style={styles.inputContainer}>
        <AudioPlayer soundUri={soundUri} isLoading={isSoundLoading} />

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#fff",
            borderRadius: 5,
            borderColor: "#ddd",
            borderWidth: 1,
          }}
        >
          <Text style={[styles.input, !inputValue && { color: "#999" }]}>
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
                  },
                ]}
              />
            </Text>
          )}
        </View>
      </View>
      <StatusBar style="dark" />
      <Keyboard
        setInputValue={setInputValue}
        soundObj={soundObj}
        setSoundIndex={setSoundIndex}
        inputValue={inputValue}
        soundUri={soundUri}
        setSoundObj={setSoundObj}
      />
    </SafeAreaView>
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
    paddingVertical: 10,
    gap: 15,
  },

  input: {
    fontSize: 16,
    padding: 10,
    color: "#666",
  },
  blinker: {
    width: 2,
    height: 20,
    // flex: 1,
    backgroundColor: "#f11",
    borderRadius: 4,
  },
});

export default Home;
