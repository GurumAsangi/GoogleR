import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CustomHeader from "./Header";
import { UserContext } from "./UserContext";

import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const { userDetails, setUserDetails } = useContext(UserContext);

  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState(
    userDetails.profileImage || ""
  );
  useEffect(() => {
    setName(userDetails.name);
    setUserId(userDetails.userId);
    setEmail(userDetails.email);
    setPhone(userDetails.phone);
    setProfileImage(userDetails.profileImage);
  }, [userDetails]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };
  const handleUpdate = () => {
    setUserDetails({ name, userId, email, phone, profileImage });
    Alert.alert("Success", "Profile updated successfully!", [{ text: "OK" }]);
    navigation.goBack();
  };
  const handleImagePicker = () => {
    Alert.alert("Select Profile Picture", "Choose an option", [
      { text: "Camera", onPress: takePhoto },
      { text: "Gallery", onPress: pickImage },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        }
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
            onPress={() => navigation.navigate("NotificationScreen")}
          >
            <Icon name="notifications" size={30} color="black" />
          </TouchableOpacity>
        }
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.profileContainer}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("../image/Default.png")
              }
              style={styles.profileImage}
            />
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={handleImagePicker}
            >
              <Icon name="add-circle" size={40} color="#4A6DC8" />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                />
                <Icon name="pencil-outline" size={20} color="#888" />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>User Id</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={userId}
                  onChangeText={setUserId}
                  placeholder="Enter your user ID"
                />
                <Icon name="pencil-outline" size={20} color="#888" />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                />
                <Icon name="pencil-outline" size={20} color="#888" />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                />
                <Icon name="pencil-outline" size={20} color="#888" />
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.bottomTab}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Icon name="home" size={30} color="black" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("MyBusinessScreen")}
        >
          <Icon name="business" size={30} color="black" />
          <Text style={styles.tabLabel}>My Business</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("AddReviews")}
        >
          <Icon name="storefront" size={30} color="black" />
          <Text style={styles.tabLabel}>Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <Icon name="person" size={30} color="black" />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4ff",
  },
  scrollContent: {
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
    marginTop: 90,
    borderWidth: 4,
    borderColor: "#4C85EB",
    borderRadius: 100,
    width: 150,
    height: 170,
    padding: 5,
  },
  profileImage: {
    width: 150,
    height: 170,
    marginTop: -9,
    borderRadius: 75,
  },
  editIconContainer: {
    position: "absolute",
    right: -5,
    bottom: 130,
    borderRadius: 50,
    padding: 5,
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: "#000",
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DFE3EE",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  updateButton: {
    backgroundColor: "#4285F4",
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    alignSelf: "center",
    width: 130,
    marginVertical: 20,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomTab: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f0f4ff",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  tabItem: {
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 12,
    color: "black",
  },
});

export default EditProfileScreen;
