import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { UserContext } from "./UserContext";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "./Header";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { userDetails } = useContext(UserContext);

  const handleEditProfile = () => {
    navigation.navigate("EditProfileScreen");
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        }
        centerComponent={<Text style={styles.logoText}>Treeset</Text>}
        rightComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate("NotificationScreen")}
          >
            <Icon name="notifications" size={30} color="black" />
          </TouchableOpacity>
        }
      />

      <View style={styles.profileContainer}>
        <Image
          source={
            userDetails.profileImage
              ? { uri: userDetails.profileImage }
              : require("../image/Default.png")
          }
          style={styles.profileImage}
          onError={() => console.log("Image loading failed")}
        />
        <Text style={styles.userName}>{userDetails.name || "User Name"}</Text>
        <Text style={styles.userHandle}>User ID: {userDetails.userId}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Icon name="home" size={28} color="black" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("MyBusinessScreen")}
        >
          <Icon name="business" size={28} color="black" />
          <Text style={styles.navText}>My Business</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("AddReviews")}
        >
          <Icon name="storefront" size={28} color="black" />
          <Text style={styles.navText}>Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="person" size={28} color="#1A73E8" />
          <Text style={[styles.navText, { color: "#1A73E8" }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4ff",
    paddingTop: 20,
  },
  logoText: {
    color: "#1806E1",
    fontSize: 30,
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 100,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  userHandle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 25,
  },
  button: {
    backgroundColor: "#4285F4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    alignItems: "center",
    width: 200,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f0f4ff",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
});
