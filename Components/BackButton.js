import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigationState } from "@react-navigation/native";

const BackButton = ({ navigation }) => {
  const routes = useNavigationState((state) => state.routes);

  const handleBackPress = () => {
    if (routes.length > 1) {
      navigation.goBack();
    } else {
      navigation.navigate("NEW_TRACKTRIP_SCREEN");
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleBackPress}>
      <Ionicons name="chevron-back" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    width: "90%",
    marginTop: 50,
    marginBottom: 15,
  },
});
