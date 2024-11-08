import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CustomHeader from './Header'; // Adjust the path as necessary
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const [showRePassword, setShowRePassword] = useState(false); // State for showing re-enter password
  const navigation = useNavigation(); // Hook to enable navigation

  // Password validation function
  const validatePassword = (password) => {
    const minLength = /.{8,}/; // At least 8 characters
    const upperCase = /[A-Z]/; // At least one uppercase letter
    const number = /[0-9]/; // At least one digit
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character

    if (!minLength.test(password)) {
      return 'Password must be at least 8 characters long';
    } else if (!upperCase.test(password)) {
      return 'Password must contain at least one uppercase letter';
    } else if (!number.test(password)) {
      return 'Password must contain at least one number';
    } else if (!specialChar.test(password)) {
      return 'Password must contain at least one special character';
    }
    return null;
  };

  const handleSubmit = () => {
    // Check if both fields are filled
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill all the required details'); // Alert if any field is empty
      return;
    }
  
    const validationError = validatePassword(newPassword);
  
    if (validationError) {
      Alert.alert('Invalid Password', validationError);
    } else if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
    } else {
      // Handle password reset logic
      Alert.alert('Success', 'Password successfully reset');
      navigation.navigate('Login'); // After password reset, navigate to login or another screen
    }
  };
  

  const handleBack = () => {
    navigation.navigate('Login'); // Ensure it navigates to the login screen or the appropriate screen
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftComponent={{ 
          icon: 'arrow-back', 
          color: '#000', 
          onPress: handleBack,  // Use handleBack to navigate back
          size: 35, 
        }}
        centerComponent={{
          text: 'Treeset',
          style: { color: '#1806E1', fontSize: 30, fontFamily: 'sans-serif', fontStyle: 'italic', fontWeight: 'bold' },
        }}
      />
      <Text style={styles.title}>Reset Password</Text>

      <Text style={styles.label}>
        Enter New Password <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          secureTextEntry={!showPassword} // Toggle visibility based on state
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
          <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>
        Re-Enter New Password <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Re-enter new password"
          secureTextEntry={!showRePassword} // Toggle visibility based on state
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowRePassword(!showRePassword)} style={styles.iconContainer}>
          <Icon name={showRePassword ? 'eye' : 'eye-slash'} size={20} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f4ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'absolute',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  required: {
    color: 'red',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#DFE3EE',
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: '#3c6fc8',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center', 
    width:150
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResetPasswordScreen;
