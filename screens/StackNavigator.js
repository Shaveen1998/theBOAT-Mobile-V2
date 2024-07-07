import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./DrawerNavigator";
import NewDestinationDetailsScreen from "./NewDestinationDetails";
import NewRoamScreen from "./NewRoamScreen";
import NewHotelDetails from "./NewHotelDetailsScreen";

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NEW_DESTINATION_DETAILS_SCREEN"
        component={NewDestinationDetailsScreen}
        options={{ headerTransparent: true, headerTitle: "" }}
      />

      <Stack.Screen
        name="NEW_ROAM_SCREEN"
        component={NewRoamScreen}
        options={{ headerTransparent: true, headerTitle: "" }}
      />
      <Stack.Screen
        name="NEW_HOTEL_SCREEN"
        component={NewHotelDetails}
        options={{ headerTransparent: true, headerTitle: "" }}
      />
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
