import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("userDetails");
        const user = jsonValue != null ? JSON.parse(jsonValue) : null;
        if (user) {
          navigation.navigate("NEW_TRACKTRIP_SCREEN");
        } else {
          navigation.navigate("NEW_LOGIN");
        }
      } catch (e) {
        console.error("Failed to fetch user details", e);
        navigation.navigate("NEW_LOGIN");
      }
    };

    const timeoutId = setTimeout(checkUserLoggedIn, 3000);

    return () => clearTimeout(timeoutId);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Video
        source={{
          uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        }}
        rate={1.0}
        volume={0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={styles.video}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  video: {
    width: "100%",
    height: 180,
  },
});
