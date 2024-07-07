import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import MainStackNavigator from "./screens/StackNavigator";

const Drawer = createDrawerNavigator();

function App() {
  let [fontsLoaded] = useFonts({
    mBold: require("./assets/fonts/Montserrat-Bold.ttf"),
    mm: require("./assets/fonts/MajorMonoDisplay-Regular.ttf"),
    ls: require("./assets/fonts/LeagueSpartan-VariableFont_wght.ttf"),
  });

  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}

export default App;
