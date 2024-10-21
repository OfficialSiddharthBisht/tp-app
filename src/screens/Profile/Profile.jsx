import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import LOGO from "../../assets/true_phonetics_logo_square_bknhyt.jpg";
import AppHeader from "../../components/AppHeader";
import ConfettiCannon from "react-native-confetti-cannon";
import MainHeader from "../../components/MainHeader";

const Profile = () => {
  const navigation = useNavigation();

  // Mocked user data from API response
  const userData = {
    _id: "66556cf54d24c178c69558ad",
    name: "Alex",
    email: "apenman1991@gmail.com",
    role: "user",
    accountType: "free",
    createdAt: "2024-05-28T05:34:45.653Z",
    currentLevel: 1,
    currentSublevel: "1",
    languages: ["en", "in"],
    level: 2,
    sublevel: 3,
    streak: 5,
    points: 1500,
    badges: [
      { name: "Beginner", description: "Completed 5 lessons" },
      { name: "Achiever", description: "Completed 10 lessons in a week" },
    ],
  };

  // State to handle modal visibility and selected badge
  const [badgeModalVisible, setBadgeModalVisible] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);

  // State for handling the streak fireworks
  const [fireworks, setFireworks] = useState(false);

  // State for delete account confirmation
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Function to format the date to dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Trigger fireworks if streak is greater than 2
  const handleStreakPress = () => {
    if (userData.streak > 2) {
      setFireworks(true);

      // Stop fireworks after 2 seconds
      setTimeout(() => {
        setFireworks(false);
      }, 5000);
    }
  };

  const handleBadgePress = (badge) => {
    setSelectedBadge(badge);
    setBadgeModalVisible(true);
  };

  const handleDeleteAccount = () => {
    // Show confirmation modal
    setDeleteModalVisible(true);
  };

  const confirmDeleteAccount = () => {
    // Handle account deletion logic here
    alert("Account deleted");
    setDeleteModalVisible(false);
    navigation.navigate("Signup");
  };

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader />
      <View style={{ marginHorizontal: 40 }}>
        <AppHeader onPress={() => navigation.goBack()} title={"Profile"} />

        {/* Streak Section */}
        <TouchableOpacity
          style={styles.streakContainer}
          onPress={handleStreakPress}
          disabled={fireworks}
        >
          <Text style={styles.streakText}>🔥 {userData.streak} Day Streak</Text>
        </TouchableOpacity>

        <ScrollView>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <Image source={LOGO} style={styles.logo} resizeMode="cover" />
            <View style={styles.userInfo}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.profileName}
              >
                {userData.name}
              </Text>
              <Text style={styles.profileEmail}>{userData.email}</Text>
            </View>
          </View>

          {/* Prominent Points Display */}
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsLabel}>Points</Text>
            <Text style={styles.pointsValue}>{userData.points}</Text>
          </View>

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={styles.statsValue}>{userData.currentLevel}</Text>
              <Text style={styles.statsLabel}>Level</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={styles.statsValue}>{userData.currentSublevel}</Text>
              <Text style={styles.statsLabel}>Sublevel</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={styles.statsValue}>{userData.languages.length}</Text>
              <Text style={styles.statsLabel}>Languages</Text>
            </View>
          </View>

          {/* Account Info */}
          <View style={styles.profileDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Account Type</Text>
              <View style={styles.accountRow}>
                <Text style={styles.detailValue}>{userData.accountType}</Text>
                {/* Upgrade Button */}
                {userData.accountType === "free" && (
                  <TouchableOpacity
                    style={styles.upgradeButton}
                    onPress={() => alert("Upgrade to Premium")}
                  >
                    <Text style={styles.upgradeButtonText}>Upgrade</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Conditionally display the role if it's not "user" */}
            {userData.role !== "user" && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Role</Text>
                <Text style={styles.detailValue}>{userData.role}</Text>
              </View>
            )}

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Joined</Text>
              <Text style={styles.detailValue}>
                {formatDate(userData.createdAt)}
              </Text>
            </View>
          </View>

          {/* Badges Section */}
          <View style={styles.badgesSection}>
            <Text style={styles.sectionTitle}>Badges</Text>
            <View style={styles.badgesContainer}>
              {userData.badges.map((badge, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.badge}
                  onPress={() => handleBadgePress(badge)}
                >
                  <Text style={styles.badgeText}>{badge.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Logout Button */}
          <View style={styles.logoutContainer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                alert("Logged out!");
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>

          {/* Delete Account Button */}
          <View style={styles.deleteAccountContainer}>
            <TouchableOpacity
              style={styles.deleteAccountButton}
              onPress={handleDeleteAccount}
            >
              <Text style={styles.deleteAccountButtonText}>Delete Account</Text>
            </TouchableOpacity>
          </View>

          {/* Modal for Badge Details */}
          {selectedBadge && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={badgeModalVisible}
              onRequestClose={() => setBadgeModalVisible(false)}
              statusBarTranslucent
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{selectedBadge.name}</Text>
                  </View>
                  <Text style={styles.modalDescription}>
                    {selectedBadge.description}
                  </Text>
                  <TouchableOpacity
                    style={styles.closeIconContainer}
                    onPress={() => setBadgeModalVisible(false)}
                  >
                    <Icon name="close" size={24} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}

          {/* Modal for Delete Account Confirmation */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={deleteModalVisible}
            onRequestClose={() => setDeleteModalVisible(false)}
            statusBarTranslucent
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Confirm Account Deletion</Text>
                <Text style={styles.modalDescription}>
                  Are you sure you want to delete your account? This action
                  cannot be undone, and you will lose all your data, points, and
                  progress.
                </Text>

                {/* Confirmation buttons */}
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={confirmDeleteAccount}
                  >
                    <Text style={styles.confirmButtonText}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setDeleteModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
        {fireworks && (
          <View style={styles.confettiContainer}>
            <ConfettiCannon
              count={150}
              origin={{ x: 0, y: 0 }}
              explosionSpeed={350}
              fadeOut={false}
              autoStart={true}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  logo: {
    borderRadius: 100,
    height: 100,
    width: 100,
  },
  userInfo: {
    marginLeft: 20,
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "600",
  },
  profileEmail: {
    fontSize: 16,
    color: "#888",
  },
  streakContainer: {
    // position: "absolute",
    // right: 0,
    // top: "14%",
    alignSelf: "flex-end",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#79d2eb",
    overflow: "visible",
  },
  streakText: {
    color: "#fff",
    fontWeight: "600",
  },
  pointsContainer: {
    alignItems: "center",
    marginVertical: 10,
    padding: 20,
    borderWidth: 2,
    borderColor: "#79d2eb",
    borderRadius: 12,
    backgroundColor: "#f1f9fc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pointsLabel: {
    fontSize: 18,
    color: "#444",
    fontWeight: "600",
  },
  pointsValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#79d2eb",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  statsBox: {
    alignItems: "center",
  },
  statsValue: {
    fontSize: 22,
    fontWeight: "600",
  },
  statsLabel: {
    fontSize: 14,
    color: "#666",
  },
  profileDetails: {
    marginVertical: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "400",
    color: "#666",
  },
  upgradeButton: {
    marginLeft: 10,
    backgroundColor: "#c7222a",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: "#000",
    borderWidth: 0.7,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  upgradeButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  badgesSection: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  badge: {
    backgroundColor: "#79d2eb",
    padding: 10,
    borderRadius: 12,
    margin: 5,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  closeIconContainer: {
    alignSelf: "flex-end",
    bottom: "90%",
    left: 15,
    borderWidth: 0.5,
    backgroundColor: "#1123",
    borderRadius: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "#c7222a",
    padding: 10,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#79d2eb",
    padding: 10,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  logoutContainer: {
    marginTop: 40,
    width: "100%",
  },
  logoutButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#79d2eb",
    padding: 12,
    borderRadius: 12,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  deleteAccountContainer: {
    marginTop: 20,
  },
  deleteAccountButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c7222a",
    padding: 12,
    borderRadius: 12,
  },
  deleteAccountButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  confettiContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999, // Ensure it's on top
    pointerEvents: "none", // Allow touches to pass through
  },
});

export default Profile;
