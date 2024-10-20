import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import LOGO from "../assets/true_phonetics_logo_square_bknhyt.jpg";

const MainHeader = ({ onHamburgerPress }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleProfilePress = () => {
    setModalVisible(!modalVisible);
  };

  const handleLogout = () => {
    setModalVisible(false);
    navigation.replace("Login");
  };

  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onHamburgerPress}>
        <Icon name="menu" size={28} color="#000" />
      </TouchableOpacity>

      <View>
        <Image source={LOGO} style={styles.profileImage} />
      </View>

      <TouchableOpacity onPress={handleProfilePress}>
        <Image
          source={{ uri: "https://via.placeholder.com/40" }} // We need to replace this url with user's image
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={handleProfilePress}
        statusBarTranslucent
      >
        <View style={styles.modalContainer}>
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
              onPress={handleProfilePress}
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
    fontSize: 20,
    fontWeight: "bold",
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
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
    marginTop: 20,
  },
  closeText: {
    color: "#007BFF", // Close button color
  },
});

export default MainHeader;
