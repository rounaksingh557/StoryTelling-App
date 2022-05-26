// Modules Import
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import firebase from "firebase";

// Files Import
import Profile from "../Screens/Profiles";
import StackNavigator from "./StackNavigator";
import Logout from "../Screens/Logout";
import CustomSideBarMenu from "../Screens/CustomSideBarMenu";

const Drawer = createDrawerNavigator();

export default class DrawerNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
    };
  }

  componentDidMount() {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({
          light_theme: theme === "light" ? true : false,
        });
      });
  }

  render() {
    return (
      <Drawer.Navigator
        screenOptions={{
          drawerActiveTintColor: "#e91e63",
          drawerInactiveTintColor: this.state.light_theme ? "#000" : "#fff",
          drawerItemStyle: {
            marginVertical: 5,
          },
        }}
        drawerContent={(props) => <CustomSideBarMenu {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={StackNavigator}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{ unmountOnBlur: true }}
        />
      </Drawer.Navigator>
    );
  }
}
