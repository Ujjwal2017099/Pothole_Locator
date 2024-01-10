import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../Screens/HomeScreen";
import LocationScreen from "../Screens/LocationScreen";

import StackNavigator from "./StackNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused
                ? "home"
                : "home-outline";
            }
            else if (route.name === "Detect") {
              iconName = focused
                ? "videocam"
                : "videocam-outline";
            } else if (route.name === "Location") {
              iconName = focused ? "location" : "location-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Detect" component={StackNavigator} />
        <Tab.Screen name="Location" component={LocationScreen} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCF8DC",
  },
  video: {
    alignSelf: "stretch",
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
