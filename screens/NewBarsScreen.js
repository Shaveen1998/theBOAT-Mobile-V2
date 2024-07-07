import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { cities } from "../data/cities";
import Theme from "../theme/Theme";

const NewBarsScreen = ({ selectedCity }) => {
  const cityObject = cities.find((city) => city.name === selectedCity);
  const bars = cityObject ? cityObject.bars : [];

  return (
    <View style={styles.tabContent}>
      <FlatList
        data={bars}
        keyExtractor={(bar) => bar.name}
        renderItem={({ item }) => (
          <View style={styles.barItem}>
            <Image
              source={item.image}
              style={styles.barImage}
              resizeMode="cover"
            />
            <Text style={styles.barName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default NewBarsScreen;

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
  },
  barItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "1.5%",
    width: "100%",
    flex: 1,
  },
  barImage: {
    width: "50%",
    height: 180,
    marginRight: 20,
    borderRadius: 30,
  },
  barName: {
    width: "40%",
    fontSize: Theme.FontSizes.small,
    textAlign: "left",
    color: "black",
  },
});
