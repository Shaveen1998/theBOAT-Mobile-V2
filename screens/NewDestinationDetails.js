import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Theme from "../theme/Theme";

const screenWidth = Dimensions.get("window").width;

const NewDestinationDetailsScreen = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const currentIndex = useRef(0);
  const [leftArrowColor, setLeftArrowColor] = useState(
    "rgba(255, 255, 255, 0.3)"
  );
  const [rightArrowColor, setRightArrowColor] = useState("white");

  const handleHotelPress = (hotel) => {
    navigation.navigate("NEW_HOTEL_SCREEN", { hotel, city: item.name });
  };

  const handleRoamPress = () => {
    navigation.navigate("NEW_ROAM_SCREEN", { item, selectedCity: item.name });
  };

  const updateArrowColors = () => {
    setLeftArrowColor(
      currentIndex.current > 0 ? "white" : "rgba(255, 255, 255, 0.3)"
    );
    setRightArrowColor(
      currentIndex.current < item.hotels.length - 1
        ? "white"
        : "rgba(255, 255, 255, 0.3)"
    );
  };

  const scrollToNext = () => {
    if (currentIndex.current < item.hotels.length - 1) {
      currentIndex.current += 1;
      scrollViewRef.current.scrollTo({
        x: currentIndex.current * (screenWidth * 0.45 + 20),
        animated: true,
      });
    }
    updateArrowColors();
  };

  const scrollToPrevious = () => {
    if (currentIndex.current > 0) {
      currentIndex.current -= 1;
      scrollViewRef.current.scrollTo({
        x: currentIndex.current * (screenWidth * 0.45 + 20),
        animated: true,
      });
    }
    updateArrowColors();
  };

  useEffect(() => {
    updateArrowColors();
  }, []);

  return (
    <ImageBackground source={item.imageURL} style={styles.container}>
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.99)"]}
        style={styles.gradient}
      />
      <View style={styles.bottomContainer}>
        <View style={styles.bottomContainerLeft}>
          <View style={styles.temperatureContainer}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="cloud" size={24} color="white" />
            </View>
            <Text style={styles.temperature}>{item.temp}C</Text>
          </View>
          <View style={styles.textBox}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="map-marker-alt" size={24} color="white" />
            </View>
            <View style={styles.locationText}>
              <Text style={styles.cityName}>{item.name}</Text>
              <Text style={styles.vibeText}>Vibe : {item.vibe}</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.roamButton} onPress={handleRoamPress}>
          <Text style={styles.roamText}>Roam</Text>
          <FontAwesome5 name="location-arrow" size={18} color="white" />
        </Pressable>
      </View>
      <View style={styles.hotelListContainer}>
        {item.hotels && item.hotels.length > 0 ? (
          <>
            {item.hotels.length > 2 && (
              <Pressable style={styles.arrowButton} onPress={scrollToPrevious}>
                <FontAwesome5
                  name="chevron-left"
                  size={24}
                  color={leftArrowColor}
                />
              </Pressable>
            )}
            <Animated.ScrollView
              ref={scrollViewRef}
              horizontal
              contentContainerStyle={styles.buttonList}
              showsHorizontalScrollIndicator={false}
            >
              {item.hotels.map((hotel, index) => (
                <Pressable
                  key={index}
                  style={styles.stayButton}
                  onPress={() => handleHotelPress(hotel)}
                >
                  <Text style={styles.buttonText}>{hotel.number}</Text>
                </Pressable>
              ))}
            </Animated.ScrollView>
            {item.hotels.length > 2 && (
              <Pressable style={styles.arrowButton} onPress={scrollToNext}>
                <FontAwesome5
                  name="chevron-right"
                  size={24}
                  color={rightArrowColor}
                />
              </Pressable>
            )}
          </>
        ) : (
          <Text style={styles.noStaysText}>No stays available</Text>
        )}
      </View>
    </ImageBackground>
  );
};

export default NewDestinationDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
  },
  textBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cityName: {
    fontSize: Theme.FontSizes.medium,
    fontWeight: "bold",
    color: "white",
    paddingTop: 10,
    width: "100%",
  },
  vibeText: {
    fontSize: Theme.FontSizes.small,
    color: "white",
    paddingBottom: 10,
    textAlign: "left",
  },
  temperature: {
    fontSize: Theme.FontSizes.medium,
    color: "white",
    paddingLeft: 15,
    fontWeight: "bold",
  },
  temperatureContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    width: "94%",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
  },
  locationText: {
    paddingLeft: 15,
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    alignItems: "center",
  },
  roamText: {
    color: "white",
    fontSize: Theme.FontSizes.medium,
    fontWeight: "bold",
  },
  roamButton: {
    flexDirection: "row",
    paddingHorizontal: 15,
    borderRadius: 10,
    width: "32%",
    height: "60%",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
  },
  hotelListContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonList: {
    paddingVertical: 20,
  },
  stayButton: {
    backgroundColor: "rgba(255, 255, 255, 0.0)",
    padding: 15,
    borderRadius: 10,
    margin: 10,
    width: screenWidth * 0.45,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: Theme.FontSizes.small,
    color: "white",
    fontWeight: "bold",
  },
  noStaysText: {
    color: "white",
    fontSize: Theme.FontSizes.medium,
    textAlign: "center",
    marginVertical: 20,
  },
  arrowButton: {
    padding: 10,
  },
});
