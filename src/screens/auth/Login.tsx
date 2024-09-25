import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import LOGO from "../../assets/true_phonetics_logo_square_bknhyt.jpg";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, marginHorizontal: 40 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View className="flex-1 justify-center mb-32">
            <View className="items-center justify-center mx-10 my-8 rounded-full ">
              <Image
                source={LOGO}
                className="rounded-full h-32 w-32"
                resizeMode="cover"
              />
            </View>
            <View className="items-center">
              <Text className="font-semibold text-2xl">Login</Text>
            </View>
            <View className="mt-8 gap-8">
              <View className="gap-y-2">
                <Text>Username</Text>
                <TextInput
                  className="w-full bg-white rounded-xl p-4"
                  placeholder="Username or email"
                  value={loginData.email}
                  onChangeText={(e) => setLoginData({ ...loginData, email: e })}
                />
              </View>
              <View className="gap-y-2">
                <Text>Password</Text>
                <TextInput
                  className="w-full bg-white rounded-xl p-4"
                  placeholder="Password"
                  value={loginData.password}
                  onChangeText={(e) =>
                    setLoginData({ ...loginData, password: e })
                  }
                  secureTextEntry
                />
              </View>
            </View>
            <View className="flex-row ml-1 mt-1">
              <View>
                <Text>Don't have an account? </Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text className="text-[#c55f5a]">Sign up</Text>
              </TouchableOpacity>
            </View>
            <View className="w-full mt-12">
              <TouchableOpacity className="w-full items-center justify-center bg-[#9ad9ea] p-3 rounded-xl">
                <Text className="text-[#fff] font-semibold text-xl">Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
