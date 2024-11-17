import React, { useState } from "react";
import Context from "./context";
import { useNavigation } from "@react-navigation/native";

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
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvider;
