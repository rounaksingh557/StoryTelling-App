// Modules Import
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";

// Files Import
import DrawerNavigation from "../Navigation/DrawerNavigation";

LogBox.ignoreAllLogs();

export default function DashBoardScreen() {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
}
