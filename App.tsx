import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Import screens
import Login from "./src/screens/auth/Login";
import SignUp from "./src/screens/auth/Signup";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile/Profile";

// Import context provider
import ContextProvider from "./src/contexts/ContextProvider";

// Create stack navigator
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator screenOptions={{}}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

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
