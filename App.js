// Modules Import
import * as React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import * as firebase from "firebase";
import { firebaseConfig } from "./Config";

// Files Import
import LoadingScreen from "./Screens/LoadingScreen";
import LoginScreen from "./Screens/LoginScreen";
import DashBoardScreen from "./Screens/DashBoardScreen";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashBoardScreen: DashBoardScreen,
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

export default function App() {

  return (
    <SafeAreaView style={styles.droidSafeAreaView}>
      <AppNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  droidSafeAreaView: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
