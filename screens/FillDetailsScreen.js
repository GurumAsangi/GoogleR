import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import CustomHeader from "./Header";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import ActionSheet from "react-native-actions-sheet";

export default function FillDetails({ navigation, route }) {
  const {
    ownerNameProp = "Navaneeth",
    businessNameProp = "Navaneeth",
    phoneNumberProp = "7894561235",
    businessTypeProp = "",
  } = route.params || {}; // Use fallback to prevent errors

  const [businessType, setBusinessType] = useState(businessTypeProp);
  const [otherBusinessType, setOtherBusinessType] = useState("");
  const [ownerName, setOwnerName] = useState(ownerNameProp);
  const [businessName, setBusinessName] = useState(businessNameProp);
  const [phoneNumber, setPhoneNumber] = useState(phoneNumberProp);
  const [photoAdded, setPhotoAdded] = useState(false);
  const [photo, setPhoto] = useState(null);
  const actionSheetRef = useRef();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleHomeNavigation = () => {
    navigation.navigate("Dashboard");
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
          allowsEditing: true,
          aspect: [1, 1],
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
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
        setPhotoAdded(true);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("An error occurred while picking the image.");
    }
  };

  const handleCancel = () => {
    setPhoto(null); // Reset the photo
    setPhotoAdded(false); // Reset the photo added state
    actionSheetRef.current?.setModalVisible(false); // Close the action sheet
  };

  const handleSubmit = () => {
    if (
      !businessType ||
      (businessType === "others" && !otherBusinessType) ||
      !ownerName ||
      !businessName ||
      !phoneNumber ||
      !photoAdded
    ) {
      Alert.alert("Error", "All fields are required, .");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number.");
      return;
    }

    const formData = {
      businessType:
        businessType === "others" ? otherBusinessType : businessType,
      ownerName,
      businessName,
      phoneNumber,
    };

    console.log("Form submitted with:", formData);
    Alert.alert("Success", "Form submitted successfully!", [
      {
        text: "OK",
        onPress: () => {
          navigation.navigate("NextScreen"); // Adjust as needed
        },
      },
    ]);
  };

  const showActionSheet = () => {
    actionSheetRef.current?.setModalVisible(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <CustomHeader
        leftComponent={
          <TouchableOpacity onPress={handleBack} style={{ marginTop: 5 }}>
            <Icon name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        }
        centerComponent={<Text style={styles.headerText}>Treeset</Text>}
        rightComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate("NotificationScreen")}
          >
            <Icon
              name="notifications"
              size={30}
              color="black"
              paddingHorizontal={15}
              marginTop={8}
            />
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent} 
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>
          Business Type <Text style={styles.asterisk}>*</Text>
        </Text>
        <Picker
          selectedValue={businessType}
          style={styles.input}
          onValueChange={(itemValue) => setBusinessType(itemValue)}
        >
          <Picker.Item label="Select from dropdown" value="" />
          <Picker.Item label="PG" value="pg" />
          <Picker.Item label="Restaurants" value="restaurants" />
          <Picker.Item label="Hotels" value="hotels" />
          <Picker.Item label="Gym" value="gym" />
          <Picker.Item label="Others" value="others" />
        </Picker>

        {businessType === "others" && (
          <>
            <Text style={styles.label}>
              Specify Others <Text style={styles.asterisk}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter other business type"
              value={otherBusinessType}
              onChangeText={setOtherBusinessType}
            />
          </>
        )}

        <Text style={styles.label}>
          Owner Name <Text style={styles.asterisk}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter owner name"
          value={ownerName}
          onChangeText={setOwnerName}
        />

        <Text style={styles.label}>
          Business ReviewLink <Text style={styles.asterisk}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter business name"
          value={businessName}
          onChangeText={setBusinessName}
        />

        <Text style={styles.label}>
          Phone Number <Text style={styles.asterisk}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <Text style={styles.label}>
          Add Photo <Text style={styles.asterisk}>*</Text>
        </Text>
        <TouchableOpacity style={styles.photoButton} onPress={showActionSheet}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <>
              <Icon name="add" size={30} color="#4A6DC8" />
              <Text>{photoAdded ? "Photo Added" : "Add Photo"}</Text>
            </>
          )}
        </TouchableOpacity>

        <ActionSheet ref={actionSheetRef}>
          <View style={{ padding: 20 }}>
            <Text style={styles.actionSheetTitle}>Choose Photo From</Text>
            <TouchableOpacity
              style={styles.actionSheetOption}
              onPress={() => {
                handlePhotoUpload("camera");
                actionSheetRef.current?.setModalVisible(false);
              }}
            >
              <Text>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionSheetOption}
              onPress={() => {
                handlePhotoUpload("gallery");
                actionSheetRef.current?.setModalVisible(false);
              }}
            >
              <Text>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionSheetCancel}
              onPress={handleCancel}
            >
              <Text style={{ color: "red" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ActionSheet>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabItem} onPress={handleHomeNavigation}>
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4ff",
    paddingTop: 105,
  },
  scrollView: {
    flexGrow: 1,
  },
  scrollViewContent: {
    paddingBottom: 55, 
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 5,
  },
  asterisk: {
    color: "red",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#DFE3EE",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  photoButton: {
    backgroundColor: "#E0ECF8",
    padding: 30,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: "center",
    height: 160,
    width: 160,
    alignSelf: "center",
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: "#4A6DC8",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
    alignSelf: "center",
    width: 140,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  actionSheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  actionSheetOption: {
    paddingVertical: 10,
  },
  actionSheetCancel: {
    marginTop: 20,
    alignItems: "center",
  },
  headerText: {
    color: "#1806E1",
    fontSize: 30,
    fontFamily: "sans-serif",
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
