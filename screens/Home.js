import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomHeader from "./Header"; // Adjust the path as necessary

export default function Home({ navigation }) {
  // Since you're passing props directly to CustomHeader, no changes here
  return (
    <View style={styles.container}>
      {/* Use the Custom Header Component */}
      <CustomHeader
        centerComponent={{
          text: "Treeset",
          style: {
            color: "#1806E1",
            fontSize: 30,
            fontFamily: "sans-serif",
            fontWeight: "bold",
          },
        }}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>Register as Client</Text>
      </TouchableOpacity>

      <View style={styles.container1}>
        <View style={styles.line} />
        <Text style={styles.text}>Or</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity
        style={styles.button1}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4ff",
  },
  container1: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    flex: 0.25,
    height: 1,
    width: 5,
    backgroundColor: "black",
  },
  text: {
    marginHorizontal: 5,
    fontSize: 10,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 125,
    marginVertical: 20,
    alignItems: "center",
  },
  button1: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 130,
    borderRadius: 125,
    marginVertical: 20,
    alignItems: "center",
  },
  buttonText: {
    fontStyle: "italic",
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
