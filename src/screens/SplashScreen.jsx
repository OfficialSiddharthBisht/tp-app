import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LOGO from "../assets/true_phonetics_logo_square_bknhyt.jpg";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 900);

    return () => clearTimeout(timer);
  }, [navigation, scaleAnim]);

  return (
    <LinearGradient colors={["#CFD9DF", "#E2EBF0"]} style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image source={LOGO} style={{ borderRadius: 400 }} />
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    backgroundColor: "#3498db",
    borderRadius: 50,
  },
  logoText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default SplashScreen;
