import React, { useEffect, useRef, useState } from "react";
import Context from "./context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const themes = {
  default: {
    backgroundColor: "#a0c1ca",
    borderColor: "#888",
    headerColor: "#79d2eb",
    buttonColor: "#fff",
    textColor: "#000",
    quizContainer: "#bdd8dd",
    questionBox: "#b0e0e6",
    selectedOptionButton: "#00bcd4",
    unSelectedOptionButton: "#999",
    selectedOption: {
      backgroundColor: "#2196f3",
      borderColor: "#2196f3",
    },
    defaultOption: {
      backgroundColor: "#f0f0f0",
      borderColor: "#dcdcdc",
    },
    buttonText: "#fff",
    skipButton: "#f44336",
    notificationText: "#000",
    inputBackground: "#fff",
    inputBorder: "#ddd",
    inputTextColor: "#666",
    placeholderColor: "#999",
    blinkerColor: "#f11",
    statusBarStyle: "dark",
    modalBackground: "#fff",
    keyTextColor: "#333",
    keyBackground: "#f9e3d2",
    keyBorderColor: "#ccc",
    headerStyle: "#bdd8dd",
    headerTintColor: "#000",
    drawerItemLabel: "#111",
    activeDrawerItemLabel: {
      color: "#000",
      fontWeight: "bold",
    },
    selectedIconColor: "#000",
    drawerItem: "#fff6",
    activeDrawerItem: "#fff",
    logOutText: "#000",
  },
  neon: {
    backgroundColor: "#111122",
    borderColor: "#3e3e5c",
    headerColor: "#222244",
    buttonColor: "#ff4d88",
    textColor: "#ffffff",
    quizContainer: "#2b2b3c",
    questionBox: "#3e3e4f",
    selectedOptionButton: "#7c4dff",
    unSelectedOptionButton: "#4d4d72",
    selectedOption: {
      backgroundColor: "#7c4dff",
      borderColor: "#651fff",
    },
    defaultOption: {
      backgroundColor: "#1a1a2e",
      borderColor: "#4d4d72",
    },
    buttonText: "#ffffff",
    skipButton: "#ff4081",
    notificationText: "#f8f8ff",
    inputBackground: "#1a1a2e",
    inputBorder: "#4d4d72",
    inputTextColor: "#ffffff",
    placeholderColor: "#7c4dff",
    blinkerColor: "#ff4081",
    statusBarStyle: "light",
    modalBackground: "#29293d",
    keyTextColor: "#ffffff",
    keyBackground: "#3e3e5c",
    keyBorderColor: "#555575",
    headerStyle: "#2a2a42",
    headerTintColor: "#7c4dff",
    drawerItemLabel: "#ffffff",
    activeDrawerItemLabel: {
      color: "#ff4081",
      fontWeight: "bold",
    },
    selectedIconColor: "#7c4dff",
    drawerItem: "#29293d",
    activeDrawerItem: "#353553",
    logOutText: "#7c4dff",
  },
  pastel: {
    backgroundColor: "#fef6f0",
    borderColor: "#f8e1dc",
    headerColor: "#fce1e1",
    buttonColor: "#ff6f61",
    textColor: "#2c3e50",
    quizContainer: "#fbe4e1",
    questionBox: "#f1d0c1",
    selectedOptionButton: "#ff6f61",
    unSelectedOptionButton: "#f7a7b4",
    selectedOption: {
      backgroundColor: "#ff6f61",
      borderColor: "#ff947d",
    },
    defaultOption: {
      backgroundColor: "#fffafa",
      borderColor: "#ffb6c1",
    },
    buttonText: "#ffffff",
    skipButton: "#ff6f61",
    notificationText: "#2c3e50",
    inputBackground: "#ffffff",
    inputBorder: "#f3d6d0",
    inputTextColor: "#2c3e50",
    placeholderColor: "#f39c12",
    blinkerColor: "#ff947d",
    statusBarStyle: "dark",
    modalBackground: "#fffafa",
    keyTextColor: "#2c3e50",
    keyBackground: "#fbe4e1",
    keyBorderColor: "#f8e1dc",
    headerStyle: "#f1d0c1",
    headerTintColor: "#2c3e50",
    drawerItemLabel: "#2c3e50",
    activeDrawerItemLabel: {
      color: "#ff6f61",
      fontWeight: "bold",
    },
    selectedIconColor: "#ff6f61",
    drawerItem: "#fffafa",
    activeDrawerItem: "#fce1e1",
    logOutText: "#ff6f61",
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

  useEffect(() => {
    console.log("HELLO LEVEL", currentLevel);
  }, [currentLevel]);

  useEffect(() => {
    const fetchUserProfile = () => {
      AsyncStorage.getItem("authToken")
        .then((token) => {
          return axios.get(
            "https://web-true-phonetics-backend-production.up.railway.app/api/v1/me",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
        })
        .then((response) => {
          if (response.data.success) {
            setUser(response.data.user);
            setCurrentLevel(response.data.user.level);
            // console.log(response.data.user.level, "hello level");
          } else {
            console.error(
              "Failed to fetch user profile:",
              response.data.message
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    };

    fetchUserProfile();
  }, []);

  // Fetch API data for levels
  const fetchLevelsData = () => {
    axios
      .get(
        "https://web-true-phonetics-backend-production.up.railway.app/api/v1/levels"
      )
      .then((response) => {
        if (response.status === 200) {
          setLevels(response.data?.levels);
        } else {
          console.error("Error fetching levels data:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error fetching levels data:", error);
      });
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
