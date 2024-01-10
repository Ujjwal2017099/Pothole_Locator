import { createStackNavigator } from "@react-navigation/stack";

import CameraScreen from "../Screens/CameraScreen";
import UploadVideo from "../Screens/UploadVideo";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false,}}>    
      <Stack.Screen name="UploadVideo" component={UploadVideo} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
    </Stack.Navigator>
  );
}
