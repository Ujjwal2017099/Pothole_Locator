import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useEffect, useState, useRef } from "react";

import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from "./navigators/TabNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}



