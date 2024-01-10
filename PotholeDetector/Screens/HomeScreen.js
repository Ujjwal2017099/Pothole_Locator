import { Button, StyleSheet, Text, View, SafeAreaView } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>HOME PAGE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCF8DC",
  },
});
