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
  StyleSheet,
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

  const handleNextInput = (inputRef) => {
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
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.flexContainer}
        >
          <View style={styles.innerContainer}>
            <View style={styles.logoContainer}>
              <Image source={LOGO} style={styles.logo} resizeMode="cover" />
            </View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Signup</Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text>Username</Text>
                <TextInput
                  ref={inputRef1}
                  style={styles.inputField}
                  placeholder="Username"
                  value={loginData.name}
                  onChangeText={(e) => setLoginData({ ...loginData, name: e })}
                  onSubmitEditing={() => handleNextInput(inputRef2)}
                  returnKeyType="next"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text>Email</Text>
                <TextInput
                  ref={inputRef2}
                  style={styles.inputField}
                  placeholder="Email"
                  value={loginData.email}
                  onChangeText={(e) => setLoginData({ ...loginData, email: e })}
                  onSubmitEditing={() => handleNextInput(inputRef3)}
                  returnKeyType="next"
                  keyboardType="email-address"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    ref={inputRef3}
                    style={styles.inputField}
                    placeholder="Password"
                    value={loginData.password}
                    onChangeText={(e) =>
                      setLoginData({ ...loginData, password: e })
                    }
                    secureTextEntry={!passwordVisible}
                    keyboardType={passwordVisible ? "visible-password" : null}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
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
            <View style={styles.linkContainer}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.linkText}>Sign in</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.signUpButtonContainer}>
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSignUp}
              >
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 40,
  },
  flexContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: "50%",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 8,
    borderRadius: 100,
  },
  logo: {
    borderRadius: 100,
    height: 128,
    width: 128,
  },
  headerContainer: {
    alignItems: "center",
  },
  headerText: {
    fontWeight: "600",
    fontSize: 24,
  },
  formContainer: {
    marginTop: 32,
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputField: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 17,
  },
  linkContainer: {
    flexDirection: "row",
    marginLeft: 4,
    marginTop: 4,
  },
  linkText: {
    color: "#c55f5a",
  },
  signUpButtonContainer: {
    width: "100%",
    marginTop: 48,
  },
  signUpButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#79d2eb",
    padding: 12,
    borderRadius: 12,
  },
  signUpButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
});

export default SignUp;
