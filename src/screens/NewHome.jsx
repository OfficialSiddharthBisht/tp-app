import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

interface Sound {
  _id: string;
  name: string;
  sound: string;
  answer: string;
  points: number;
}

interface VideoType {
  _id: string;
  title: string;
  link: string;
  level: string;
}

interface Level {
  _id: string;
  level: number;
  type: "sound" | "video" | "mcq";
  sounds: Sound[];
  video?: VideoType;
  points: number;
}

const NewHome = () => {
  const [levels, setLevels] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentSoundIndex, setCurrentSoundIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  const videoRef = useRef(null);
  const soundRef = useRef(null);

  useEffect(() => {
    const fetchLevels = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://web-true-phonetics-backend-production.up.railway.app/api/v1/levels"
        );
        const data = await response.json();

        if (response.ok) {
          setLevels(data?.levels);
        } else {
          console.error("Failed to fetch levels:", data.message);
        }
      } catch (error) {
        console.error("Error fetching levels:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();
  }, []);

  const getCurrentLevel = () =>
    levels?.find((level) => level.level === currentLevel);

  const playSound = async (soundUrl: string) => {
    try {
      setLoading(true);
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync({ uri: soundUrl });
      soundRef.current = sound;
      await sound.playAsync();
      setIsPlaying(true);
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      Alert.alert("Error", "Failed to play sound");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = () => {
    const level = getCurrentLevel();
    if (!level?.sounds[currentSoundIndex]) return;

    const isAnswerCorrect =
      userAnswer.toLowerCase() ===
      level.sounds[currentSoundIndex].answer.toLowerCase();

    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);

    if (isAnswerCorrect) {
      setScore((prev) => prev + level.sounds[currentSoundIndex].points);
    }

    setTimeout(() => {
      setShowFeedback(false);
      setUserAnswer("");

      if (currentSoundIndex + 1 >= level.sounds.length) {
        if (currentLevel < levels.length) {
          setCurrentLevel((prev) => prev + 1);
          setCurrentSoundIndex(0);
        }
      } else {
        setCurrentSoundIndex((prev) => prev + 1);
      }
    }, 1500);
  };

  const renderFeedback = () => {
    if (!showFeedback) return null;

    return (
      <View
        style={[
          styles.feedback,
          { backgroundColor: isCorrect ? "#d4edda" : "#f8d7da" },
        ]}
      >
        <Text
          style={[
            styles.feedbackText,
            { color: isCorrect ? "#155724" : "#721c24" },
          ]}
        >
          {isCorrect ? "Correct!" : "Try again!"}
        </Text>
      </View>
    );
  };

  const renderSoundLevel = (level: Level) => (
    <View style={styles.container}>
      <Text style={styles.levelTitle}>Level {level.level}</Text>
      <Text style={styles.score}>Score: {score}</Text>

      <View style={styles.soundContainer}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => playSound(level.sounds[currentSoundIndex].sound)}
          disabled={isPlaying || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Ionicons
              name={isPlaying ? "volume-high" : "volume-medium"}
              size={24}
              color="#fff"
            />
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={userAnswer}
          onChangeText={setUserAnswer}
          placeholder="Enter your answer"
          placeholderTextColor="#666"
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleAnswerSubmit}
          disabled={!userAnswer.trim()}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {renderFeedback()}
    </View>
  );

  const renderVideoLevel = (level: Level) => (
    <View style={styles.container}>
      <Text style={styles.levelTitle}>Level {level.level}</Text>
      {level.video && (
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: level.video.link }}
          useNativeControls
          resizeMode="contain"
        />
      )}
      <View style={styles.soundContainer}>
        {level.sounds.map((sound, index) => (
          <TouchableOpacity
            key={sound._id}
            style={styles.soundButton}
            onPress={() => playSound(sound.sound)}
          >
            <Text style={styles.soundButtonText}>Sound {index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const currentLevelData = getCurrentLevel();

  if (!currentLevelData) {
    return (
      <View style={styles.container}>
        <Text style={styles.completionText}>
          Congratulations! You've completed all levels!
        </Text>
        <Text style={styles.scoreText}>Final Score: {score}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      {currentLevelData.type === "sound" && renderSoundLevel(currentLevelData)}
      {currentLevelData.type === "video" && renderVideoLevel(currentLevelData)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  levelTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  score: {
    fontSize: 18,
    marginBottom: 20,
    color: "#666",
  },
  soundContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  submitButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  feedback: {
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  video: {
    width: Dimensions.get("window").width - 40,
    height: 200,
    marginBottom: 20,
  },
  soundButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
  },
  soundButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  completionText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#4CAF50",
  },
  scoreText: {
    fontSize: 20,
    color: "#666",
  },
});

export default NewHome;
