import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomHeader from "./Header";
import { useOrders } from "./OrderContext";
import OrderTrackingProgressBar from "./OrderTrackingProgressBar"; // Make sure to import the progress bar component

const OrderTrackingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params;
  const { orders } = useOrders();

  // Find the order details by orderId
  const order = orders.find((o) => o.id === orderId);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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

      {/* Order Details */}
      {order ? (
        <View style={styles.orderInfo}>
          <Text style={styles.orderTitle}>Order ID: {order.id}</Text>
          <Text style={styles.orderDetails}>Title: {order.title}</Text>
          <Text style={styles.orderDetails}>Price: ${order.price}</Text>
          <Text style={styles.orderDetails}>Order Date: {order.date}</Text>

          {/* Track Your Order Progress Bar */}
          <View style={styles.progressBarContainer}>
            <OrderTrackingProgressBar />
          </View>
        </View>
      ) : (
        <Text style={styles.errorText}>Order not found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4ff",
    paddingTop: 10,
  },
  orderInfo: {
    padding: 20,
    backgroundColor: "#add8e6",
    margin: 10,
    borderRadius: 10,
    marginTop: 90,
  },
  orderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  orderDetails: {
    fontSize: 16,
    color: "gray",
    marginTop: 5,
  },
  progressBarContainer: {
    marginTop: 20,
  },
  errorText: {
    textAlign: "center",
    fontSize: 18,
    color: "red",
    marginTop: 20,
  },
});

export default OrderTrackingScreen;
