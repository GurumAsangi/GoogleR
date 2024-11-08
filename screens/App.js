import React from "react";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { OrderProvider } from "./OrderContext";
import { UserProvider } from "./UserContext"; // Update with the actual path to UserContext
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createDrawerNavigator, DrawerActions } from "@react-navigation/drawer";

import LogoScreen from "./Logo";
import Home from "./Home"; // Assuming you have Main.js in the same directory
import LoginScreen from "./Login";
import RegisterScreen from "./Register";
import ForgotPasswordModal from "./ForgotPasswordModal"; // Import the modal
import OTPVerificationScreen from "./OTPVerificationScreen"; // Import the OTP page
import ResetPasswordScreen from "./ResetPasswordScreen";
import DashboardScreen from "./DashboardScreen";
import BuyReviewsScreen from "./BuyReviewsScreen"; // Adjust the import path accordingly
import FillDetailsScreen from "./FillDetailsScreen"; // Ensure you have this screen
import NextScreen from "./NextScreen";
import AddReviews from "./AddReviews";
import Confirm from "./Confirm";
import Payment from "./Payment";
import PaymentMethodScreen from "./PaymentMethodScreen";
import ProfileScreen from "./ProfileScreen";
import CardPaymentScreen from "./CardPaymentScreen";
import MyBusinessScreen from "./MyBusinessScreen";
import EditProfileScreen from "./EditProfileScreen";
import OrdersScreen from "./OrdersScreen";
import OrderTrackingScreen from "./OrderTrackingScreen";
import OrderTrackingProgressBar from "./OrderTrackingProgressBar";
import NotificationScreen from "./NotificationScreen";

export default function StackNav() {
  const Stack = createStackNavigator();

  return (
    <UserProvider>
      <OrderProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Logo"
                component={LogoScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordModal}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="OTPVerificationScreen"
                component={OTPVerificationScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="BuyReviewsScreen"
                component={BuyReviewsScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="FillDetailsScreen"
                component={FillDetailsScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="NextScreen"
                component={NextScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddReviews"
                component={AddReviews}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Confirm"
                component={Confirm}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Payment"
                component={Payment}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PaymentMethodScreen"
                component={PaymentMethodScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CardPaymentScreen"
                component={CardPaymentScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MyBusinessScreen"
                component={MyBusinessScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EditProfileScreen"
                component={EditProfileScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="OrdersScreen"
                component={OrdersScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="OrderTrackingScreen"
                component={OrderTrackingScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="OrderTrackingProgressBar"
                component={OrderTrackingProgressBar}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </OrderProvider>
    </UserProvider>
  );
}
function App() {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <DrawerNavigator>
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      </DrawerNavigator>
    </NavigationContainer>
  );
}
