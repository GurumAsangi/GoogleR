import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Linking, // Import Linking
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import CustomHeader from "./Header";

export default function PaymentMethodScreen() {
  const navigation = useNavigation();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isUPIDropdownVisible, setUPIDropdownVisible] = useState(false);
  const [upiID, setUpiID] = useState("");

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePaymentConfirmation = () => {
    if (!selectedMethod) {
      Alert.alert(
        "No Payment Method Selected",
        "Please select a payment method."
      );
    } else if (selectedMethod === "UPI ID" && !upiID.trim()) {
      Alert.alert("Enter UPI ID", "Please enter your UPI ID.");
    } else {
      Alert.alert(
        "Confirm Payment",
        `Are you sure you want to pay using ${selectedMethod}${
          selectedMethod === "UPI ID" ? ` (${upiID})` : ""
        }?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Confirm",
            onPress: () => {
              navigation.navigate("PaymentSuccess");
            },
          },
        ]
      );
    }
  };

  const openPhonePe = () => {
    const phonePeUrl = "phonepe://"; // PhonePe URL scheme
    Linking.canOpenURL(phonePeUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phonePeUrl);
        } else {
          Alert.alert(
            "PhonePe not installed",
            "Please install PhonePe to proceed."
          );
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftComponent={
          <TouchableOpacity onPress={handleBack} style={{ marginTop: 5 }}>
            <Icon name="arrow-back" size={30} />
          </TouchableOpacity>
        }
        centerComponent={<Text style={styles.headerTitle}>Treeset</Text>}
        rightComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate("NotificationScreen")}
          >
            <Icon name="notifications" size={30} color="black" />
          </TouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Select Payment Method :</Text>
        <TouchableOpacity
          style={[
            styles.methodButton,
            selectedMethod === "Credit Card" && styles.selectedMethod,
          ]}
          onPress={() => {
            setSelectedMethod("Credit Card");
            setUPIDropdownVisible(false);
          }}
        >
          <Text style={styles.methodText}>Credit Card</Text>
          <Icon name="card" size={30} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.methodButton}
          onPress={() => setUPIDropdownVisible(!isUPIDropdownVisible)}
        >
          <Text style={styles.methodText}>UPI Payments</Text>
          <Icon
            name={isUPIDropdownVisible ? "chevron-up" : "chevron-down"}
            size={30}
            color="#333"
          />
        </TouchableOpacity>
        {isUPIDropdownVisible && (
          <>
            <TouchableOpacity
              style={[
                styles.methodButton,
                selectedMethod === "PhonePe" && styles.selectedMethod,
              ]}
              onPress={openPhonePe}
            >
              <Text style={styles.methodText}>PhonePe</Text>
              <Image
                source={require("../image/Phonepe.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.methodButton,
                selectedMethod === "GPay" && styles.selectedMethod,
              ]}
              onPress={() => setSelectedMethod("GPay")}
            >
              <Text style={styles.methodText}>GPay</Text>
              <Image
                source={require("../image/GPay.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.methodButton,
                selectedMethod === "Paytm" && styles.selectedMethod,
              ]}
              onPress={() => setSelectedMethod("Paytm")}
            >
              <Text style={styles.methodText}>Paytm</Text>
              <Image
                source={require("../image/Paytm.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.methodButton,
                selectedMethod === "UPI ID" && styles.selectedMethod,
              ]}
              onPress={() => handleUPISelection("UPI ID")}
            >
              <Text style={styles.methodText}>Enter UPI ID</Text>
              <Image
                source={require("../image/UPI.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </TouchableOpacity>
            {selectedMethod === "UPI ID" && (
              <View style={styles.upiInputContainer}>
                <TextInput
                  style={styles.upiInput}
                  placeholder="Enter your UPI ID"
                  value={upiID}
                  onChangeText={setUpiID}
                />
              </View>
            )}
          </>
        )}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handlePaymentConfirmation}
        >
          <Text style={styles.confirmButtonText}>Confirm Payment</Text>
        </TouchableOpacity>
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
    paddingBottom: 55,
  },
  headerTitle: {
    color: "#1806E1",
    fontSize: 30,
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  content: {
    padding: 20,
    backgroundColor: "#f0f4ff",
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    marginTop: 100,
    marginBottom: 25,
    fontWeight: "bold",
  },
  methodButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
  },
  methodText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  logo: {
    width: 50,
    height: 30,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedMethod: {
    backgroundColor: "#c0e7ff",
  },
  upiInputContainer: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  upiInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  confirmButton: {
    backgroundColor: "#4C85EB",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 30,
    width: 220,
    alignSelf: "center",
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
