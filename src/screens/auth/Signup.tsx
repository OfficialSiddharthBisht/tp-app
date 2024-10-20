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
import GOOGLE_LOGO from "../../assets/google_logo.png";
import APPLE_LOGO from "../../assets/apple_logo.png";
import FACEBOOK_LOGO from "../../assets/facebook_logo.png";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// API URL for signup
const API_URL =
  "https://web-true-phonetics-backend-production.up.railway.app/api/v1/signup";

const SignUp = () => {
  const navigation = useNavigation();
  const [signUpData, setSignUpData] = useState({
    name: "",
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

  // Email validation using regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    const { name, email, password } = signUpData;

    // Validate inputs
    if (!name || !email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      // API request for signup
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sign up successful!");
        setSignUpData({
          name: "",
          email: "",
          password: "",
        });
        navigation.navigate("Login");
      } else {
        alert(data.message || "Sign up failed");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error(error);
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`Sign Up with ${provider} is not yet implemented.`);
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
              <Text style={styles.headerText}>Create your account</Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text>Username</Text>
                <TextInput
                  ref={inputRef1}
                  style={styles.inputField}
                  placeholder="Username"
                  value={signUpData.name}
                  onChangeText={(e) =>
                    setSignUpData({ ...signUpData, name: e })
                  }
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
                  value={signUpData.email}
                  onChangeText={(e) =>
                    setSignUpData({ ...signUpData, email: e })
                  }
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
                    value={signUpData.password}
                    onChangeText={(e) =>
                      setSignUpData({ ...signUpData, password: e })
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
                style={styles.socialLogoContainer}
              >
                <Image source={GOOGLE_LOGO} style={styles.socialLogo} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSocialLogin("Apple")}
                style={styles.socialLogoContainer}
              >
                <Image source={APPLE_LOGO} style={styles.socialLogo} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSocialLogin("Facebook")}
                style={styles.socialLogoContainer}
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

export default SignUp;
