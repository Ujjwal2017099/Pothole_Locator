const getLocation = async () => {
  const locationPermission = await Location.requestForegroundPermissionsAsync();
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

  let currentAddress = await Location.reverseGeocodeAsync({
    latitude: currentLocation.coords.latitude,
    longitude: currentLocation.coords.longitude,
  });
  console.log("Address: ", currentAddress);
};
