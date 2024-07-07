import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import Theme from "../theme/Theme";
import { cities } from "../data/cities";

const RestaurantsScreen = ({ selectedCity }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const cityObject = cities.find((city) => city.name === selectedCity);
  const restaurants = cityObject ? cityObject.restaurants : [];

  const filterRestaurants = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    } else {
      setFilteredRestaurants([]);
    }
  };

  const handleRestaurantSelect = (restaurantName) => {
    setSelectedRestaurant(restaurantName);
    setIsModalVisible(false);
    filterRestaurants(restaurantName);
  };

  return (
    <View style={styles.tabContent}>
      <TouchableOpacity
        style={styles.picker}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.selectedRestaurant}>
          {selectedRestaurant || "Search for restaurants..."}
        </Text>
        <AntDesign name="arrowright" size={18} color="white" />
      </TouchableOpacity>
      <Modal visible={isModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <AntDesign name="close" size={20} color="black" />
            </TouchableOpacity>
            <View style={styles.searchSection}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                onChangeText={filterRestaurants}
                value={searchQuery}
              />
              <EvilIcons name="search" size={24} color="black" />
            </View>
            <FlatList
              data={searchQuery ? filteredRestaurants : restaurants}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.cityItem}
                  onPress={() => handleRestaurantSelect(item.name)}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.name}
            />
          </View>
        </View>
      </Modal>
      <FlatList
        data={searchQuery ? filteredRestaurants : restaurants}
        keyExtractor={(restaurant) => restaurant.name}
        renderItem={({ item }) => (
          <View style={styles.restaurantItem}>
            <Image
              source={item.image}
              style={styles.restaurantImage}
              resizeMode="cover"
            />
            <Text style={styles.restaurantName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default RestaurantsScreen;

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: "flex-start",
  },
  picker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 20,
    width: "91%",
    backgroundColor: "black",
    marginBottom: 10,
  },
  selectedRestaurant: {
    fontSize: Theme.FontSizes.small,
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    height: 40,
    justifyContent: "space-between",
    padding: 10,
    alignSelf: "center",
    marginVertical: 10,
  },
  searchInput: {
    width: "80%",
  },
  restaurantItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "1.5%",
    width: "98%",
    flex: 1,
  },
  restaurantImage: {
    width: "50%",
    height: 180,
    marginRight: 20,
    borderRadius: 30,
  },
  restaurantName: {
    width: "40%",
    maxWidth: "40%",
    fontSize: Theme.FontSizes.small,
    textAlign: "left",
    color: "black",
  },
  cityItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
