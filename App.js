import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

// Files Import
import DrawerNavigation from "./Navigation/DrawerNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
}
