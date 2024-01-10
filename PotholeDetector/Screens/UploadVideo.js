import { Button, StyleSheet, Text, View } from "react-native";
import { useEffect, useState, useRef } from "react";
import * as DocumentPicker from "expo-document-picker";
import { Video, ResizeMode } from "expo-av";

export default function UploadVideo({ navigation }) {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [videoUri, setVideoUri] = useState();

  const pickVideo = async () => {
    const pickedObj = await DocumentPicker.getDocumentAsync({ type: "*/*" });
    console.log(pickedObj);
    // setVideo(undefined);
    if (pickedObj.canceled !== true)
        setVideoUri(pickedObj.assets[0]);
  };

  return (
    <View style={styles.container}>
      {videoUri ? (
        <>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: videoUri.uri,
            }}
            useNativeControls
            isLooping
            resizeMode={ResizeMode.CONTAIN}
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <View style={styles.buttons}>
            <Button
              title={status.isPlaying ? "Pause" : "Play"}
              onPress={() =>
                status.isPlaying
                  ? video.current.pauseAsync()
                  : video.current.playAsync()
              }
            />
            <Button
              title="Back"
              onPress={() => {
                setVideoUri(undefined), navigation.navigate("UploadVideo");
              }}
            />
          </View>
        </>
      ) : (
        <View>
          <Button title="Record Video" onPress={() => {navigation.navigate("CameraScreen")}} />
          <Button title="Select Video" onPress={pickVideo} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
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
