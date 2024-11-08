import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons
import ForgotPasswordModal from "./ForgotPasswordModal"; // Import the modal

export default function LoginScreen({ navigation }) {
  // Default parameters using useState hooks
  const [username, setUsername] = useState("Navaneeth 29");
  const [password, setPassword] = useState("Navaneeth@29");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  // Function to handle Login button press
  const handleLogin = () => {
    const usernameRequirements = /^[A-Za-z0-9!@#$%^&*()_\-+= ]*$/; // Alphanumeric, special characters, and spaces allowed
    const passwordRequirements =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,16}$)/;

    if (!username || !password) {
      Alert.alert(
        "Invalid Credentials",
        "Please enter both username and password."
      );
    } else if (!usernameRequirements.test(username)) {
      Alert.alert(
        "Invalid Username",
        "Username can contain letters, numbers, special characters, and spaces."
      );
    } else if (!passwordRequirements.test(password)) {
      Alert.alert(
        "Invalid Password",
        "Password must be 8-16 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    } else {
      Alert.alert("Login Success", `Welcome, ${username}!`);
      navigation.navigate("Dashboard"); // Navigate to Dashboard on success
    }
  };

  // Function to handle Cancel button press
  const handleCancel = () => {
    setUsername("");
    setPassword("");
    Alert.alert("Form Cleared", "You have cleared the login form.");
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header with Logo and Signup Button */}
      <View style={styles.header}>
        <Text style={styles.logo}>Treeset</Text>
        <TouchableOpacity style={styles.signupButton}>
          <Text
            style={styles.signupText}
            onPress={() => navigation.navigate("Register")}
          >
            Signup
          </Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Login Section */}
        <Text style={styles.loginTitle}>LOGIN</Text>

        <Text style={styles.label}>
          Username <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>
          Password <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showPassword}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? "eye" : "eye-slash"} // Change icon based on state
              size={20}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4ff", // Light background color
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f0f4ff", // Match the container color
    zIndex: 1000,
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
  },
  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "blue",
    marginTop: 30,
    borderBottomColor: "black",
  },
  signupButton: {
    backgroundColor: "#4A6DC8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 30,
  },
  signupText: {
    color: "white",
    fontWeight: "bold",
  },
  scrollView: {
    paddingTop: 60, // Space for the fixed header
    paddingBottom: 20,
  },
  loginTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    marginTop: 150,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
    marginLeft: 15,
  },
  required: {
    color: "red", // Color for the required indicator
    fontWeight: "normal", // Optional: make it less bold
  },
  input: {
    height: 50,
    width: 325,
    marginLeft: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#DFE3EE",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: -30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  cancelButton: {
    backgroundColor: "#4A6DC8",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginLeft: 40,
  },
  loginButton: {
    backgroundColor: "#4A6DC8",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginRight: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: "#4F7DF1",
    textAlign: "center",
    marginVertical: 10,
  },
});
