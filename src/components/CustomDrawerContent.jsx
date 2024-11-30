import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Context from "../contexts/context";
import LoadingModal from "./LoadingModal";
import { useNavigation } from "@react-navigation/native";

function CustomDrawerContent(props) {
  const { user, theme } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const { state } = props;
  const currentRouteName = state?.routeNames[state?.index];

  const handleLogout = async () => {
    setLoading(true);
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

      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
    >
      <LoadingModal
        visible={loading}
        onClose={() => setLoading(false)}
        title={"Logging out"}
      />

      {/* User Info Section */}
      <View style={styles.userInfo}>
        <View>
          <Text style={styles.name}>{user?.name || "Guest"}</Text>
          {/* <Text style={styles.email}>{user?.email || "guest@example.com"}</Text> */}
        </View>
      </View>
      <View style={styles.separator} />

      <ScrollView>
        {/* Drawer Items with Active Style */}
        <DrawerItem
          label="Home"
          labelStyle={[
            styles.drawerItemLabel,
            currentRouteName === "Home" && styles.activeDrawerItemLabel,
          ]}
          onPress={() => navigation.navigate("Home")}
          icon={() => (
            <Ionicons
              name="home-outline"
              size={22}
              color={currentRouteName === "Home" ? "#000" : "#111"}
            />
          )}
          style={[
            styles.drawerItem,
            currentRouteName === "Home" && styles.activeDrawerItem,
          ]}
        />
        <DrawerItem
          label="Profile"
          labelStyle={[
            styles.drawerItemLabel,
            currentRouteName === "Profile" && styles.activeDrawerItemLabel,
          ]}
          onPress={() => navigation.navigate("Profile")}
          icon={() => (
            <Ionicons
              name="person-outline"
              size={22}
              color={currentRouteName === "Profile" ? "#000" : "#111"}
            />
          )}
          style={[
            styles.drawerItem,
            currentRouteName === "Profile" && styles.activeDrawerItem,
          ]}
        />
        <DrawerItem
          label="Quiz"
          labelStyle={[
            styles.drawerItemLabel,
            currentRouteName === "Quiz" && styles.activeDrawerItemLabel,
          ]}
          onPress={() => navigation.navigate("Quiz")}
          icon={() => (
            <Ionicons
              name="list-circle-outline"
              size={22}
              color={currentRouteName === "Quiz" ? "#000" : "#111"}
            />
          )}
          style={[
            styles.drawerItem,
            currentRouteName === "Quiz" && styles.activeDrawerItem,
          ]}
        />
        <DrawerItem
          label="Setting"
          labelStyle={[
            styles.drawerItemLabel,
            currentRouteName === "Setting" && styles.activeDrawerItemLabel,
          ]}
          onPress={() => navigation.navigate("Setting")}
          icon={() => (
            <Ionicons
              name="settings-outline"
              size={22}
              color={currentRouteName === "Setting" ? "#000" : "#111"}
            />
          )}
          style={[
            styles.drawerItem,
            currentRouteName === "Setting" && styles.activeDrawerItem,
          ]}
        />
      </ScrollView>

      {/* Logout Button Positioned at Bottom */}
      <View
        style={[
          styles.bottomLogoutContainer,
          { backgroundColor: theme?.headerColor },
        ]}
      >
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="exit-to-app" size={22} color="black" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "gray",
  },
  separator: {
    marginVertical: 8,
    padding: 6,
    backgroundColor: "#fff6",
    marginHorizontal: 8,
    borderRadius: 8,
  },
  drawerItem: {
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: "#fff6",
    paddingHorizontal: 8,
  },
  drawerItemLabel: {
    fontSize: 16,
    color: "#111",
    fontWeight: "500",
  },
  activeDrawerItem: {
    backgroundColor: "#fff",
  },
  activeDrawerItemLabel: {
    color: "#000",
    fontWeight: "bold",
  },
  bottomLogoutContainer: {
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 15,
    paddingBottom: 24,
    paddingHorizontal: 24,
    overflow: "hidden",
    zIndex: 999,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
    fontWeight: "500",
  },
});

export default CustomDrawerContent;
