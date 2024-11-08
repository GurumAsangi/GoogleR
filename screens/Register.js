import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import CustomHeader from "./Header";
import { RadioButton } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "./UserContext";
import * as ImagePicker from "expo-image-picker";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { setUserDetails } = useContext(UserContext);
  const [name, setName] = useState("Navaneeth Reddy");
  const [phone, setPhone] = useState("8374364246");
  const [email, setEmail] = useState("sainavaneeth29@gmail.com");
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("Navaneeth 29");
  const [password, setPassword] = useState("Navaneeth@29");
  const [rePassword, setRePassword] = useState("Navaneeth@29");
  const [photo, setPhoto] = useState(null);
  const [usernameError, setUsernameError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  const handlePhotoUpload = async (sourceType) => {
    try {
      let result;
      if (sourceType === "camera") {
        const cameraPermission =
          await ImagePicker.requestCameraPermissionsAsync();
        if (!cameraPermission.granted) {
          alert("Permission to access the camera is required!");
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true, // Enable basic cropping
          aspect: [1, 1], // Optional: specify aspect ratio for cropping (1:1 in this case)
          quality: 1,
        });
      } else {
        const galleryPermission =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!galleryPermission.granted) {
          alert("Permission to access the gallery is required!");
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true, // Enable basic cropping
          aspect: [1, 1], // Optional: specify aspect ratio for cropping (1:1)
          quality: 1,
        });
      }

      if (result.canceled) {
        console.log("Image picker canceled");
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const source = { uri: result.assets[0].uri };
        setPhoto(source); // Display the selected photo
      } else {
        alert("No photo selected.");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("An error occurred while picking the image.");
    }
  };

  const handleRegister = () => {
    setUserDetails({ name, userId, email, phone, profileImage: null });

    if (
      !name ||
      !phone ||
      !email ||
      !gender ||
      !username ||
      !password ||
      !rePassword ||
      !photo
    ) {
      alert("Please fill in all required fields and upload a photo.");
      return;
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      alert("Please enter a valid name with only alphabets.");
      return;
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const usernameRegex = /^[A-Za-z0-9!@#$%^&*()_\-+= ]{5,}$/;
    if (!usernameRegex.test(username)) {
      setUsernameError(true);
      alert(
        "Username must be at least 5 characters long, contain alphanumeric characters, and include at least one special character."
      );
      return;
    } else {
      setUsernameError(false);
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,16}$)/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be 8-16 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    if (password !== rePassword) {
      alert("Passwords do not match.");
      return;
    }

    if (username === password) {
      alert("Username and password cannot be the same.");
      return;
    }
    const userId = username; // Generate or assign as necessary
    setUserDetails({ name, userId, email, phone, profileImage: photo.uri });

    alert("Registration successful!");
    navigation.navigate("Login");
  };

  const handleCancel = () => {
    setName("");
    setPhone("");
    setEmail("");
    setGender("");
    setUsername("");
    setPassword("");
    setRePassword("");
    setPhoto(null);
    setUsernameError(false);
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftComponent={{
          icon: "arrow-back",
          color: "#000",
          onPress: handleBack,
          size: 35,
        }}
        centerComponent={{
          text: "Treeset",
          style: {
            color: "#1806E1",
            fontSize: 30,
            fontFamily: "sans-serif",
            fontWeight: "bold",
          },
        }}
        rightComponent={
          <TouchableOpacity
            onPress={handleLoginPress}
            style={styles.loginButton}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Register, yourself!</Text>

        {photo ? (
          <View style={{ alignItems: "center" }}>
            <Image source={photo} style={styles.photoPreview} />
            <TouchableOpacity
              style={styles.photoButton1}
              onPress={() => setModalVisible(true)}
            >
              <Icon
                name="camera"
                size={20}
                color="white"
                style={styles.iconStyle}
              />
              <Text style={styles.photoButtonText}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.photoButton}
            onPress={() => setModalVisible(true)}
          >
            <Icon
              name="camera"
              size={20}
              color="white"
              style={styles.iconStyle}
            />
            <Text style={styles.photoButtonText}>Add Photo</Text>
          </TouchableOpacity>
        )}

        {/* Modal for selecting Camera or Gallery */}
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  handlePhotoUpload("camera");
                }}
              >
                <Text style={styles.modalButtonText}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  handlePhotoUpload("gallery");
                }}
              >
                <Text style={styles.modalButtonText}>Choose from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => {
                  handleCancel();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Text style={styles.label}>
          Enter Your Name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>
          Phone Number <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <Text style={styles.label}>
          Email <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.genderContainer}>
          <Text>
            Gender :<Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.genderOptions}>
            <View style={styles.radioButton}>
              <RadioButton
                value="male"
                status={gender === "male" ? "checked" : "unchecked"}
                onPress={() => setGender("male")}
              />
              <Text>Male</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton
                value="female"
                status={gender === "female" ? "checked" : "unchecked"}
                onPress={() => setGender("female")}
              />
              <Text>Female</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton
                value="Others"
                status={gender === "Others" ? "checked" : "unchecked"}
                onPress={() => setGender("Others")}
              />
              <Text>Others</Text>
            </View>
          </View>
        </View>

        <Text style={styles.label}>
          User Name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, usernameError ? styles.inputError : null]}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.label}>
          Password <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? "eye" : "eye-slash"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>
          Re-Enter Password <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Re-Enter Password"
            secureTextEntry={!showRePassword}
            value={rePassword}
            onChangeText={setRePassword}
          />
          <TouchableOpacity onPress={() => setShowRePassword(!showRePassword)}>
            <Icon
              name={showRePassword ? "eye" : "eye-slash"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.registerButton]}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4ff",
  },
  scrollContent: {
    padding: 25,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 90,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#4A6DC8",
    borderRadius: 20,
    marginTop: 4,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  loginText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffff",
    fontStyle: "italic",
  },
  label: {
    fontWeight: "bold",
  },
  required: {
    color: "red",
    fontWeight: "normal",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#DFE3EE",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputError: {
    borderColor: "red",
  },
  photoButton: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4A6DC8",
    paddingVertical: 10,
    borderRadius: 50,
    marginVertical: 20,
    paddingHorizontal: 15,
    alignSelf: "center",
    width: 170,
  },
  photoButton1: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4A6DC8",
    paddingVertical: 10,
    borderRadius: 50,
    marginVertical: 20,
    paddingHorizontal: 20,
    alignSelf: "center",
    width: 210,
  },
  photoButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
  photoButtonText1: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
  iconStyle: {
    marginRight: 10,
  },
  photoPreview: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: -15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalButton: {
    backgroundColor: "#4A6DC8",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalCancelButton: {
    backgroundColor: "#4A6DC8",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  modalCancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  genderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  genderOptions: {
    flexDirection: "row",
    marginLeft: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#4A6DC8",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  registerButton: {
    backgroundColor: "#4A6DC8",
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#DFE3EE",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
});

export default RegisterScreen;
