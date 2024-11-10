import "react-native-gesture-handler";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons"; // For logout icon

// Import screens
import Login from "./src/screens/auth/Login";
import SignUp from "./src/screens/auth/Signup";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile/Profile";

// Import context provider
import ContextProvider from "./src/contexts/ContextProvider";
import LoadingModal from "./src/components/LoadingModal";

// Create stack navigator
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Custom Drawer Content
function CustomDrawerContent(props) {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

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
      setLoading(false); // Set loading back to false after API call
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
          <Text style={styles.name}>User Name</Text>
          <Text style={styles.email}>user@example.com</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

// Drawer Navigator with Custom Drawer Content
function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <ContextProvider>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={SignUp} />
          <Stack.Screen name="Drawer" component={MyDrawer} />
        </Stack.Navigator>
      </ContextProvider>
    </NavigationContainer>
  );
}

// Styles
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
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 8,
  },
});
