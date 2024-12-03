import React, { useEffect, useRef, useState } from "react";
import Context from "./context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const themes = {
  default: {
    backgroundColor: "#a0c1ca",
    headerColor: "#79d2eb",
    buttonColor: "#fff",
    textColor: "#000",
  },
  light: {
    backgroundColor: "#ffffff",
    headerColor: "#fff",
    textColor: "#2c3e50",
    buttonColor: "#3498db",
    primaryColor: "#8e44ad",
    secondaryColor: "#f39c12",
    borderColor: "#dcdcdc",
    cardBackgroundColor: "#f7f9f9",
    shadowColor: "#bdc3c7",
  },
  dark: {
    backgroundColor: "#121212",
    headerColor: "#122111",
    textColor: "#ecf0f1",
    buttonColor: "#e74c3c",
    primaryColor: "#8e44ad",
    secondaryColor: "#3498db",
    borderColor: "#2c3e50",
    cardBackgroundColor: "#1e272e",
    shadowColor: "#34495e",
  },
  blue: {
    backgroundColor: "#e0f7fa",
    headerColor: "#e0e7ea",
    textColor: "#00796b",
    buttonColor: "#004d40",
    primaryColor: "#00acc1",
    secondaryColor: "#26c6da",
    borderColor: "#b2ebf2",
    cardBackgroundColor: "#ffffff",
    shadowColor: "#80deea",
  },
  neon: {
    backgroundColor: "#1e1e2f",
    headerColor: "#1d1d2e",
    textColor: "#ffffff",
    buttonColor: "#ff4081",
    primaryColor: "#7c4dff",
    secondaryColor: "#18ffff",
    borderColor: "#292a3d",
    cardBackgroundColor: "#2b2d42",
    shadowColor: "#434760",
  },
  pastel: {
    backgroundColor: "#ffe4e1",
    headerColor: "#eed3d1",
    textColor: "#2c3e50",
    buttonColor: "#ff6f61",
    primaryColor: "#b39ddb",
    secondaryColor: "#ffccbc",
    borderColor: "#ffb6c1",
    cardBackgroundColor: "#fffafa",
    shadowColor: "#ffe0b2",
  },
};

const ContextProvider = ({ children }) => {
  const videoRef = useRef(null);

  const [isCorrect, setIsCorrect] = useState(null);

  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [videos, setVideos] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [soundUri, setSoundUri] = useState(null);
  const [soundObj, setSoundObj] = useState(null);
  const [soundIndex, setSoundIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLevel, setVideoLevel] = useState(1);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isAnswerModalVisible, setIsAnswerModalVisible] = useState(false);
  const [showHintButton, setShowHintButton] = useState(false);
  const [showHintNotification, setShowHintNotification] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [theme, setTheme] = useState(themes.default);
  const [levels, setLevels] = useState(null);
  const [playableSound, setPlayableSound] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isMcq, setIsMcq] = useState(false);
  const [mcqsData, setMcqsData] = useState(null);
  const [mcqIndex, setMcqIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  // Fetch API data for levels
  const fetchLevelsData = async () => {
    try {
      const response = await fetch(
        "https://web-true-phonetics-backend-production.up.railway.app/api/v1/levels"
      );
      if (response.ok) {
        const data = await response.json();
        setLevels(data?.levels);
      } else {
        console.error("Error fetching levels data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching levels data:", error);
    }
  };

  // Load the current level
  const loadCurrentLevel = () => {
    // console.log(levels, "+++++++++++++++++++++++++++===");
    if (levels?.length && currentLevel <= levels?.length) {
      const newCurrentLevel = levels?.find(
        (level) => level.level === currentLevel
      );
      console.log("currentLevel", newCurrentLevel?.type);
      if (newCurrentLevel) {
        if (newCurrentLevel?.type === "mcq") {
          setIsMcq(true);
          setMcqsData(newCurrentLevel?.mcqs[0]);
          console.log(newCurrentLevel);
          setMcqIndex(0);
        } else {
          setIsMcq(false);
          setCurrentSound(newCurrentLevel?.sounds[0]);
          setCurrentVideo(newCurrentLevel?.video);
          setSoundIndex(0);
        }
      }
    }
  };

  useEffect(() => {
    fetchLevelsData();
  }, []);

  useEffect(() => {
    loadCurrentLevel();
  }, [currentLevel, levels]);

  // Validate the answer
  const validateAnswer = async () => {
    // console.log(inputValue);
    if (!inputValue) return;
    setSelectedOption(null);
    setIsAnswerModalVisible(true);
    if (videoRef.current) videoRef.current.pauseAsync();

    if (currentSound && inputValue === currentSound.answer) {
      setInputValue("");
      setIsCorrect(true);
      setShowHintButton(false);
      setShowHintNotification(false);
      saveProgress(currentLevel, currentSound._id, true);
      moveToNextSound();
    } else {
      setIsCorrect(false);
    }
  };

  const validateQuizAnswer = async () => {
    if (!selectedOption) return;
    setInputValue("");
    setIsAnswerModalVisible(true);

    if (mcqsData && selectedOption == mcqsData.correctAnswer + 1) {
      setIsCorrect(true);
      setSelectedOption(null);
      setShowHintButton(false);
      setShowHintButton(false);
      moveToNextMcq();
    } else setIsCorrect(false);
  };

  const handleMoveToNextMcq = () => {
    moveToNextMcq();
  };

  const moveToNextMcq = () => {
    setSelectedOption(null);
    if (mcqsData && mcqIndex < levels[currentLevel - 1]?.mcqs?.length - 1) {
      setMcqIndex((prev) => prev + 1);
      console.log("hello");
      setMcqsData(levels[currentLevel - 1]?.mcqs[mcqIndex + 1]);
    } else {
      setCurrentLevel((prev) => prev + 1);
    }
  };

  // Save progress in AsyncStorage
  const saveProgress = async (level, soundId, isCorrect) => {
    try {
      const progress = await AsyncStorage.getItem("userProgress");
      const updatedProgress = progress
        ? { ...JSON.parse(progress), [`${level}_${soundId}`]: isCorrect }
        : { [`${level}_${soundId}`]: isCorrect };

      await AsyncStorage.setItem(
        "userProgress",
        JSON.stringify(updatedProgress)
      );
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  // Move to the next sound or level
  const moveToNextSound = () => {
    if (
      currentSound &&
      soundIndex < levels[currentLevel - 1]?.sounds.length - 1
    ) {
      setSoundIndex((prev) => prev + 1);
      setCurrentSound(levels[currentLevel - 1]?.sounds[soundIndex + 1]);
      setCurrentVideo(levels[currentLevel - 1]?.video);
    } else {
      setCurrentLevel((prev) => prev + 1);
    }
  };

  // Load and save theme
  const loadTheme = async () => {
    try {
      const storedThemeName = await AsyncStorage.getItem("selectedTheme");
      if (storedThemeName && themes[storedThemeName]) {
        setTheme(themes[storedThemeName]);
      }
    } catch (error) {
      console.error("Failed to load theme:", error);
    }
  };

  const saveTheme = async (themeName) => {
    try {
      await AsyncStorage.setItem("selectedTheme", themeName);
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  };

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setTheme(themes[themeName]);
      saveTheme(themeName);
    }
  };

  useEffect(() => {
    loadTheme();
  }, []);

  const value = {
    videoRef,
    isCorrect,
    selectedOption,
    setSelectedOption,
    validateQuizAnswer,
    setIsCorrect,
    isMcq,
    user,
    setUser,
    inputValue,
    setInputValue,
    videos,
    setVideos,
    videoEnded,
    setVideoEnded,
    soundUri,
    setSoundUri,
    soundObj,
    setSoundObj,
    soundIndex,
    setSoundIndex,
    isPlaying,
    setIsPlaying,
    videoLevel,
    setVideoLevel,
    isAnswerModalVisible,
    setIsAnswerModalVisible,
    showHintNotification,
    setShowHintNotification,
    showHintButton,
    setShowHintButton,
    currentSound,
    setCurrentSound,
    currentVideo,
    setCurrentVideo,
    validateAnswer,
    theme,
    changeTheme,
    currentAnswer,
    setCurrentAnswer,
    currentLevel,
    setCurrentLevel,
    levels,
    setLevels,
    playableSound,
    setPlayableSound,
    mcqsData,
    handleMoveToNextMcq,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvider;
