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
import React, { useRef, useState } from "react";
import LOGO from "../../assets/true_phonetics_logo_square_bknhyt.jpg";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const SignUp = () => {
  const navigation = useNavigation();
  const [loginData, setLoginData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);

  const handleNextInput = (inputRef:any) => {
    inputRef?.current?.focus();
  };

  const handleSignUp = () => {
    if (!loginData.name || !loginData.email || !loginData.password) {
      alert("Please fill all fields");
      return;
    }

    // API call and navigation will go here
    alert("Sign up successful");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, marginHorizontal: 40 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View className="flex-1 justify-center mb-32">
            <View className="items-center justify-center mx-10 my-8 rounded-full">
              <Image
                source={LOGO}
                className="rounded-full h-32 w-32"
                resizeMode="cover"
              />
            </View>
            <View className="items-center">
              <Text className="font-semibold text-2xl">Signup</Text>
            </View>
            <View className="mt-8 gap-8">
              <View className="gap-y-2">
                <Text>Username</Text>
                <TextInput
                  ref={inputRef1}
                  className="w-full bg-white rounded-xl p-4"
                  placeholder="Username"
                  value={loginData.name}
                  onChangeText={(e) => setLoginData({ ...loginData, name: e })}
                  onSubmitEditing={() => handleNextInput(inputRef2)}
                  returnKeyType="next"
                />
              </View>
              <View className="gap-y-2">
                <Text>Email</Text>
                <TextInput
                  ref={inputRef2}
                  className="w-full bg-white rounded-xl p-4"
                  placeholder="Email"
                  value={loginData.email}
                  onChangeText={(e) => setLoginData({ ...loginData, email: e })}
                  onSubmitEditing={() => handleNextInput(inputRef3)}
                  returnKeyType="next"
                  keyboardType="email-address"
                />
              </View>
              <View className="gap-y-2">
                <Text>Password</Text>
                <View className="relative">
                  <TextInput
                    ref={inputRef3}
                    className="w-full bg-white rounded-xl p-4"
                    placeholder="Password"
                    value={loginData.password}
                    onChangeText={(e) =>
                      setLoginData({ ...loginData, password: e })
                    }
                    secureTextEntry={!passwordVisible}
                    keyboardType={passwordVisible ? "visible-password" : null}
                  />
                  <TouchableOpacity
                    style={{ position: "absolute", right: 10, top: 17 }}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  >
                    <Ionicons
                      name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                      size={24}
                      color="grey"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View className="flex-row ml-1 mt-1">
              <View>
                <Text>Already have an account? </Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-[#c55f5a]">Sign in</Text>
              </TouchableOpacity>
            </View>
            <View className="w-full mt-12">
              <TouchableOpacity
                className="w-full items-center justify-center bg-[#79d2eb] p-3 rounded-xl"
                onPress={handleSignUp}
              >
                <Text className="text-[#fff] font-semibold text-xl">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
