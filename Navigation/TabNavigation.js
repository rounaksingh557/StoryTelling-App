// Modules Import
import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

// Files Import
import Feed from "../Screens/Feed";
import CreateStory from "../Screens/CreateStory";

const Tab = createMaterialBottomTabNavigator();

const TabNavigation = () => {
  const [theme, setTheme] = React.useState("");
  const [isUpdated, setIsUpdated] = React.useState(false);

  async function fetchUser() {
    let theme;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        theme = snapshot.val().current_theme;
        setTheme(theme);
      });
  }

  const renderFeed = (props) => {
    return <Feed setUpdateToFalse={removeUpdated} {...props} />;
  };

  const renderStory = (props) => {
    return <CreateStory setUpdateToTrue={changeUpdated} {...props} />;
  };

  const changeUpdated = () => {
    setIsUpdated(true);
  };

  const removeUpdated = () => {
    setIsUpdated(false);
  };

  React.useEffect(() => fetchUser(), []);

  return (
    <Tab.Navigator
      labeled={false}
      barStyle={
        theme === "light" ? styles.bottomTabStyleLight : styles.bottomTabStyle
      }
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Feed") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "CreateStory") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }
          return (
            <Ionicons
              name={iconName}
              size={RFValue(25)}
              color={color}
              style={styles.icon}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "red",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Feed"
        component={renderFeed}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="CreateStory"
        component={renderStory}
        options={{ unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2f345d",
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute",
  },
  bottomTabStyleLight: {
    backgroundColor: "#eaeaea",
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute",
  },
  icon: {
    width: RFValue(30),
    height: RFValue(30),
  },
});
