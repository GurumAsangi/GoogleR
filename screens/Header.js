import React from "react";
import { View, StyleSheet } from "react-native";
import { Header as RNEHeader } from "react-native-elements";

const CustomHeader = ({
  leftComponent = null,
  centerComponent = {
    text: "Default Title",
    style: { fontSize: 20, color: "black" },
  },
  rightComponent = null,
  onBackPress = null,
}) => {
  // Create a left component with back button if onBackPress is provided
  const leftComponentWithBack = onBackPress
    ? {
        icon: "arrow-left", // Use FontAwesome arrow icon
        color: "#000", // Icon color
        onPress: onBackPress, // Call the back function when pressed
      }
    : leftComponent;

  return (
    <RNEHeader
      containerStyle={styles.header}
      leftComponent={leftComponentWithBack}
      centerComponent={centerComponent}
      rightComponent={rightComponent}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#f0f4ff",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    borderBottomColor: "black",
  },
});

export default CustomHeader;
