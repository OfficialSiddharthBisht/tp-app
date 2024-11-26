import React, { useEffect, useState } from "react";
import Context from "./context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const themes = {
  default: {
    backgroundColor: "#a0c1ca",
    buttonColor: "#fff",
    textColor: "#000",
  },
  light: {
    backgroundColor: "#ffffff",
    textColor: "#2c3e50",
    buttonColor: "#3498db",
    primaryColor: "#8e44ad", // Highlight/Primary elements
    secondaryColor: "#f39c12", // Secondary UI elements
    borderColor: "#dcdcdc",
    cardBackgroundColor: "#f7f9f9",
    shadowColor: "#bdc3c7",
  },
  dark: {
    backgroundColor: "#121212",
    textColor: "#ecf0f1",
    buttonColor: "#e74c3c",
    primaryColor: "#8e44ad", // Accent colors
    secondaryColor: "#3498db", // Highlights
    borderColor: "#2c3e50",
    cardBackgroundColor: "#1e272e",
    shadowColor: "#34495e",
  },
  blue: {
    backgroundColor: "#e0f7fa",
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
