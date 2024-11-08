import React, { useState } from 'react';
import CustomHeader from './Header';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import the icon library
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const ForgotPasswordModal = ({ visible, onClose }) => {
  const navigation = useNavigation(); // Use navigation for page transitions
  const [input, setInput] = useState('');

  // Function to handle back navigation
  const handleBack = () => {
    onClose(); // Close the modal first
    setTimeout(() => {
      navigation.navigate('Login'); // Navigate to Login after the modal closes
    }, 0);
  };

  // Function to handle password reset request
  const handleForgotPassword = () => {
    if (!input) {
      Alert.alert('Invalid Input', 'Please enter your registered email or phone number.');
    } else if (!validateInput(input)) {
      Alert.alert('Invalid Input', 'Please enter a valid email address or a phone number to reset the password.');
    } else {
      Alert.alert('Password Reset', `An OTP has been sent to ${input}.`);
      setInput(''); // Clear the input
      // Optionally close the modal or navigate
      // onClose(); // Uncomment if you want to close the modal
      navigation.navigate('OTPVerificationScreen', { input }); // Navigate to OTPPage after closing modal
    }
  };

  // Function to validate email or phone number format
  const validateInput = (input) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    const phonePattern = /^\d{10}$/; // Phone number regex for exactly 10 digits
    return emailPattern.test(input) || phonePattern.test(input);
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent={true} // Make the modal background transparent
    >
      <View style={styles.modalBackground}>
        <CustomHeader
          leftComponent={{
            icon: 'arrow-back',
            color: '#000',
            onPress: handleBack, // Use handleBack to navigate correctly
            size: 35, // Adjust the margin as needed
          }}
          centerComponent={{
            text: 'Treeset',
            style: { color: '#1806E1', fontSize: 30, fontFamily: 'sans-serif', fontStyle: 'italic', fontWeight: 'bold' },
          }}
        />
        <ScrollView contentContainerStyle={styles.modalView}>
          <Text style={styles.modalTitle}>Forgot Password?</Text>
          <Text style={styles.modalText}>
            Enter your registered email or phone number to reset your password:
          </Text>

          <Text style={styles.inputLabel}>
            Email or Phone Number: <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder='Email or Phone Number'
            value={input}
            onChangeText={setInput}
            keyboardType="default" // Allow both email and phone inputs
            autoCompleteType="off" // Disable autocomplete for better UX
            textContentType="emailAddress" // Suggests email keyboard
          />

          <TouchableOpacity style={styles.modalButton} onPress={handleForgotPassword}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: '#f0f4ff', // Light background color
    justifyContent: 'center', // Center the modal view
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#f0f4ff',
    margin: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    borderRadius: 10,
  },
 
  backButton: {
    marginRight: 10,
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'blue',
    fontStyle: 'italic',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 170, // Adjust to create space below the header
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'absolute',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  required: {
    color: 'red',
    fontWeight: 'normal',
  },
  input: {
    height: 50,
    width: 325,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#DFE3EE',
  },
  modalButton: {
    backgroundColor: '#4A6DC8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'italic',
  },
});

export default ForgotPasswordModal;
