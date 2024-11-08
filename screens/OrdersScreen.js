import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "./Header";
import { useOrders } from "./OrderContext";

const OrdersScreen = () => {
  const navigation = useNavigation();
  const { orders } = useOrders();
  const [activeTab, setActiveTab] = useState("New Orders");

  const newOrders = orders.filter((order) => order.status === "New");
  const oldOrders = orders.filter((order) => order.status === "Old");

  const handleBack = () => {
    navigation.goBack();
  };

  const handleHomeNavigation = () => {
    navigation.navigate("Dashboard");
  };

  const handleTrackOrder = (orderId) => {
    navigation.navigate("OrderTrackingScreen", { orderId });
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderText}>Order Id: {item.id}</Text>
      <Text style={styles.orderText}>Title: {item.title}</Text>
      <Text style={styles.orderText}>Price: {item.price}</Text>
      <Text style={styles.orderText}>Order Date: {item.date}</Text>
      <TouchableOpacity
        style={styles.trackButton}
        onPress={() => handleTrackOrder(item.id)}
      >
        <Text style={styles.trackButtonText}>Track</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === "New Orders" && styles.activeTab]}
        onPress={() => setActiveTab("New Orders")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "New Orders" && styles.activeTabText,
          ]}
        >
          New Orders
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === "Old Orders" && styles.activeTab]}
        onPress={() => setActiveTab("Old Orders")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "Old Orders" && styles.activeTabText,
          ]}
        >
          Old Orders
        </Text>
      </TouchableOpacity>
    </View>
  );

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

      {/* Header for Tabs */}
      {renderHeader()}

      {/* FlatList for New Orders */}
      {activeTab === "New Orders" && (
        <FlatList
          data={newOrders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
        />
      )}

      {/* FlatList for Old Orders */}
      {activeTab === "Old Orders" && (
        <FlatList
          data={oldOrders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
        />
      )}

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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4ff",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#f0f4ff",
    borderBottomWidth: 0.5,
    marginTop: 90,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: "#add8e6",
  },
  tabText: {
    fontSize: 16,
    color: "gray",
  },
  activeTabText: {
    color: "black",
    fontWeight: "bold",
  },
  orderCard: {
    backgroundColor: "#add8e6",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  orderText: {
    fontSize: 16,
    color: "black",
  },
  trackButton: {
    marginTop: -30,
    backgroundColor: "#4A6DC8",
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
    width: 70,
    alignSelf: "flex-end",
  },
  trackButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  flatListContent: {
    paddingBottom: 100,
  },
  bottomTab: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f0f4ff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 12,
    color: "black",
  },
});

export default OrdersScreen;
