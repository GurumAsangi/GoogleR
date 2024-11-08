import React, { useEffect, useRef } from "react";
import { View, Image, Text, StyleSheet, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LogoScreen() {
  const navigation = useNavigation();

  // Animation values for logo
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;

  // Animation values for text
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textScale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Combined animations for logo and text
    Animated.parallel([
      // Logo animations
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000, // Set to 1 second
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      // Text animations
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1000, // Set to 1 second
        delay: 250, // Slight delay for text animation
        useNativeDriver: true,
      }),
      Animated.spring(textScale, {
        toValue: 1,
        friction: 4,
        tension: 40,
        delay: 250, // Slight delay for text animation
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Navigate after 1 second
      setTimeout(() => {
        navigation.navigate("Home");
      }, 1000);
    });
  }, [logoOpacity, logoScale, textOpacity, textScale, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../image/Logo.png")}
        style={[
          styles.logo,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
        resizeMode="contain"
      />
      <Animated.Text
        style={[
          styles.text,
          { opacity: textOpacity, transform: [{ scale: textScale }] },
        ]}
      >
        Treeset
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#72C1FC",
  },
  logo: {
    width: 250,
    height: 250,
  },
  text: {
    marginTop: 20,
    fontSize: 64,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
