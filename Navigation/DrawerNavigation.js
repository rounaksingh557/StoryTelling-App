// Modules Import
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Files Import
import Profile from "../Screens/Profiles";
import StackNavigator from "./StackNavigator";
import Logout from "../Screens/Logout";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={StackNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigation;
