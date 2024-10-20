import { Audio } from 'expo-av';

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

// Virtual keyboard data structure with sounds mapped (mobile-focused)
const virtualKeyboardWithSound = [
  {
    ɑ: {
      phoneticKey: 'ɑ',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/vowels/aBack.mp3')),
    },
    æ: {
      phoneticKey: 'æ',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/vowels/aFront.mp3')),
    },
    ɜ: {
      phoneticKey: 'ɜ',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/vowels/schwaStrong.mp3')),
    },
    ə: {
      phoneticKey: 'ə',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/vowels/schwa.mp3')),
    },
    ʇ: {
      phoneticKey: 'ʇ',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/stoppers/glottalStop.mp3')),
    },
    ʌ: {
      phoneticKey: 'ʌ',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/vowels/aClosed.mp3')),
    },
    ü: {
      phoneticKey: 'ü',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/vowels/uHigh.mp3')),
    },
    ɪ: {
      phoneticKey: 'ɪ',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/vowels/iRelaxed.mp3')),
    },
    ɔ: {
      phoneticKey: 'ɔ',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/vowels/oClosed.mp3')),
    },
    ð: {
      phoneticKey: 'ð',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/voicedConsonants/fricatives/voicedTH.mp3')),
    },
  },
  {
    ʒ: {
      phoneticKey: 'ʒ',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/voicedConsonants/fricatives/zh.mp3')),
    },
    w: {
      phoneticKey: 'w',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/voicedConsonants/unpaired/w.mp3')),
    },
    e: {
      phoneticKey: 'e',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/vowels/eStrong.mp3')),
    },
    r: {
      phoneticKey: 'r',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/voicedConsonants/unpaired/r.mp3')),
    },
    t: {
      phoneticKey: 't',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/unvoicedConsonants/plosives/t.mp3')),
    },
    y: {
      phoneticKey: 'y',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/voicedConsonants/unpaired/y.mp3')),
    },
    u: {
      phoneticKey: 'u',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/vowels/uLow.mp3')),
    },
    i: {
      phoneticKey: 'i',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/vowels/iTight.mp3')),
    },
    o: {
      phoneticKey: 'o',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/vowels/oOpen.mp3')),
    },
    p: {
      phoneticKey: 'p',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/unvoicedConsonants/plosives/p.mp3')),
    },
  },
  {
    ʃ: {
      phoneticKey: 'ʃ',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/unvoicedConsonants/fricatives/sh.mp3')),
    },
    s: {
      phoneticKey: 's',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/unvoicedConsonants/fricatives/s.mp3')),
    },
    d: {
      phoneticKey: 'd',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/voicedConsonants/plosives/d.mp3')),
    },
    f: {
      phoneticKey: 'f',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/unvoicedConsonants/fricatives/f.mp3')),
    },
    g: {
      phoneticKey: 'g',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/voicedConsonants/plosives/g.mp3')),
    },
    h: {
      phoneticKey: 'h',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/unvoicedConsonants/fricatives/h.mp3')),
    },
    j: {
      phoneticKey: 'j',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/voicedConsonants/plosives/j.mp3')),
    },
    k: {
      phoneticKey: 'k',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/unvoicedConsonants/plosives/k.mp3')),
    },
    l: {
      phoneticKey: 'l',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/voicedConsonants/unpaired/l.mp3')),
    },
    θ: {
      phoneticKey: 'θ',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/unvoicedConsonants/fricatives/unvoicedTH.mp3')),
    },
  },
  {
    z: {
      phoneticKey: 'z',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/voicedConsonants/fricatives/z.mp3')),
    },
    ʊ: {
      phoneticKey: 'ʊ',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/vowels/schwa.mp3')),
    },
    ϫ: {
      phoneticKey: 'ϫ',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/unvoicedConsonants/plosives/ch.mp3')),
    },
    v: {
      phoneticKey: 'v',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/voicedConsonants/fricatives/v.mp3')),
    },
    b: {
      phoneticKey: 'b',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/voicedConsonants/plosives/b.mp3')),
    },
    n: {
      phoneticKey: 'n',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/voicedConsonants/unpaired/n.mp3')),
    },
    m: {
      phoneticKey: 'm',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/voicedConsonants/unpaired/m.mp3')),
    },
    ʔ: {
      phoneticKey: 'ʔ',
      audio: async () => await loadSoundAsync(require('../assets/sounds/letterSounds/stoppers/glottalStop.mp3')),
    },
    Delete: {
      phoneticKey: 'Delete',
      audio: null, // No sound associated with Delete
    },
  },
  {
    '123': {
      phoneticKey: '123',
      audio: null, // No sound associated
    },
    em: {
      phoneticKey: 'em',
      audio: null, // No sound associated with emoji key
    },
    '.': {
      phoneticKey: '.',
      audio: null, // No sound associated
    },
    Space: {
      phoneticKey: 'Space',
      audio: null, // No sound associated with Space key
    },
    "'": {
      phoneticKey: "'",
      audio: null, // No sound associated with apostrophe key
    },
    Submit: {
      phoneticKey: 'Submit',
      audio: null, // No sound associated with Submit key
    },
  },
];

// Exporting the virtual keyboard with sound data structure
export default virtualKeyboardWithSound;

