import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/auth/Login";
import ContextProvider from "./src/contexts/ContextProvider";

import Home from "./src/screens/Home";
import SignUp from "./src/screens/auth/Signup";
import Profile from "./src/screens/Profile/Profile";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <ContextProvider>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </ContextProvider>
    </NavigationContainer>
  );
}
