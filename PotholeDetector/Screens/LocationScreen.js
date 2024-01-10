import { StyleSheet, View, Text, Button } from "react-native";
import { useState, useEffect } from "react";

import * as Location from "expo-location";

export default function LocationScreen() {
  const [hasLocationPermission, setHasLocationPermission] = useState();
  const [coords, setCoords] = useState();

  const getPermission = async () => {
    const locationPermission =
      await Location.requestForegroundPermissionsAsync();
    if (!locationPermission.granted) {
      console.log("Location access not granted");
    }

    const backgroundPermission =
      await Location.requestBackgroundPermissionsAsync();

    let options = {
      accuracy: 6,
      timeInterval: 4000,
    };

    let currentLocation = await Location.getCurrentPositionAsync(options);
    console.log("Location: ", currentLocation);
    console.log(
      currentLocation.coords.latitude,
      currentLocation.coords.longitude
    );

    setCoords([
      currentLocation.coords.latitude,
      currentLocation.coords.longitude,
    ]);

    let currentAddress = await Location.reverseGeocodeAsync({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });
    console.log("Address: ", currentAddress);
  };

  //   useEffect(() => {
  //     getPermission();
  //   }, []);

  return (
    <View style={styles.container}>
      {/* <Text>LocationScreen</Text> */}
      <Button title="Get Location Details" onPress={getPermission} />
      {coords ? (
        <>
          <Text>Latitude : {coords[0]}</Text>
          <Text>Longitude : {coords[1]}</Text>
        </>
      ) : (
        <></>
      )}
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
