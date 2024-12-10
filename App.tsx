import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import * as Font from "expo-font";

import { Ionicons } from "@expo/vector-icons"; // For logout icon

// Import screens
import Login from "./src/screens/auth/Login";
import SignUp from "./src/screens/auth/Signup";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile/Profile";

// Import context provider
import ContextProvider from "./src/contexts/ContextProvider";
import LoadingModal from "./src/components/LoadingModal";
import CustomDrawerContent from "./src/components/CustomDrawerContent";
import Settings from "./src/screens/Setting/Setting";
import SplashScreen from "./src/screens/SplashScreen";
import Quiz from "./src/screens/Quiz";
import NewHome from "./src/screens/NewHome";
import Context from "./src/contexts/context";

// Create stack navigator
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator with Custom Drawer Content
function MyDrawer() {
  const { theme } = useContext(Context);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          paddingTop: 15,
          width: Dimensions.get("window").width * 0.8,
          backgroundColor: theme?.headerColor,
        },
        headerStyle: {
          backgroundColor: theme?.headerStyle,
        },
        headerTintColor: theme?.headerTintColor,
        drawerType: "front",
        // drawerHideStatusBarOnOpen: false,
        // drawerStatusBarAnimation: "slide",
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Setting" component={Settings} />
      {/* <Drawer.Screen name="Quiz" component={Quiz} /> */}
    </Drawer.Navigator>
  );
}

// Main App Component
export default function App() {
  const [fontsLoaded] = Font.useFonts({
    NotoSans: require("./src/assets/fonts/NotoSans-Regular.ttf"),
    NotoSansBold: require("./src/assets/fonts/NotoSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <NavigationContainer>
      <ContextProvider>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
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
