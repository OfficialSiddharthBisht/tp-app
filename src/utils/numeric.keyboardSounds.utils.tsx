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
      audio: async () =>
        await loadSoundAsync(require("../assets/sounds/numericSounds/1.mp3")),
    },
    "2": {
      phoneticKey: "2",
      audio: async () =>
        await loadSoundAsync(require("../assets/sounds/numericSounds/2.mp3")),
    },
    "3": {
      phoneticKey: "3",
      audio: async () =>
        await loadSoundAsync(require("../assets/sounds/numericSounds/3.mp3")),
    },
    "@": {
      phoneticKey: "@",
      audio: async () =>
        await loadSoundAsync(require("../assets/sounds/numericSounds/at.mp3")),
    },
    "#": {
      phoneticKey: "#",
      audio: async () =>
        await loadSoundAsync(
          require("../assets/sounds/numericSounds/hash.mp3")
        ),
    },
    "*": {
      phoneticKey: "*",
      audio: async () =>
        await loadSoundAsync(
          require("../assets/sounds/numericSounds/star.mp3")
        ),
    },
    "(": {
      phoneticKey: "(",
      audio: async () =>
        await loadSoundAsync(
          require("../assets/sounds/numericSounds/openParenthesis.mp3")
        ),
    },
    ")": {
      phoneticKey: ")",
      audio: async () =>
        await loadSoundAsync(
          require("../assets/sounds/numericSounds/closeParenthesis.mp3")
        ),
    },
  },
  {
    "4": {
      phoneticKey: "4",
      audio: async () =>
        await loadSoundAsync(require("../assets/sounds/numericSounds/4.mp3")),
    },
    "5": {
      phoneticKey: "5",
      audio: async () =>
        await loadSoundAsync(require("../assets/sounds/numericSounds/5.mp3")),
    },
    "6": {
      phoneticKey: "6",
      audio: async () =>
        await loadSoundAsync(require("../assets/sounds/numericSounds/6.mp3")),
    },
    "-": {
      phoneticKey: "-",
      audio: async () =>
        await loadSoundAsync(
          require("../assets/sounds/numericSounds/hyphen.mp3")
        ),
    },
    _: {
      phoneticKey: "_",
      audio: async () =>
        await loadSoundAsync(
          require("../assets/sounds/numericSounds/underscore.mp3")
        ),
    },
    "=": {
      phoneticKey: "=",
      audio: async () =>
        await loadSoundAsync(
          require("../assets/sounds/numericSounds/equals.mp3")
        ),
    },
    "[": {
      phoneticKey: "[",
      audio: async () =>
        await loadSoundAsync(
          require("../assets/sounds/numericSounds/openBracket.mp3")
        ),
    },
    "]": {
      phoneticKey: "]",
      audio: async () =>
        await loadSoundAsync(
          require("../assets/sounds/numericSounds/closeBracket.mp3")
        ),
    },
  },
  {
    "7": {
      phoneticKey: "7",
      audio: async () =>
        await loadSoundAsync(require("../assets/sounds/numericSounds/7.mp3")),
    },
    "8": {
      phoneticKey: "8",
      audio: async () =>
        await loadSoundAsync(require("../assets/sounds/numericSounds/8.mp3")),
    },
    "9": {
      phoneticKey: "9",
      audio: async () =>
        await loadSoundAsync(require("../assets/sounds/numericSounds/9.mp3")),
    },
    "+": {
      phoneticKey: "+",
      audio: async () =>
        await loadSoundAsync(
          require("../assets/sounds/numericSounds/plus.mp3")
        ),
    },
    "&": {
      phoneticKey: "&",
      audio: async () =>
        await loadSoundAsync(
          require("../assets/sounds/numericSounds/ampersand.mp3")
        ),
    },
    "{": {
      phoneticKey: "{",
      audio: async () =>
        await loadSoundAsync(
          require("../assets/sounds/numericSounds/openCurlyBrace.mp3")
        ),
    },
    "}": {
      phoneticKey: "}",
      audio: async () =>
        await loadSoundAsync(
          require("../assets/sounds/numericSounds/closeCurlyBrace.mp3")
        ),
    },
    "|": {
      phoneticKey: "|",
      audio: async () =>
        await loadSoundAsync(
          require("../assets/sounds/numericSounds/pipe.mp3")
        ),
    },
  },
  {
    "0": {
      phoneticKey: "0",
      audio: async () =>
        await loadSoundAsync(require("../assets/sounds/numericSounds/0.mp3")),
    },
    ".": {
      phoneticKey: ".",
      audio: async () =>
        await loadSoundAsync(require("../assets/sounds/numericSounds/dot.mp3")),
    },
    "/": {
      phoneticKey: "/",
      audio: async () =>
        await loadSoundAsync(
          require("../assets/sounds/numericSounds/slash.mp3")
        ),
    },
    "\\": {
      phoneticKey: "\\",
      audio: async () =>
        await loadSoundAsync(
          require("../assets/sounds/numericSounds/backslash.mp3")
        ),
    },
    ":": {
      phoneticKey: ":",
      audio: async () =>
        await loadSoundAsync(
          require("../assets/sounds/numericSounds/colon.mp3")
        ),
    },
    ";": {
      phoneticKey: ";",
      audio: async () =>
        await loadSoundAsync(
          require("../assets/sounds/numericSounds/semicolon.mp3")
        ),
    },
    "<": {
      phoneticKey: "<",
      audio: async () =>
        await loadSoundAsync(
          require("../assets/sounds/numericSounds/lessThan.mp3")
        ),
    },
    ">": {
      phoneticKey: ">",
      audio: async () =>
        await loadSoundAsync(
          require("../assets/sounds/numericSounds/greaterThan.mp3")
        ),
    },
    Delete: {
      phoneticKey: "Del",
      audio: null, // No sound associated with Delete
    },
  },
  {
    "123": {
      phoneticKey: "123",
      audio: null, // No sound associated
    },
    em: {
      phoneticKey: "em",
      audio: null, // No sound associated with emoji key
    },
    ".": {
      phoneticKey: ":",
      audio: null, // No sound associated
    },
    Space: {
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
