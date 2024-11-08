import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomHeader from "./Header";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function NextScreen({ route }) {
  const navigation = useNavigation(); // Access navigation here

  const handleBack = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  const handleAddReviewsNavigation = () => {
    navigation.navigate("AddReviews"); // Navigate to the AddReviews screen
  };

  const handleHomeNavigation = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftComponent={
          <TouchableOpacity onPress={handleBack} style={{ marginTop: 5 }}>
            <Icon name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        }
        centerComponent={
          <Text
            style={{
              color: "#1806E1",
              fontSize: 30,
              fontFamily: "sans-serif",
              fontWeight: "bold",
            }}
          >
            Treeset
          </Text>
        }
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

      {/* Instruction Text */}
      <Text style={styles.instructionText}>
        <Text style={styles.required}>* </Text>
        Fill Details and Select Add Reviews before Clicking Buy Reviews.
      </Text>

      {/* Fill Details Section */}
      <View style={styles.fillDetailsContainer}>
        <Text style={styles.fillDetailsText}>Fill Details</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="checkmark-sharp" size={25} color="#01C865" />
        </TouchableOpacity>
      </View>

      {/* Add Reviews Section */}
      <View style={styles.fillDetailsContainer}>
        <Text style={styles.fillDetailsText}>Add Reviews</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleAddReviewsNavigation}
        >
          <Icon name="add-circle-outline" size={25} color="white" />
        </TouchableOpacity>
      </View>

      {/* Buy Reviews Button */}
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Buy Reviews</Text>
      </TouchableOpacity>

      {/* Bottom Tab Navigator */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4ff",
    padding: 20,
  },

  instructionText: {
    fontSize: 14,
    color: "black",
    marginTop: 150,
  },
  required: {
    color: "red",
  },
  fillDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#4C85EB", // Background color for the container
    paddingHorizontal: 20,
  },
  fillDetailsText: {
    fontSize: 16,
    color: "#fff",
  },
  iconButton: {
    backgroundColor: "transparent", // No background color for icon button
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4C85EB",
    padding: 15,
    marginTop: 25,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  buyButton: {
    backgroundColor: "#AAC4FA",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    alignSelf: "center",
    width: 150,
    marginVertical: 20,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 18,
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
