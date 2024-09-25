import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/auth/Login";
import ContextProvider from "./src/contexts/ContextProvider";

import Home from "./src/screens/Home";
import SignUp from "./src/screens/auth/Signup";
import Profile from "./src/screens/Profile";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <ContextProvider>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </ContextProvider>
    </NavigationContainer>
  );
}
