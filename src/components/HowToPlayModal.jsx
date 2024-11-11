import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const HowToPlayModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>HOW TO PLAY</Text>

          <View style={styles.instructions}>
            <View style={styles.instructionItem}>
              <FontAwesome name="play" size={24} color="#00796B" />
              <Text style={styles.instructionText}>
                Press the play button to hear a word or sentence.
              </Text>
            </View>

            <View style={styles.instructionItem}>
              <FontAwesome name="pencil" size={24} color="#00796B" />
              <Text style={styles.instructionText}>
                Type it the way it was said using the phonetic keyboard.
              </Text>
            </View>

            <View style={styles.instructionItem}>
              <FontAwesome name="check-circle" size={24} color="#00796B" />
              <Text style={styles.instructionText}>
                Press enter to check your answer and advance if it's right.
              </Text>
            </View>

            <View style={styles.instructionItem}>
              <FontAwesome name="mouse-pointer" size={24} color="#00796B" />
              <Text style={styles.instructionText}>
                You can input letters by clicking them or by typing.
              </Text>
            </View>

            <View style={styles.instructionItem}>
              <FontAwesome name="volume-up" size={24} color="#00796B" />
              <Text style={styles.instructionText}>
                Hover over the keys with your cursor to hear their sound.
              </Text>
            </View>

            <View style={styles.instructionItem}>
              <FontAwesome name="download" size={24} color="#00796B" />
              <Text style={styles.instructionText}>
                Download our keyboard layouts on our Downloads page!
              </Text>
            </View>

            <View style={styles.instructionItem}>
              <FontAwesome name="smile-o" size={24} color="#00796B" />
              <Text style={styles.instructionText}>
                Have fun learning to write the sounds of the voice!
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Play True Phonetics BETA!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxWidth: 550,
    backgroundColor: "#bdd8dd",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00796B",
    marginBottom: 20,
    textAlign: "center",
  },
  instructions: {
    width: "100%",
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
    flexShrink: 1,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#00796B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HowToPlayModal;
