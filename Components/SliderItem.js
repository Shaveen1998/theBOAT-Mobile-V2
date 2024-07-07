import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import Theme from "../theme/Theme";
import { useNavigation } from "@react-navigation/native";

const SliderItem = ({ item, translateY }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();

  const [animatedTranslateY, setAnimatedTranslateY] = useState(0);

  useEffect(() => {
    translateY.addListener(({ value }) => {
      setAnimatedTranslateY(value);
    });

    return () => {
      translateY.removeAllListeners();
    };
  }, [translateY]);

  const imageWidth =
    windowWidth / 3 + (windowWidth / 2 - windowWidth / 3) * animatedTranslateY;
  const imageHeight =
    windowHeight / 4.5 +
    (windowHeight / 3 - windowHeight / 4.5) * animatedTranslateY;

  const handleNavigation = () => {
    navigation.navigate("NEW_DESTINATION_DETAILS_SCREEN", { item });
  };

  return (
    <Pressable style={styles.container} onPress={handleNavigation}>
      <Animated.Image
        source={item.imageURL}
        style={[styles.image, { width: imageWidth, height: imageHeight }]}
      />
      <View style={styles.textContainer}>
        <EvilIcons name="location" size={20} color="white" />
        <Text style={styles.locationName}>{item.name}, Sri Lanka</Text>
      </View>
    </Pressable>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 250,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  textContainer: {
    position: "absolute",
    bottom: 10,
    left: 15,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationName: {
    color: "#ffffff",
    fontSize: Theme.FontSizes.xs,
    paddingLeft: 10,
  },
});
