import { CommonActions, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import LOGO from "../assets/true_phonetics_logo_square_bknhyt.jpg";

const MainHeader = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(""); // New state to track which modal to show
  const navigation = useNavigation();

  const showModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  const handleLogout = async () => {
    setModalVisible(false);

    try {
      const response = await fetch(
        "https://web-true-phonetics-backend-production.up.railway.app/api/v1/signout",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleOptionSelect = (route) => {
    setModalVisible(false);
    navigation.navigate(route);
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => showModal("hamburger")}>
        <Icon name="menu" size={28} color="#000" />
      </TouchableOpacity>

      <Image source={LOGO} style={styles.logo} />

      <TouchableOpacity onPress={() => showModal("profile")}>
        <Image
          source={{ uri: "https://via.placeholder.com/40" }} // Replace with user's image
          style={styles.profileImage}
        />
      </TouchableOpacity>

      {/* Modal for Profile */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible && modalType === "profile"}
        onRequestClose={() => setModalVisible(false)}
        statusBarTranslucent
      >
        <View
          style={styles.modalContainer}
          onTouchEnd={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Profile");
              }}
              style={styles.optionsContainer}
            >
              <Text style={styles.modalOption}>My Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.optionsContainer}
            >
              <Text style={styles.modalOption}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for Hamburger Menu */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible && modalType === "hamburger"}
        onRequestClose={() => setModalVisible(false)}
        statusBarTranslucent
      >
        <View
          style={styles.modalContainer}
          onTouchEnd={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Menu</Text>
            <TouchableOpacity
              onPress={() => handleOptionSelect("Home")}
              style={styles.optionsContainer}
            >
              <Text style={styles.modalOption}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOptionSelect("Settings")}
              style={styles.optionsContainer}
            >
              <Text style={styles.modalOption}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOptionSelect("Help")}
              style={styles.optionsContainer}
            >
              <Text style={styles.modalOption}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOptionSelect("About")}
              style={styles.optionsContainer}
            >
              <Text style={styles.modalOption}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOptionSelect("Contact")}
              style={styles.optionsContainer}
            >
              <Text style={styles.modalOption}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f0f0f0",
    elevation: 1,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 100,
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 15,
  },
  optionsContainer: {
    borderBottomWidth: 1,
    width: "100%",
    alignItems: "center",
    borderColor: "#999",
  },
  modalOption: {
    fontSize: 18,
    marginVertical: 10,
  },
  closeButton: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  closeText: {
    color: "#007BFF",
  },
});

export default MainHeader;
