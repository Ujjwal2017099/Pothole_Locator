import { Button, StyleSheet, Text, View } from "react-native";

import CameraScreen from "./Screens/CameraScreen";

export default function App() {
  

  return (
    // <CameraScreen />
    <View style={styles.container}>
      <Text>HOME SCREEN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
