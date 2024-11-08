import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomHeader from "./Header"; // Assuming you're using a custom header component
import Icon from "react-native-vector-icons/Ionicons"; // For icons
import { useNavigation } from "@react-navigation/native";

export default function BuyReviewsScreen() {
  const navigation = useNavigation(); // Access navigation

  // Go back to the previous screen (DashboardScreen)
  const handleBack = () => {
    navigation.goBack();
  };

  // Navigate to the Fill Details screen
  const handleFillDetailsNavigation = () => {
    navigation.navigate("FillDetailsScreen");
  };

  // Navigate to the Dashboard screen (Home)
  const handleHomeNavigation = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <View style={styles.container}>
      {/* Custom header with new props */}
      <CustomHeader
        leftComponent={
          <TouchableOpacity onPress={handleBack} style={{ marginTop: 5 }}>
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
            <View style={styles.shopIconContainer}>
              <Icon
                name="notifications"
                size={30}
                color="black"
                paddingHorizontal={15}
                marginTop={8}
              />
            </View>
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
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleFillDetailsNavigation}
        >
          <Icon name="add-circle-outline" size={25} color="white" />
        </TouchableOpacity>
      </View>

      {/* Add Reviews Section */}
      <View style={styles.fillDetailsContainer}>
        <Text style={styles.fillDetailsText}>Add Reviews</Text>
        <TouchableOpacity style={styles.iconButton}>
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
  buyButton: {
    backgroundColor: "#AAC4FA",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginVertical: 20,
    alignSelf: "center",
    width: 170,
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
