import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import LOGO from "../../assets/true_phonetics_logo_square_bknhyt.jpg";

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
  };

  // Function to format the date to dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={LOGO} style={styles.logo} resizeMode="cover" />
        <View style={styles.userInfo}>
          <Text style={styles.profileName}>{userData.name}</Text>
          <Text style={styles.profileEmail}>{userData.email}</Text>
        </View>

        {/* Streak Section */}
        <View style={styles.streakContainer}>
          <Text style={styles.streakText}>🔥 {userData.streak} Day Streak</Text>
        </View>
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
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Role</Text>
          <Text style={styles.detailValue}>{userData.role}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Joined</Text>
          <Text style={styles.detailValue}>
            {formatDate(userData.createdAt)}
          </Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 40,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
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
    position: "absolute",
    right: 0,
    top: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#79d2eb",
  },
  streakText: {
    color: "#fff",
    fontWeight: "600",
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
});

export default Profile;
