import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons"; // For icons
import CustomHeader from "./Header";

export default function Payment() {
  const navigation = useNavigation();
  const route = useRoute();

  // Destructure the passed params
  const { title, price, costPerReview } = route.params;

  const handleBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const handleHomeNavigation = () => {
    navigation.navigate("Dashboard");
  };

  // Handle confirm purchase action
  const handleConfirmPurchase = () => {
    console.log("Navigating to PaymentMethod with: ", {
      title,
      price,
      costPerReview,
    });
    navigation.navigate("PaymentMethodScreen");
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftComponent={
          <TouchableOpacity onPress={handleBack} style={{ marginTop: 5 }}>
            <Icon name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        }
        centerComponent={<Text style={styles.headerTitle}>Treeset</Text>}
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

      <View style={styles.content}>
        <Text style={styles.header}>Confirm Payment?</Text>
        <Text style={styles.label}>Title:</Text>
        <Text style={styles.value}>{title}</Text>

        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>{price}</Text>

        <Text style={styles.label}>Cost per Review:</Text>
        <Text style={styles.value}>{costPerReview}</Text>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmPurchase}
        >
          <Text style={styles.confirmButtonText}>Confirm Purchase</Text>
        </TouchableOpacity>
      </View>

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
    padding: 10,
  },
  header: {
    fontSize: 24,
    marginTop: -40,
    marginBottom: 25,
    fontWeight: "bold",
  },
  headerTitle: {
    color: "#1806E1",
    fontSize: 30,
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  content: {
    marginTop: 200, // Adjusted for better spacing
    padding: 20,
    backgroundColor: "#f0f4ff",
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    padding: 10, // Padding for better visual separation
    borderWidth: 1,
    borderColor: "#ccc", // Light border for visual separation
    borderRadius: 5,
    backgroundColor: "#DFE3EE",
  },
  confirmButton: {
    backgroundColor: "#4C85EB",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
    width: 220,
  },
  confirmButtonText: {
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
