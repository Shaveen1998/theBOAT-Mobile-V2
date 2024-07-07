import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import RestaurantsScreen from "./NewRestuarantsScreen";
import { cities } from "../data/cities";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import Theme from "../theme/Theme";
import NewEventsScreen from "./NewEventsScreen";
import NewBarsScreen from "./NewBarsScreen";

const CustomTabNavigator = ({ onTabPress, activeTab }) => {
  const tabs = ["Restaurants", "Events", "BnB"];

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tabButton,
            activeTab === tab
              ? styles.activeTabButton
              : styles.inactiveTabButton,
          ]}
          onPress={() => onTabPress(tab)}
        >
          <Text
            style={
              activeTab === tab ? styles.activeTabText : styles.inactiveTabText
            }
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const NewRoamScreen = ({ route }) => {
  const { item, selectedCity: initialSelectedCity } = route.params;
  const [activeTab, setActiveTab] = useState("Restaurants");
  const [selectedCity, setSelectedCity] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState(cities);

  useEffect(() => {
    setSelectedCity(initialSelectedCity || "");
  }, [initialSelectedCity]);

  useEffect(() => {
    if (isModalVisible) {
      setFilteredCities(cities);
      setSearchQuery("");
    }
  }, [isModalVisible]);

  const renderContent = () => {
    switch (activeTab) {
      case "Restaurants":
        return (
          <RestaurantsScreen
            route={{ params: { item } }}
            selectedCity={selectedCity}
          />
        );

      case "Events":
        return (
          <NewEventsScreen
            route={{ params: { item } }}
            selectedCity={selectedCity}
          />
        );
      case "BnB":
        return (
          <NewBarsScreen
            route={{ params: { item } }}
            selectedCity={selectedCity}
          />
        );
      default:
        return null;
    }
  };

  const handleCitySelect = (cityName) => {
    setSelectedCity(cityName);
    setIsModalVisible(false);
  };

  const filterCities = (query) => {
    setSearchQuery(query);
    const filtered = cities.filter((city) =>
      city.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.picker}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.selectedCity}>
          {selectedCity || "Select a city"}
        </Text>
        <AntDesign name="arrowright" size={18} color="black" />
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
                onChangeText={filterCities}
                value={searchQuery}
              />
              <EvilIcons name="search" size={24} color="black" />
            </View>
            <FlatList
              data={filteredCities}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.cityItem}
                  onPress={() => handleCitySelect(item.name)}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </Modal>
      <CustomTabNavigator onTabPress={setActiveTab} activeTab={activeTab} />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  picker: {
    flex: 0.055,
    width: "94%",
    borderRadius: 20,
    justifyContent: "space-between",
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "black",
    marginBottom: 10,
    marginTop: "23%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 15,
    width: "85%",
    maxHeight: "85%",
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  cityItem: {
    width: "90%",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    alignSelf: "center",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    margin: 2,
    borderRadius: 20,
    alignItems: "center",
  },
  activeTabButton: {
    backgroundColor: "black",
  },
  inactiveTabButton: {
    backgroundColor: "lightgrey",
  },
  activeTabText: {
    color: "white",
  },
  inactiveTabText: {
    color: "black",
  },
  closeButton: {
    marginTop: 10,
    width: "95%",
    alignItems: "flex-end",
  },
  selectedCity: {
    color: "black",
    fontWeight: "normal",
    fontSize: Theme.FontSizes.small,
    marginLeft: 5,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    width: "93%",
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
});

export default NewRoamScreen;
