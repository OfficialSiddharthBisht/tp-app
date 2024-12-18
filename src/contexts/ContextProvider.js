import React, { useEffect, useRef, useState } from "react";
import Context from "./context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { themes } from "../utils/theme";

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
  const [sublevel, setSublevel] = useState(0);
  const [levelUpdateFlag, setLevelUpdateFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const handleLevelReset = () => {
    if (gameCompleted) {
      updateLevel(1, 1);
    }
    setGameCompleted(false);
  };

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
          setSublevel(response?.data?.user?.sublevel);
        } else {
          console.error("Failed to fetch user profile:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  };

  useEffect(() => {
    if (AsyncStorage.getItem("toekn")) {
      fetchUserProfile();
    }
  }, [levelUpdateFlag]);

  const updateLevel = async (level, sublevel) => {
    const url =
      "https://web-true-phonetics-backend-production.up.railway.app/api/v1/me/level";

    try {
      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        console.error("No auth token found. Please log in again.");
        return;
      }

      const payload = {
        level: level,
        sublevel: sublevel,
      };

      // Make the API call with the token in headers
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Level updated successfully:", response.data);
    } catch (error) {
      console.error(
        "Error updating level:",
        error.response?.data || error.message
      );
    } finally {
      setLevelUpdateFlag((prev) => !prev);
    }
  };
  // Fetch API data for levels
  const fetchLevelsData = () => {
    setLoading(true);

    axios
      .get(
        "https://web-true-phonetics-backend-production.up.railway.app/api/v1/levels"
      )
      .then((response) => {
        if (response.status === 200) {
          setLevels(response.data?.levels); // Update levels data
        } else {
          console.error("Error fetching levels data:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error fetching levels data:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading after the request completes
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
          setMcqsData(newCurrentLevel?.mcqs[sublevel - 1]);
          console.log(newCurrentLevel);
          setMcqIndex(sublevel - 1);
        } else {
          setIsMcq(false);
          // console.log("HEy hEy", newCurrentLevel?.sounds[0]);
          setCurrentSound(newCurrentLevel?.sounds[sublevel - 1]);
          setCurrentVideo(newCurrentLevel?.video);
          setSoundIndex(sublevel - 1);
        }
      }
    }
  };

  useEffect(() => {
    fetchLevelsData();
  }, []);

  useEffect(() => {
    loadCurrentLevel();
  }, [currentLevel, levels, sublevel]);

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
      // saveProgress(currentLevel, currentSound._id, true);
      if (levels.length < currentLevel - 2) {
        console.log("HEY YOU ");
        // setIsAnswerModalVisible(false);
        // setGameCompleted(true);
      }
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
      setShowHintNotification(false);
      if (levels.length < currentLevel - 2) {
        console.log("HELLO SIR");
        // setIsAnswerModalVisible(false);
        // setGameCompleted(true);
      }
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
      setMcqsData(levels[currentLevel - 1]?.mcqs[mcqIndex + 1]);
      updateLevel(currentLevel, sublevel + 1);
    } else {
      // setCurrentLevel((prev) => prev + 1);
      if (currentLevel < levels.length) updateLevel(currentLevel + 1, 1);
      else {
        setIsAnswerModalVisible(false);
        setGameCompleted(true);
      }
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
      updateLevel(currentLevel, sublevel + 1);
    } else {
      // console.log("UPDATING LEVL");
      if (currentLevel < levels.length) {
        updateLevel(currentLevel + 1, 1);
      } else {
        setIsAnswerModalVisible(false);
        setGameCompleted(true);
      }
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
    loading,
    gameCompleted,
    handleLevelReset,
    setGameCompleted,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvider;
