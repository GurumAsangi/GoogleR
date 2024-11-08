import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import CustomHeader from "./Header";
import { useOrders } from "./OrderContext";

export default function AddReviews() {
  const navigation = useNavigation();
  const { addOrder } = useOrders();

  const reviewPackages = [
    {
      title: "10 Reviews Package",
      price: "₹ 700",
      details: "No.of Reviews-10, Cost per Review - ₹ 70",
      costPerReview: "₹ 70",
    },
    {
      title: "20 Reviews Package",
      price: "₹ 1300",
      details: "No.of Reviews-50, Cost per Review - ₹ 65",
      costPerReview: "₹ 65",
    },
    {
      title: "50 Reviews Package",
      price: "₹ 3000",
      details: "No.of Reviews-100, Cost per Review - ₹ 60",
      costPerReview: "₹ 60",
    },
    {
      title: "100 Reviews Package",
      price: "₹ 5500",
      details: "No.of Reviews-150, Cost per Review - ₹ 55",
      costPerReview: "₹ 55",
    },
    {
      title: "200 Reviews Package",
      price: "₹ 10,000",
      details: "No.of Reviews-150, Cost per Review - ₹ 50",
      costPerReview: "₹ 50",
    },
    {
      title: "500 Reviews Package",
      price: "₹ 22,500",
      details: "No.of Reviews-150, Cost per Review - ₹ 45",
      costPerReview: "₹ 45",
    },
  ];

  const handleBuy = (title, price, costPerReview) => {
    const newOrder = {
      id: `#${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      title,
      price,
      costPerReview,
      date: new Date().toLocaleDateString(),
      status: "New", // Ensure status is set to "New"
    };

    addOrder(newOrder); // Add the order to context
    navigation.navigate("Confirm", { title, price, costPerReview }); // Navigate to confirmation screen after purchase
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftComponent={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginTop: 5 }}
          >
            <Icon name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        }
        centerComponent={<Text style={styles.headerTitle}>Treeset</Text>}
        rightComponent={
          <TouchableOpacity>
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

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {reviewPackages.map((pkg, index) => (
          <Card style={index === 0 ? styles.card : styles.card1} key={index}>
            <Card.Content>
              <Title>{pkg.title}</Title>
              <Paragraph>{pkg.price}</Paragraph>
              <Paragraph>{pkg.details}</Paragraph>
              <Paragraph style={styles.cancellationText}>
                Cancellation is Not Available
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button
                style={styles.buyButton}
                labelStyle={styles.buyButtontext}
                onPress={() =>
                  handleBuy(pkg.title, pkg.price, pkg.costPerReview)
                }
              >
                Buy
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>

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
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="storefront" size={30} color="blue" />
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
    paddingTop: 10,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  headerTitle: {
    color: "#1806E1",
    fontSize: 30,
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  card: {
    marginTop: 100,
    paddingBottom: 0,
    backgroundColor: "#f0f4ff",
  },
  card1: {
    marginTop: 10,
    paddingTop: 1,
    backgroundColor: "#f0f4ff",
  },
  cancellationText: {
    color: "red",
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
  buyButton: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30,
  },
  buyButtontext: {
    color: "#fff",
  },
});
