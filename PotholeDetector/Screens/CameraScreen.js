import { Button, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import * as MediaLibrary from 'expo-media-library';

export default function CameraScreen() {
  const cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();

  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();

      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (
    hasCameraPermission === undefined ||
    hasMicrophonePermission === undefined
  ) {
    return <Text>Required Permissions...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Permission for Camera not granted !!</Text>;
  }

  let recordVideo = async () => {
    setIsRecording(true);
    let options = {
      maxDuration: 60,
      mute: false,
      quality: "1080p",
    };

    cameraRef.current.recordAsync(options).then((recordedVideo) => {
      setVideo(recordedVideo);
      setIsRecording(false);
    });
  };

  let stopRecording = async () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
  };

  let saveVideo = () => {
    MediaLibrary.saveToLibraryAsync(video.uri).then(()=>{
      setVideo(undefined);
    });
  }

  if (video) {
    return (
      <SafeAreaView style={styles.container}>
        <Video
          style={styles.video}
          source={{ uri: video.uri }}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
        {hasMediaLibraryPermission ? <Button title="Save Video" onPress={saveVideo}/> : undefined}
        <Button title="Discard" onPress={() => setVideo(undefined)} />  
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <Button
          title={isRecording ? "Stop Recording" : "Record Video"}
          onPress={isRecording ? stopRecording : recordVideo}
        />
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
});
