import React, { useCallback, useMemo, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View, FlatList, Animated, Image } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import SliderItem from "../Components/SliderItem";
import { cities } from "../data/cities";
import { ScrollView } from "react-native-gesture-handler";

export default function NewTrackTripScreen() {
  const snapPoints = useMemo(() => ["28%", "40%"], []);
  const translateY = useRef(new Animated.Value(0)).current;

  const handleSheetChanges = useCallback(
    (index) => {
      let toValue;
      if (index === 1) toValue = 1;
      else if (index === 2) toValue = 0.67;
      else toValue = 0;

      Animated.timing(translateY, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }).start();
    },
    [translateY]
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 7.8731,
          longitude: 80.7718,
          latitudeDelta: 2.9,
          longitudeDelta: 2.9,
        }}
      >
        {cities.map((city) => (
          <Marker
            key={city.id}
            coordinate={{ latitude: city.latitude, longitude: city.longitude }}
            title={city.name}
            description={`Vibe: ${city.vibe}, Temp: ${city.temp}°C`}
          >
            <Image source={city.imageURL} style={styles.markerImage} />
          </Marker>
        ))}
      </MapView>
      <BottomSheet
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: "#000" }}
        backgroundStyle={{ backgroundColor: "#fff" }}
        detached={true}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {cities.map((city) => (
              <SliderItem
                key={city.id}
                item={city}
                translateY={translateY}
                bottomSheetHeight={snapPoints[1]}
              />
            ))}
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8ab4f8",
  },
  map: {
    width: "100%",
    height: "72%",
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 5,
    width: "100%",
  },
  markerImage: {
    width: 30,
    height: 30,
    borderRadius: 17,
  },
});
