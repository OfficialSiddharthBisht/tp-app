import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Context from "../contexts/context";
import LoadingModal from "./LoadingModal";
import { useNavigation } from "@react-navigation/native";

function CustomDrawerContent(props) {
  const { user } = useContext(Context);
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
      <View style={styles.userInfo}>
        <View>
          <Text style={styles.name}>{user?.name || "Guest"}</Text>
          <Text style={styles.email}>{user?.email || "guest@example.com"}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />

      {/* Custom Drawer Items with Active Style */}
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
            color={currentRouteName === "Home" ? "#78d2eb" : "#333"}
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
            color={currentRouteName === "Profile" ? "#78d2eb" : "#333"}
          />
        )}
        style={[
          styles.drawerItem,
          currentRouteName === "Profile" && styles.activeDrawerItem,
        ]}
      />
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
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "gray",
  },
  logoutButton: {
    padding: 8,
  },
  separator: {
    marginVertical: 8,
    padding: 6,
    backgroundColor: "#8884",
    marginHorizontal: 8,
    borderRadius: 8,
  },
  drawerItem: {
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: "#8881",
    paddingHorizontal: 8,
  },
  drawerItemLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  activeDrawerItem: {
    backgroundColor: "#8882",
  },
  activeDrawerItemLabel: {
    color: "#78d2eb",
    fontWeight: "bold",
  },
});

export default CustomDrawerContent;
