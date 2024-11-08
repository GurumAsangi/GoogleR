import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

const OrderTrackingProgressBar = () => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the progress from 0 to 100 over 3 seconds
    Animated.timing(progress, {
      toValue: 100, // Adjust this value to set the completed percentage
      duration: 3000, // Duration of the animation
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ["0%", "50%", "100%"], // Adjust the output range to control how much of the bar fills up
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Track Your Order</Text>
      <View style={styles.progressBarBackground}>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  progressBarBackground: {
    height: 15,
    width: "100%",
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#0000FF", // Replace with your desired color
    borderRadius: 10,
  },
});

export default OrderTrackingProgressBar;
