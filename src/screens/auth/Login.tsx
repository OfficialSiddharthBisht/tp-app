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
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useRef, useState } from "react";
import LOGO from "../../assets/true_phonetics_logo_square_bknhyt.jpg";
import GOOGLE_LOGO from "../../assets/google_logo.png"; // Add the correct path to your Google logo
import APPLE_LOGO from "../../assets/apple_logo.png"; // Add the correct path to your Apple logo
import FACEBOOK_LOGO from "../../assets/facebook_logo.png"; // Add the correct path to your Facebook logo
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// API URL
const API_URL =
  "https://web-true-phonetics-backend-production.up.railway.app/api/v1/signin";

const Login = () => {
  const navigation = useNavigation();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  const handleNextInput = () => {
    inputRef2?.current?.focus();
  };

  // Email validation using regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      alert("Please fill out both fields.");
      return;
    }

    if (!isValidEmail(loginData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        setLoginData({
          email: "",
          password: "",
        });
        navigation.replace("Home");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error(error);
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`Login with ${provider} is not yet implemented.`);
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
              <Text style={styles.headerText}>Login</Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text>Username</Text>
                <TextInput
                  ref={inputRef1}
                  style={styles.inputField}
                  placeholder="Username or email"
                  value={loginData.email}
                  onChangeText={(e) => setLoginData({ ...loginData, email: e })}
                  onSubmitEditing={handleNextInput}
                  returnKeyType="next"
                  keyboardType="email-address"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    ref={inputRef2}
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
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.linkText}>Sign up</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.loginButtonContainer}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.orText}>Or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social login buttons */}
            <View style={styles.socialLoginContainer}>
              <TouchableOpacity
                onPress={() => handleSocialLogin("Google")}
                style={{ ...styles.socialLogoContainer, padding: 4 }}
              >
                <Image source={GOOGLE_LOGO} style={styles.socialLogo} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSocialLogin("Apple")}
                style={{ ...styles.socialLogoContainer, padding: 4 }}
              >
                <Image source={APPLE_LOGO} style={styles.socialLogo} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSocialLogin("Facebook")}
                style={{
                  ...styles.socialLogoContainer,
                  paddingVertical: 4,
                  paddingRight: 6,
                }}
              >
                <Image source={FACEBOOK_LOGO} style={styles.socialLogo} />
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
    marginBottom: "40%",
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
  loginButtonContainer: {
    width: "100%",
    marginTop: 48,
  },
  loginButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#79d2eb",
    padding: 12,
    borderRadius: 12,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#c5c5c5",
  },
  orText: {
    marginHorizontal: 8,
    fontWeight: "600",
    fontSize: 16,
    color: "#c5c5c5",
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 20,
  },
  socialLogoContainer: {
    width: 48,
    height: 48,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  socialLogo: {
    width: "100%",
    height: "100%",
  },
  linkContainer: {
    flexDirection: "row",
    marginLeft: 4,
    marginTop: 4,
  },
  linkText: {
    color: "#c7222a",
  },
});

export default Login;
