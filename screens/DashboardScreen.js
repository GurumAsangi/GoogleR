import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CustomHeader from "./Header";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, DrawerActions } from "@react-navigation/native";

// Sample item data
const itemData = [
  {
    img: require("../image/Buy Reviews.png"),
    title: "Buy Reviews",
  },
  {
    img: require("../image/shop.png"),
    title: "Shop",
  },
  {
    img: require("../image/MyBusiness.png"),
    title: "My Business",
  },
  {
    img: require("../image/Order.png"),
    title: "Orders",
  },
];

export default function DashboardScreen() {
  const navigation = useNavigation();

  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleItemPress = (title) => {
    switch (title) {
      case "Buy Reviews":
        navigation.navigate("BuyReviewsScreen");
        break;
      case "Shop":
        navigation.navigate("AddReviews");
        break;
      case "My Business":
        navigation.navigate("MyBusinessScreen");
        break;
      case "Orders":
        navigation.navigate("OrdersScreen");
        break;
      default:
        break;
    }
  };

  // Rendering each item in the FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item.title)}>
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Image source={item.img} style={styles.image} />
        </View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Custom header component with Drawer toggle */}
      <CustomHeader
        leftComponent={
          <TouchableOpacity onPress={handleOpenDrawer}>
            <Icon name="menu" size={30} />
          </TouchableOpacity>
        }
        centerComponent={<Text style={styles.logoText}>Treeset</Text>}
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

      {/* FlatList for dashboard items */}
      <FlatList
        data={itemData}
        renderItem={renderItem}
        keyExtractor={(item) => item.img}
        numColumns={2}
        contentContainerStyle={styles.imageList}
      />

      {/* Bottom navigation tab */}
      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="home" size={30} color="blue" />
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

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4ff",
    padding: 10,
    paddingTop: 150,
  },
  logoText: {
    color: "#1806E1",
    fontSize: 30,
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  imageList: {
    paddingTop: 40,
    justifyContent: "center",
  },
  itemContainer: {
    alignItems: "center",
    flex: 1,
    margin: 10,
  },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    padding: 5,
    overflow: "hidden",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
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
  shopIconContainer: {
    marginRight: 10,
  },
});
