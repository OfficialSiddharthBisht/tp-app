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
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("tokenIssuedAt");
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
          <Text style={[styles.name, { color: theme?.logOutText }]}>
            {user?.name || "Guest"}
          </Text>
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
            currentRouteName === "Home" && theme?.activeDrawerItemLabel,
            { color: currentRouteName !== "Home" ?? theme?.drawerItemLabel },
          ]}
          onPress={() => navigation.navigate("Home")}
          icon={() => (
            <Ionicons
              name="home-outline"
              size={22}
              color={
                currentRouteName === "Home"
                  ? theme?.selectedIconColor
                  : theme?.drawerItemLabel
              }
            />
          )}
          style={[
            styles.drawerItem,
            {
              backgroundColor:
                currentRouteName === "Home"
                  ? theme?.activeDrawerItem
                  : theme?.drawerItem,
            },
          ]}
        />
        <DrawerItem
          label="Profile"
          labelStyle={[
            styles.drawerItemLabel,
            currentRouteName === "Profile" && theme?.activeDrawerItemLabel,
            { color: currentRouteName !== "Profile" ?? theme?.drawerItemLabel },
          ]}
          onPress={() => navigation.navigate("Profile")}
          icon={() => (
            <Ionicons
              name="person-outline"
              size={22}
              color={
                currentRouteName === "Profile"
                  ? theme?.selectedIconColor
                  : theme?.drawerItemLabel
              }
            />
          )}
          style={[
            styles.drawerItem,
            {
              backgroundColor:
                currentRouteName === "Profile"
                  ? theme?.activeDrawerItem
                  : theme?.drawerItem,
            },
          ]}
        />
        {/* <DrawerItem
          label="Quiz"
          labelStyle={[
            styles.drawerItemLabel,
            currentRouteName === "Quiz" && theme?.activeDrawerItemLabel,
            { color: currentRouteName !== "Quiz" ?? theme?.drawerItemLabel },
          ]}
          onPress={() => navigation.navigate("Quiz")}
          icon={() => (
            <Ionicons
              name="list-circle-outline"
              size={22}
              color={
                currentRouteName === "Quiz"
                  ? theme?.selectedIconColor
                  : theme?.drawerItemLabel
              }
            />
          )}
          style={[
            styles.drawerItem,
            {
              backgroundColor:
                currentRouteName === "Quiz"
                  ? theme?.activeDrawerItem
                  : theme?.drawerItem,
            },
          ]}
        /> */}
        <DrawerItem
          label="Setting"
          labelStyle={[
            styles.drawerItemLabel,
            currentRouteName === "Setting" && theme?.activeDrawerItemLabel,
            { color: currentRouteName !== "Setting" ?? theme?.drawerItemLabel },
          ]}
          onPress={() => navigation.navigate("Setting")}
          icon={() => (
            <Ionicons
              name="settings-outline"
              size={22}
              color={
                currentRouteName === "Setting"
                  ? theme?.selectedIconColor
                  : theme?.drawerItemLabel
              }
            />
          )}
          style={[
            styles.drawerItem,
            {
              backgroundColor:
                currentRouteName === "Setting"
                  ? theme?.activeDrawerItem
                  : theme?.drawerItem,
            },
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
          <MaterialCommunityIcons
            name="exit-to-app"
            size={22}
            color={theme?.selectedIconColor}
          />
          <Text style={[styles.logoutText, { color: theme?.logOutText }]}>
            Logout
          </Text>
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
    paddingHorizontal: 8,
  },
  drawerItemLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  activeDrawerItem: {
    backgroundColor: "#fff",
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
