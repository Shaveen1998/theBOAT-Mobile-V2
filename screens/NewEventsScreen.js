import React from "react";
import { View, FlatList, Image, StyleSheet, Dimensions } from "react-native";
import { cities } from "../data/cities";

const NewEventsScreen = ({ selectedCity }) => {
  const cityObject = cities.find((city) => city.name === selectedCity);
  const events = cityObject ? cityObject.events : [];
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <View style={styles.tabContent}>
      <FlatList
        data={events}
        keyExtractor={(event) => event.name}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Image
              source={item.image}
              style={[
                styles.eventImage,
                {
                  width: windowWidth * 0.86,
                  height: windowHeight * 0.6,
                },
              ]}
              resizeMode="cover"
            />
          </View>
        )}
      />
    </View>
  );
};

export default NewEventsScreen;

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
  },
  eventItem: {
    alignItems: "center",
    marginVertical: "5%",
    width: "100%",
    flex: 1,
  },
  eventImage: {
    flex: 1,
    borderRadius: 30,
  },
});
