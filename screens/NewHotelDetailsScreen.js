import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Theme from "../theme/Theme";

const NewHotelDetails = () => {
  const route = useRoute();
  const { hotel, city } = route.params;

  return (
    <View style={styles.container}>
      <Image source={hotel.image} style={styles.hotelImage} />
      <View style={styles.details}>
        <Text style={styles.hotelName}>{hotel.name}</Text>
        <Text style={styles.cityName}>{city}</Text>
        <View style={styles.rating}>
          <Ionicons name="star" size={24} color="#FFD700" />
          <Ionicons name="star" size={24} color="#FFD700" />
          <Ionicons name="star" size={24} color="#FFD700" />
          <Ionicons name="star" size={24} color="#FFD700" />
          <Ionicons name="star-half" size={24} color="#FFD700" />
        </View>
        <Text style={styles.sectionTitle}>About the Hotel</Text>
        <Text style={styles.descriptionText}>
          {hotel.name} is a luxury hotel located in the heart of {city}. Known
          for its excellent service and comfortable accommodations, this hotel
          is the perfect choice for travelers looking for a memorable stay.
        </Text>
      </View>
    </View>
  );
};

export default NewHotelDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  hotelImage: {
    width: "100%",
    height: 400,
    marginBottom: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  hotelName: {
    fontSize: Theme.FontSizes.medium,
    fontWeight: "bold",
    width: "90%",
    textAlign: "center",
    marginVertical: 10,
  },
  cityName: {
    fontSize: Theme.FontSizes.small,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: Theme.FontSizes.small,
    fontWeight: "bold",
    width: "70%",
    textAlign: "left",
    paddingLeft: 10,
    paddingTop: 10,
  },
  descriptionText: {
    fontSize: Theme.FontSizes.small,
    width: "100%",
    textAlign: "left",
    padding: 10,
  },
  details: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    height: "52%",
    width: "90%",
    borderRadius: 20,
    marginTop: -60,
    paddingVertical: 10,
  },
  rating: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "center",
    paddingVertical: 20,
  },
});
