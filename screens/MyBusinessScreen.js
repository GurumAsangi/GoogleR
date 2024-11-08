import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomHeader from "./Header";

// Initial sample data
const initialBusinessData = [
  {
    id: "1",
    title: "Soumya Reddy PG",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcX_rWThru-FWIExtbRt4WALX0vDEpY6hITA&s",
  },
  { id: "2", title: "Soumya Reddy PG 2", img: "https://your-image-url-2.com" },
  { id: "3", title: "Gym", img: "https://your-image-url-3.com" },
  { id: "4", title: "Hotel", img: "https://your-image-url-4.com" },
  // Add more items as needed
];

export default function MyBusinessScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [businessData, setBusinessData] = useState(initialBusinessData);

  // Listen for new business added from FillDetails screen
  useEffect(() => {
    if (route.params?.newBusiness) {
      setBusinessData((prevData) => [...prevData, route.params.newBusiness]);
    }
  }, [route.params?.newBusiness]);

  const renderItem = ({ item }) => (
    <View style={styles.itemWrapper}>
      <TouchableOpacity style={styles.itemContainer}>
        <Image source={{ uri: item.img }} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.itemTitle}>{item.title}</Text>
    </View>
  );

  const handleHomeNavigation = () => {
    navigation.navigate("Dashboard");
  };

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

      <FlatList
        data={businessData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("FillDetailsScreen")}
      >
        <Icon name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={handleHomeNavigation}>
          <Icon name="home" size={28} color="black" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("MyBusinessScreen")}
        >
          <Icon name="business" size={28} color="#1A73E8" />
          <Text style={[styles.navText, { color: "#1A73E8" }]}>
            My Business
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("AddReviews")}
        >
          <Icon name="storefront" size={28} color="black" />
          <Text style={styles.navText}>Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <Icon name="person" size={28} color="black" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#f0f4ff",
  },
  itemWrapper: {
    flex: 1,
    margin: 5,
    alignItems: "center",
  },
  itemContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 160,
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8, // Add some space between the image and the title
  },
  grid: {
    padding: 10,
    marginTop: 80,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 70,
    backgroundColor: "#1A73E8",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f0f4ff",
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
