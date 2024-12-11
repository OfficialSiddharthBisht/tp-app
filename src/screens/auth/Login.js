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
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useRef, useState } from "react";
import LOGO from "../../assets/true_phonetics_logo_square_bknhyt.jpg";
import GOOGLE_LOGO from "../../assets/google_logo.png";
import APPLE_LOGO from "../../assets/apple_logo.png";
import FACEBOOK_LOGO from "../../assets/facebook_logo.png";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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
  const [loading, setLoading] = useState(false);

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    const fetchSavedCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("savedEmail");
        const savedPassword = await AsyncStorage.getItem("savedPassword");
        if (savedEmail && savedPassword) {
          setLoginData({ email: savedEmail, password: savedPassword });
        }
      } catch (error) {
        console.error("Failed to load saved credentials:", error);
      }
    };
    fetchSavedCredentials();
  }, []);

  const handleNextInput = () => {
    inputRef2?.current?.focus();
  };

  // Email validation using regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (!loginData.email || !loginData.password) {
      alert("Please fill out both fields.");
      return;
    }

    if (!isValidEmail(loginData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    axios
      .post(API_URL, {
        email: loginData.email,
        password: loginData.password,
      })
      .then((response) => {
        const data = response.data;

        if (response.status === 200) {
          AsyncStorage.setItem("authToken", data.token)
            .then(() => AsyncStorage.setItem("savedEmail", loginData.email))
            .then(() =>
              AsyncStorage.setItem("savedPassword", loginData.password)
            )
            .then(() => {
              setLoginData({
                email: "",
                password: "",
              });
              navigation.reset({
                index: 0,
                routes: [{ name: "Drawer" }],
              });
            });
        } else {
          alert(data.message || "Login failed");
        }
      })
      .catch((error) => {
        alert("An error occurred. Please try again.");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
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
              <Image
                source={LOGO}
                style={styles.logo(width)}
                resizeMode="cover"
              />
            </View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText(width)}>Login</Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.labelText(width)}>Email</Text>
                <TextInput
                  ref={inputRef1}
                  style={styles.inputField(width)}
                  placeholder="Email"
                  value={loginData.email}
                  onChangeText={(e) =>
                    setLoginData({ ...loginData, email: e.toLowerCase() })
                  }
                  onSubmitEditing={handleNextInput}
                  returnKeyType="next"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.labelText(width)}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    ref={inputRef2}
                    style={styles.inputField(width)}
                    placeholder="Password"
                    value={loginData.password}
                    autoCapitalize="none"
                    onChangeText={(e) =>
                      setLoginData({ ...loginData, password: e })
                    }
                    secureTextEntry={!passwordVisible}
                    keyboardType={
                      passwordVisible ? "visible-password" : "default"
                    }
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
                style={styles.loginButton(width)}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={"#fff"} />
                ) : (
                  <Text style={styles.loginButtonText(width)}>Login</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.orText(width)}>Or</Text>
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
    marginHorizontal: "10%", // Use percentage for responsiveness
  },
  flexContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: "10%", // Adjusted to percentage for better scaling
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "5%",
  },
  logo: (width) => ({
    borderRadius: 100,
    height: width * 0.3, // Responsive height based on screen width
    width: width * 0.3, // Responsive width based on screen width
  }),
  headerContainer: {
    alignItems: "center",
  },
  headerText: (width) => ({
    fontWeight: "600",
    fontSize: width * 0.06, // Responsive font size
  }),
  formContainer: {
    marginTop: "10%",
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  labelText: (width) => ({
    fontSize: width * 0.045, // Responsive label font size
  }),
  inputField: (width) => ({
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: width * 0.04, // Responsive padding
  }),
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
    marginTop: "10%", // Adjusted for responsiveness
  },
  loginButton: (width) => ({
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#79d2eb",
    padding: width * 0.02, // Responsive padding
    borderRadius: 12,
  }),
  loginButtonText: (width) => ({
    color: "#fff",
    fontWeight: "600",
    fontSize: width * 0.05, // Responsive font size
  }),
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "5%",
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#c5c5c5",
  },
  orText: (width) => ({
    fontSize: width * 0.04,
    color: "#c5c5c5",
  }),
  socialLoginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 15,
  },
  socialLogoContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  socialLogo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  linkContainer: {
    flexDirection: "row",
    marginLeft: 4,
    marginTop: 4,
    gap: 4,
  },
  linkText: {
    color: "#79d2eb",
    fontWeight: "600",
  },
});

export default Login;
