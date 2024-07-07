import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../services/config";
import { signOut } from "firebase/auth";
import LoadingScreen from "./LoadinComponent";

function CustomDrawerContent(props) {
  const { state, navigation } = props;
  const currentRouteName = state.routeNames[state.index];
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const isActive = (routeName) => currentRouteName === routeName;

  const getUserDetails = async () => {
    const start = performance.now();
    try {
      const jsonValue = await AsyncStorage.getItem("userDetails");
      console.log(`AsyncStorage fetch time: ${performance.now() - start} ms`);

      if (jsonValue != null) {
        const currentUser = JSON.parse(jsonValue);
        const docRef = doc(db, "users", currentUser.uid);

        const docStart = performance.now();
        const docSnapshot = await getDoc(docRef);
        console.log(`Firestore fetch time: ${performance.now() - docStart} ms`);

        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setUserData(userData);
          console.log("Document data:", userData);
        } else {
          console.log("Document doesn't exist");
        }
      }
    } catch (e) {
      console.log(
        "Failed to fetch user details from local storage or Firestore",
        e
      );
      if (e.code === "unavailable") {
        Alert.alert(
          "Connection Error",
          "Could not reach Cloud Firestore backend. Please check your internet connection and try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [state]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userDetails");
      await signOut(auth);
      console.log("User signed out");

      Alert.alert("Logout", "You have been logged out.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("NEW_LOGIN"),
        },
      ]);
    } catch (e) {
      console.log("Failed to logout", e);
      Alert.alert("Logout Error", "Failed to logout. Please try again.");
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ImageBackground
      source={require("../assets/profileBackground.jpeg")}
      style={styles.container}
    >
      <View style={styles.profileContainer}>
        {userData && userData.img ? (
          <Image
            source={{ uri: userData.img + `?${Date.now()}` }}
            style={{
              width: 150,
              height: 150,
              alignSelf: "center",
              resizeMode: "cover",
              borderRadius: 100,
              marginVertical: 10,
            }}
            onLoad={() => setIsImageLoading(false)}
          />
        ) : (
          <ActivityIndicator size="large" color="#ffffff" />
        )}
        {userData ? (
          <>
            <Text style={styles.userName}>Hi, {userData.firstName}</Text>
            <Text style={styles.descriptionText}>Where to today?</Text>
          </>
        ) : (
          <>
            <Text style={styles.userName}>Hi, Guest</Text>
            <Text style={styles.descriptionText}>Where to today?</Text>
          </>
        )}
      </View>
      <View style={styles.exploreButtonContainer}>
        <DrawerItem
          label="Explore"
          focused={isActive("NEW_PROFILE")}
          onPress={() => navigation.navigate("NEW_PROFILE")}
          style={[
            styles.exploreItem,
            isActive("NEW_PROFILE") && styles.activeDrawerItem,
          ]}
          labelStyle={
            isActive("NEW_PROFILE")
              ? styles.activeDrawerItemLabel
              : styles.inactiveDrawerItemLabel
          }
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Track your Trips</Text>
        <DrawerItem
          label="Trip One"
          focused={isActive("NEW_TRACKTRIP_SCREEN")}
          onPress={() => navigation.navigate("NEW_TRACKTRIP_SCREEN")}
          style={[
            styles.drawerItem,
            isActive("NEW_TRACKTRIP_SCREEN") && styles.activeDrawerItem,
          ]}
          labelStyle={
            isActive("NEW_TRACKTRIP_SCREEN")
              ? styles.activeDrawerItemLabel
              : styles.inactiveDrawerItemLabel
          }
        />
        <DrawerItem
          label="Trip Two"
          focused={isActive("NEW_TRACKTRIP_SCREEN")}
          onPress={() => navigation.navigate("NEW_TRACKTRIP_SCREEN")}
          style={[
            styles.drawerItem,
            isActive("NEW_TRACKTRIP_SCREEN") && styles.activeDrawerItem,
          ]}
          labelStyle={
            isActive("NEW_TRACKTRIP_SCREEN")
              ? styles.activeDrawerItemLabel
              : styles.inactiveDrawerItemLabel
          }
        />
        <DrawerItem
          label="Log Out"
          onPress={handleLogout}
          style={[styles.exploreItem]}
          labelStyle={styles.inactiveDrawerItemLabel}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    marginTop: "20%",
    alignItems: "center",
    flex: 0.4,
  },
  userName: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 0.5,
  },
  descriptionText: {
    width: "90%",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
  },
  exploreButtonContainer: {
    alignItems: "center",
    marginTop: 15,
  },
  sectionContainer: {
    flex: 0.8,
    alignItems: "left",
  },
  sectionTitle: {
    width: "95%",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    color: "rgba(255, 255, 255, 0.7)",
  },
  drawerItem: {
    width: "90%",
    borderRadius: 8,
    alignSelf: "center",
  },
  exploreItem: {
    width: "90%",
    borderRadius: 8,
    marginBottom: 10,
  },
  activeDrawerItem: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  activeDrawerItemLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  inactiveDrawerItemLabel: {
    fontSize: 16,
    fontWeight: "normal",
    color: "white",
  },
});

export default CustomDrawerContent;
