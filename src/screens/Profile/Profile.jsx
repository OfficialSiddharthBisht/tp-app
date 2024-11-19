import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import LOGO from "../../assets/true_phonetics_logo_square_bknhyt.jpg";
import AppHeader from "../../components/AppHeader";
import ConfettiCannon from "react-native-confetti-cannon";
import MainHeader from "../../components/MainHeader";
import LoadingModal from "../../components/LoadingModal";
import { styles } from "./profile.style";
import Context from "../../contexts/context";

const Profile = () => {
  const navigation = useNavigation();
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);

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
  const { user } = useContext(Context);
  const [userDATA, setUserData] = useState(user); // Initialize as null

  // State to handle modal visibility and selected badge
  const [badgeModalVisible, setBadgeModalVisible] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);

  // State for handling the streak fireworks
  const [fireworks, setFireworks] = useState(false);

  // State for delete account confirmation
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Format the date to dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (!userDATA) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  // Trigger fireworks if streak is greater than 2
  const handleStreakPress = () => {
    if (userDATA?.streak > 2) {
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

  const handleLogout = async () => {
    setLoadingModalVisible(true);
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

      navigation.navigate("Login");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Logout failed. Please try again.");
    } finally {
      setLoadingModalVisible(false);
    }
  };

  const handleDeleteAccount = () => {
    setDeleteModalVisible(true);
  };

  const confirmDeleteAccount = () => {
    alert("Account deleted");
    setDeleteModalVisible(false);
    navigation.navigate("Signup");
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <View style={{ marginHorizontal: 40 }}>
        {/* Streak Section */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
          style={{ paddingTop: 8 }}
        >
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <Image source={LOGO} style={styles.logo} resizeMode="cover" />
            <View style={styles.userInfo}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.profileName}
              >
                {userDATA?.name}
              </Text>
              <Text style={styles.profileEmail}>{userDATA?.email}</Text>
            </View>
          </View>

          {/* Prominent Points Display */}
          <View style={styles.pointsStreakContainer}>
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsLabel}>Points</Text>
              <Text style={styles.pointsValue}>{userDATA?.points}</Text>
            </View>

            {userDATA?.streak >= 0 && (
              <TouchableOpacity
                style={styles.pointsContainer}
                onPress={handleStreakPress}
                disabled={fireworks}
              >
                <Text style={styles.pointsLabel}>Streak</Text>
                <Text style={styles.pointsValue}>{userDATA?.streak}</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={styles.statsValue}>{userDATA?.level}</Text>
              <Text style={styles.statsLabel}>Level</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={styles.statsValue}>{userDATA?.sublevel}</Text>
              <Text style={styles.statsLabel}>Sublevel</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={styles.statsValue}>
                {userDATA?.languages.length}
              </Text>
              <Text style={styles.statsLabel}>Languages</Text>
            </View>
          </View>

          {/* Account Info */}
          <View style={styles.profileDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Account Type</Text>
              <View style={styles.accountRow}>
                <Text style={styles.detailValue}>{userDATA?.accountType}</Text>
                {/* Upgrade Button */}
                {userDATA?.accountType === "free" && (
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
            {userDATA?.role !== "user" && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Role</Text>
                <Text style={styles.detailValue}>{userDATA?.role}</Text>
              </View>
            )}

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Joined</Text>
              <Text style={styles.detailValue}>
                {formatDate(userDATA?.createdAt)}
              </Text>
            </View>
          </View>

          {/* Badges Section */}
          <View style={styles.badgesSection}>
            <Text style={styles.sectionTitle}>Badges</Text>
            <View style={styles.badgesContainer}>
              {userDATA?.badges?.length > 0 ? (
                userDATA?.badges?.map((badge, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.badge}
                    onPress={() => handleBadgePress(badge)}
                  >
                    <Text style={styles.badgeText}>{badge.name}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text>
                  You're on the right track—your first badge is within reach!
                  Keep pushing forward!
                </Text>
              )}
            </View>
          </View>

          {/* Logout Button */}
          <View style={styles.logoutContainer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
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
        </ScrollView>

        {/* Badge Details Modal */}
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

        {/* Delete Account Confirmation Modal */}
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
                Are you sure you want to delete your account? This action cannot
                be undone, and you will lose all your data, points, and
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

        {/* Loading Modal */}
        <LoadingModal
          visible={loadingModalVisible}
          onClose={() => setLoadingModalVisible(false)}
          title={"Logging Out..."}
        />

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

export default Profile;
