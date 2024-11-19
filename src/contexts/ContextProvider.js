import React, { useEffect, useState } from "react";
import Context from "./context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const themes = {
  default: {
    backgroundColor: "#a0c1ca",
  },
  light: {
    backgroundColor: "#ffffff",
    textColor: "#000000",
    buttonColor: "#6200ea",
  },
  dark: {
    backgroundColor: "#121212",
    textColor: "#ffffff",
    buttonColor: "#bb86fc",
  },
  blue: {
    backgroundColor: "#e0f7fa",
    textColor: "#00796b",
    buttonColor: "#004d40",
  },
};

const ContextProvider = ({ children }) => {
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
  const [isAnswerModalVisible, setIsAnswerModalVisible] = useState(false);
  const [showHintButton, setShowHintButton] = useState(false);
  const [showHintNotification, setShowHintNotification] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);

  const [theme, setTheme] = useState(themes.default);

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
    theme,
    changeTheme,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvider;
