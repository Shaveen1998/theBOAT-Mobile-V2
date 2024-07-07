import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import CustomDrawerContent from "../Components/DrawerContent";
import SplashScreen from "./SplashScreen";
import NewLoginScreen from "./NewLoginScreen";
import NewTrackTripScreen from "./NewTrackTripScreen";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName="SPLASH_SCREEN"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <AntDesign
              name="user"
              size={24}
              color={colors.primary}
              style={{ marginLeft: 15 }}
            />
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen
        name="SPLASH_SCREEN"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="NEW_LOGIN"
        component={NewLoginScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="NEW_TRACKTRIP_SCREEN"
        component={NewTrackTripScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
