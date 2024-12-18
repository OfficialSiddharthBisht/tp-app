import React, { useContext } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Context from "../contexts/context";

const GameCompletedModal = ({ visible, onClose, onConfirm }) => {
  const { theme } = useContext(Context); // Get the current theme from the context

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.modalContainer,
          { backgroundColor: theme?.modalBackground },
        ]}
      >
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme?.quizContainer },
          ]}
        >
          <Text
            style={[styles.congratulationText, { color: theme?.textColor }]}
          >
            Congratulations! 🎉
          </Text>
          <Text
            style={[styles.messageText, { color: theme?.notificationText }]}
          >
            Do you want to go back to level 1?
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme?.buttonColor }]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, { color: theme?.buttonText }]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme?.skipButton }]}
              onPress={onConfirm}
            >
              <Text style={[styles.buttonText, { color: theme?.buttonText }]}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Styles
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },
  modalContent: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  congratulationText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  messageText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GameCompletedModal;
