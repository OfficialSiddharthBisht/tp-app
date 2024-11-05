import { Audio } from "expo-av";

// Define a utility function to load the sound asynchronously
const loadSoundAsync = async (soundFile: any) => {
  try {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    return sound;
  } catch (error) {
    console.error("Error loading sound:", error);
    return null;
  }
};

// Numeric keyboard data structure with sounds mapped (mobile-focused)
const numericKeyboardWithSound = [
  {
    "1": {
      phoneticKey: "1",
      audio: null,
    },
    "2": {
      phoneticKey: "2",
      audio: null,
    },
    "3": {
      phoneticKey: "3",
      audio: null,
    },
    "@": {
      phoneticKey: "@",
      audio: null,
    },
    "#": {
      phoneticKey: "#",
      audio: null,
    },
    "*": {
      phoneticKey: "*",
      audio: null,
    },
    "(": {
      phoneticKey: "(",
      audio: null,
    },
    ")": {
      phoneticKey: ")",
      audio: null,
    },
  },
  {
    "4": {
      phoneticKey: "4",
      audio: null,
    },
    "5": {
      phoneticKey: "5",
      audio: null,
    },
    "6": {
      phoneticKey: "6",
      audio: null,
    },
    "-": {
      phoneticKey: "-",
      audio: null,
    },
    _: {
      phoneticKey: "_",
      audio: null,
    },
    "=": {
      phoneticKey: "=",
      audio: null,
    },
    "[": {
      phoneticKey: "[",
      audio: null,
    },
    "]": {
      phoneticKey: "]",
      audio: null,
    },
  },
  {
    "7": {
      phoneticKey: "7",
      audio: null,
    },
    "8": {
      phoneticKey: "8",
      audio: null,
    },
    "9": {
      phoneticKey: "9",
      audio: null,
    },
    "+": {
      phoneticKey: "+",
      audio: null,
    },
    "&": {
      phoneticKey: "&",
      audio: null,
    },
    "{": {
      phoneticKey: "{",
      audio: null,
    },
    "}": {
      phoneticKey: "}",
      audio: null,
    },
    "|": {
      phoneticKey: "|",
      audio: null,
    },
  },
  {
    "0": {
      phoneticKey: "0",
      audio: null,
    },
    ".": {
      phoneticKey: ".",
      audio: null,
    },
    "/": {
      phoneticKey: "/",
      audio: null,
    },
    "\\": {
      phoneticKey: "\\",
      audio: null,
    },
    ":": {
      phoneticKey: ":",
      audio: null,
    },
    ";": {
      phoneticKey: ";",
      audio: null,
    },
    "<": {
      phoneticKey: "<",
      audio: null,
    },
    ">": {
      phoneticKey: ">",
      audio: null,
    },
    "🗑️": {
      phoneticKey: "Del",
      audio: null, // No sound associated with Delete
    },
  },
  {
    "123": {
      phoneticKey: "123",
      audio: null, // No sound associated
    },
    "☺️": {
      phoneticKey: "em",
      audio: null, // No sound associated with emoji key
    },
    ".": {
      phoneticKey: ":",
      audio: null, // No sound associated
    },
    "␣": {
      phoneticKey: "Space",
      audio: null, // No sound associated with Space key
    },
    "'": {
      phoneticKey: "'",
      audio: null, // No sound associated with apostrophe key
    },
    Submit: {
      phoneticKey: "Submit",
      audio: null, // No sound associated with Submit key
    },
  },
];

// Exporting the numeric keyboard with sound data structure
export default numericKeyboardWithSound;
