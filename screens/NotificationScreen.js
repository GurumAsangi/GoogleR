import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CustomHeader from "./Header";
import Icon from "react-native-vector-icons/Ionicons";

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetch notifications from the backend
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "https://your-backend-api.com/notifications" // Ensure this URL is correct
        );

        // Check if response is okay
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("Failed to load notifications."); // Set error message
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    fetchNotifications();
  }, []);

  const renderNotification = ({ item }) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationHeader}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDate}>{item.date}</Text>
      </View>
      <Text style={styles.notificationMessage}>{item.message}</Text>
    </View>
  );

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
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id.toString()} // Ensure unique keys
          contentContainerStyle={styles.notificationList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4ff",
  },
  headerTitle: {
    color: "#1806E1",
    fontSize: 30,
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  notificationList: {
    padding: 15,
    marginTop: 90,
  },
  notificationItem: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  notificationDate: {
    fontSize: 12,
    color: "#999",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#666",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
  },
});

export default NotificationScreen;
