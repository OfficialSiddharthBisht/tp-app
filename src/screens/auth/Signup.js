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

  const { width, height } = Dimensions.get("window");

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
              <Image
                source={LOGO}
                style={styles.logo(width)}
                resizeMode="cover"
              />
            </View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText(width)}>Create your account</Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.labelText(width)}>Username</Text>
                <TextInput
                  ref={inputRef1}
                  style={styles.inputField(width)}
                  placeholder="Username"
                  value={signUpData.name}
                  onChangeText={(e) =>
                    setSignUpData({ ...signUpData, name: e })
                  }
                  onSubmitEditing={() => handleNextInput(inputRef2)}
                  returnKeyType="next"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.labelText(width)}>Email</Text>
                <TextInput
                  ref={inputRef2}
                  style={styles.inputField(width)}
                  placeholder="Email"
                  value={signUpData.email}
                  onChangeText={(e) =>
                    setSignUpData({ ...signUpData, email: e })
                  }
                  onSubmitEditing={() => handleNextInput(inputRef3)}
                  returnKeyType="next"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.labelText(width)}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    ref={inputRef3}
                    style={styles.inputField(width)}
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
                style={styles.signUpButton(width)}
                onPress={handleSignUp}
              >
                <Text style={styles.signUpButtonText(width)}>Sign Up</Text>
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
    marginHorizontal: "10%",
  },
  flexContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: "10%",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "5%",
  },
  logo: (width) => ({
    borderRadius: 100,
    height: width * 0.3,
    width: width * 0.3,
  }),
  headerContainer: {
    alignItems: "center",
  },
  headerText: (width) => ({
    fontWeight: "600",
    fontSize: width * 0.06,
  }),
  formContainer: {
    marginTop: "10%",
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  labelText: (width) => ({
    fontSize: width * 0.045,
  }),
  inputField: (width) => ({
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: width * 0.04,
  }),
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
    marginTop: "10%",
  },
  signUpButton: (width) => ({
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#79d2eb",
    padding: width * 0.02,
    borderRadius: 12,
  }),
  signUpButtonText: (width) => ({
    color: "#fff",
    fontWeight: "600",
    fontSize: width * 0.05,
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
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
  linkContainer: {
    flexDirection: "row",
    marginTop: 4,
    marginLeft: 4,
    gap: 4,
  },
  linkText: {
    color: "#79d2eb",
    fontWeight: "600",
  },
});

export default SignUp;
