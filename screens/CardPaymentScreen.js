import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import CustomHeader from "./Header";

export default function CardPaymentScreen() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [cardType, setCardType] = useState("");
  const navigation = useNavigation();

  const handleCardNumberChange = (number) => {
    setCardNumber(number);
    detectCardType(number);
  };

  const detectCardType = (number) => {
    const visaRegEx = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const masterCardRegEx = /^5[1-5][0-9]{14}$/;
    const maestroRegEx = /^50[0-9]{14}$/;
    const rupayRegEx = /^(60|65|81)[0-9]{14}$/;

    if (visaRegEx.test(number)) {
      setCardType("Visa (credit or debit)");
    } else if (masterCardRegEx.test(number)) {
      setCardType("MasterCard (credit or debit)");
    } else if (maestroRegEx.test(number)) {
      setCardType("Maestro (debit)");
    } else if (rupayRegEx.test(number)) {
      setCardType("RuPay (debit)");
    } else {
      setCardType("");
    }
  };

  const handleExpiryDateChange = (text) => {
    let cleanedText = text.replace(/\D/g, "");
    if (cleanedText.length === 1 && parseInt(cleanedText) > 1) {
      cleanedText = `0${cleanedText}`;
    }
    let formattedText = cleanedText;
    if (cleanedText.length >= 3) {
      formattedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2)}`;
    }
    setExpiryDate(formattedText);
  };

  const handlePayment = () => {
    if (!cardNumber || !expiryDate || !cvv) {
      Alert.alert("Missing Information", "Please fill out all fields.");
      return;
    }
    const [month, year] = expiryDate.split("/");
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (!month || !year || month < 1 || month > 12) {
      Alert.alert("Invalid Expiry Date", "Please enter a valid expiry date.");
      return;
    }
    if (year < currentYear || (year == currentYear && month < currentMonth)) {
      Alert.alert(
        "Expired Card",
        "Your card is expired. Please use a valid card."
      );
      return;
    }
    Alert.alert("Payment Successful", "Your payment was successful!");
    navigation.navigate("PaymentSuccess");
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // Get the card logo based on card type
  const getCardLogo = () => {
    switch (cardType) {
      case "Visa (credit or debit)":
        return (
          <Image
            source={require("../image/Visa.png")}
            style={styles.cardLogo}
            resizeMode="contain"
          />
        );
      case "MasterCard (credit or debit)":
        return (
          <Image
            source={require("../image/MasterCard.png")}
            style={styles.cardLogo}
            resizeMode="contain"
          />
        );
      case "Maestro (debit)":
        return (
          <Image
            source={require("../image/Maestro.png")}
            style={styles.cardLogo}
            resizeMode="contain"
          />
        );
      case "RuPay (debit)":
        return (
          <Image
            source={require("../image/Rupay.png")}
            style={styles.cardLogo}
            resizeMode="contain"
          />
        );
      default:
        return null;
    }
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
      <Text style={styles.header}>Card Payments</Text>

      <Text style={styles.acceptedCardsText}>
        We accept Credit and Debit Cards from Visa, Mastercard, RuPay, Maestro.
      </Text>
      {/* Card Number with Card Type */}
      <View style={styles.cardNumberContainer}>
        <TextInput
          style={styles.cardNumberInput}
          placeholder="Card Number"
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={handleCardNumberChange}
          maxLength={16}
        />
        {cardType && getCardLogo()}
      </View>

      <View style={styles.row}>
        <TextInput
          placeholder="MM / YY"
          style={[styles.input, styles.halfInput, styles.marginRight]}
          value={expiryDate}
          onChangeText={handleExpiryDateChange}
          keyboardType="numeric"
          maxLength={5}
        />
        <TextInput
          placeholder="CVV"
          style={[styles.input, styles.halfInput]}
          keyboardType="numeric"
          secureTextEntry
          value={cvv}
          onChangeText={setCVV}
          maxLength={3}
        />
      </View>
      <TextInput placeholder="Cardholder Name" style={styles.input} />
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
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
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f0f4ff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  acceptedCardsText: {
    marginBottom: 25,
    fontSize: 17,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#DFE3EE",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    alignSelf: "center",
    width: 150,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  cardNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#DFE3EE",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  cardNumberInput: {
    flex: 1,
    paddingRight: 10,
  },
  cardLogo: {
    width: 40, // Adjust width as needed
    height: 25, // Adjust height as needed
    marginLeft: 10,
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
