import {
  Button,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import backrgoudnImage from "../assets/profileBackground.jpeg";
import AvatarIcon from "../Components/AvatarIcon";
import Theme from "../theme/Theme";
import { useNavigation } from "@react-navigation/native";

const NewProfileScreen = () => {
  const [userName, setUserName] = useState("David");
 const navigation = useNavigation();

  const handleExplore = () => {
   
    navigation.navigate("DESTINATIONS")
  }
  const handleTrackTrip = () => {
   
    navigation.navigate("NEW_TRACKTRIP_SCREEN")
  }
  return (
    <ImageBackground source={backrgoudnImage} style={styles.container}>
      <View style={styles.avatar}>
        <AvatarIcon />
      </View>
      <View style={styles.profileScreenBottom}>
        <Text style={styles.greetingText}>Hi, {userName}</Text>
        <Text style={styles.descriptiveText}> to today?</Text>
        <Pressable style={styles.buttonStyle} onPress={handleTrackTrip}>
          <Text style={styles.buttonOneText}>Current Trip</Text>
        </Pressable>
        <Pressable style={styles.buttonStyle} onPress={handleExplore}>
          <Text style={styles.buttonTwoText}>Explore</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default NewProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  avatar: {
    flex: 0.5,
    alignItems: "flex-start",
    paddingHorizontal: 50,
  },
  profileScreenBottom: {
    flex: 0.5,
    justifyContent: "flex-start",
    paddingHorizontal: 50,
  },
  greetingText: {
    fontSize: Theme.FontSizes.xl,
    fontWeight: "bold",
    color: Theme.Colors.white,
  },
  descriptiveText: {
    color: Theme.Colors.secondaryTextColour,
    fontWeight: "bold",
    marginBottom: 40,
  },
  buttonStyle: {
    backgroundColor: "#D9D9D9",
    flex: 0.25,
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 20,
    elevation: 5,
    shadowColor: Theme.Colors.black,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  buttonOneText: {
    color: Theme.Colors.black,
    fontSize: Theme.FontSizes.large,
    alignSelf: "center",
  },
  buttonTwoText: {
    color: Theme.Colors.black,
    fontSize: Theme.FontSizes.large,
  },
});
