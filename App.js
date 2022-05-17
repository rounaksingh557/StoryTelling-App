// Modules Import
import * as React from "react";
import { SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

// Files Import
import DrawerNavigation from "./Navigation/DrawerNavigation";

export default function App() {
  return (
    <SafeAreaView style={styles.droidSafeAreaView}>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  droidSafeAreaView: {
    flex: 1,
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
});
