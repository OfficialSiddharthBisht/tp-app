import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";

const KeyboardModal = ({ isVisible, onClose }) => {
  const buttonText =
    Platform.OS === "ios"
      ? "Download from App Store"
      : "Download from Google Play";

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              {/* Close button */}
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>

              {/* Modal Text */}
              <Text style={styles.modalText}>
                This keyboard layout is available on both Android and iPhone.
                Our goal is to let you write phonetics anywhere, not just in
                this game. We've added this button to match our game keyboard
                with our app keyboard. But, you won’t need emojis in this game
                😉.
              </Text>

              <TouchableOpacity style={styles.downloadButton}>
                <Text style={styles.downloadButtonText}>{buttonText}</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: "black",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  },
  downloadButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  downloadButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default KeyboardModal;
