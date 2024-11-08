import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import CustomHeader from "./Header";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function Confirm({ route }) {
  const navigation = useNavigation();

  // Destructure title, price, and costPerReview from route params
  const { title, price, costPerReview } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePaymentNavigation = () => {
    navigation.navigate("Payment", { title, price, costPerReview });
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

      <Text style={styles.instructionText}>
        <Text style={styles.required}>* </Text>
        Fill Details and Select Add Reviews before Clicking Buy Reviews.
      </Text>

      <View style={styles.fillDetailsContainer}>
        <Text style={styles.fillDetailsText}>Fill Details</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="checkmark-sharp" size={25} color="#01C865" />
        </TouchableOpacity>
      </View>

      <View style={styles.fillDetailsContainer}>
        <Text style={styles.fillDetailsText}>Add Reviews</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="checkmark-sharp" size={25} color="#01C865" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.buyButton}
        onPress={handlePaymentNavigation}
      >
        <Text style={styles.buyButtonText}>Buy Reviews</Text>
      </TouchableOpacity>

      <View style={styles.selectedPackageContainer}>
        <Text style={styles.selectedPackageTitle}>Selected Package:</Text>
        <Text style={styles.selectedPackageText}>{title}</Text>
        <Text style={styles.selectedPackagePrice}>{price}</Text>
        <Text style={styles.selectedPackageCost}>
          Cost per Review: {costPerReview}
        </Text>
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
    padding: 20,
  },
  headerTitle: {
    color: "#1806E1",
    fontSize: 30,
    fontFamily: "sans-serif",
    fontWeight: "bold",
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
    backgroundColor: "#4C85EB",
    paddingHorizontal: 20,
  },
  fillDetailsText: {
    fontSize: 16,
    color: "#fff",
  },
  iconButton: {
    backgroundColor: "transparent",
  },
  buyButton: {
    backgroundColor: "#4C85EB",
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
  selectedPackageContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#e1f5fe",
    borderRadius: 10,
  },
  selectedPackageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  selectedPackageText: {
    fontSize: 16,
    color: "#555",
  },
  selectedPackagePrice: {
    fontSize: 16,
    color: "#555",
    fontWeight: "bold",
  },
  selectedPackageCost: {
    fontSize: 16,
    color: "#555",
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
