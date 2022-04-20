// Modules Import
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Files Import
import TabNavigator from "../Navigation/TabNavigation";
import Profile from "../Screens/Profiles";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigation;
