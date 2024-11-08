import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated, Easing } from 'react-native';
import CustomHeader from './Header'; // Adjust the path as necessary
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook

const OTPVerificationScreen = () => {
  const [otp, setOtp] = React.useState('');
  const [timer, setTimer] = React.useState(45); // Timer for OTP
  const [isResendAvailable, setIsResendAvailable] = React.useState(false);
  const navigation = useNavigation(); // Hook to use navigation
  const animation = React.useRef(new Animated.Value(1)).current; // Create animated value

  // Countdown for OTP Resend Timer
  React.useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setIsResendAvailable(true);
    }
  }, [timer]);

  const handleResendOTP = () => {
    if (isResendAvailable) {
      setTimer(45);
      setIsResendAvailable(false);
      // Add logic for resending OTP here
      Alert.alert('OTP Resent', 'A new OTP has been sent to your email or phone.');
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      // Start animation on success
      Animated.timing(animation, {
        toValue: 0, // Fade out
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true, // Use native driver for better performance
      }).start(() => {
        // Once the animation completes, navigate or show success message
        Alert.alert('Success', 'OTP Verified! You can reset your password now.', [
          {
            text: 'OK',
          onPress: () => {
            navigation.navigate('ResetPasswordScreen'); // Change to your reset password screen
          },
        },
      ]);
    });
  } else {
    Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
  }
  };

  // Function to handle back navigation (go to ForgotPasswordModal)
  const handleBack = () => {
    navigation.navigate('ForgotPassword'); // Ensure it navigates to the ForgotPasswordModal
  };

  return (
    <Animated.View style={[styles.container, { opacity: animation }]}>
      <CustomHeader
        leftComponent={{ 
          icon: 'arrow-back', 
          color: '#000', 
          onPress: handleBack,  // Use handleBack to navigate correctly
          size: 35, 
        }}
        centerComponent={{
          text: 'Treeset',
          style: { color: '#1806E1', fontSize: 30, fontFamily: 'sans-serif', fontStyle: 'italic', fontWeight: 'bold' },
        }}
      />
      
      <Text style={styles.header}>Verification</Text>
      <Text style={styles.subText}>
        An OTP was sent to your Phone Number or Email. Kindly enter that OTP below for verification.
      </Text>

      <View style={styles.otpContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter the OTP"
          value={otp}
          keyboardType="numeric"
          maxLength={6}
          onChangeText={setOtp}
        />
        <TouchableOpacity
          style={[styles.resendButton, isResendAvailable ? styles.activeResend : styles.disabledResend]}
          onPress={handleResendOTP}
          disabled={!isResendAvailable}
        >
          <Text style={styles.resendButtonText}>Re-send</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.timerText}>Time 00:{timer < 10 ? `0${timer}` : timer}</Text>

      <TouchableOpacity
        style={[styles.submitButton, otp.length === 6 ? {} : styles.disabledSubmitButton]} 
        onPress={handleVerifyOTP}
        disabled={otp.length !== 6} 
      >
        <Text style={styles.submitButtonText}>Reset Password</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 29,
    backgroundColor: '#f0f4ff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'center',
    color: '#000',
    marginTop: 202,
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#DFE3EE',
    position: 'relative', // Set position to relative to position the button inside
  },
  resendButton: {
    position: 'absolute', // Position it absolutely to the input
    right: 10, // Align it to the right
    top: 5, // Adjust top to center it vertically inside the input box
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  activeResend: {
    backgroundColor: '#4A6DC8',
  },
  disabledResend: {
    backgroundColor: '#b0c4de',
  },
  resendButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'italic',

  },
  timerText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginLeft:250,
    marginTop:-10,
    marginVertical: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',

  },
  submitButton: {
    backgroundColor: '#4A6DC8',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  disabledSubmitButton: {
    backgroundColor: '#b0c4de', // Grey color for disabled state
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OTPVerificationScreen;
