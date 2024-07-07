import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Text,
  Keyboard,
} from "react-native";
import backrgoundImage from "../assets/loginScreenBackground.jpg";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import LoginForm from "../Components/LoginForm";

const NewLoginScreen = () => {
  const [isBottomSheetUp, setIsBottomSheetUp] = useState(false);
  const [bottomSheetHeight, setBottomSheetHeight] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["10%", "50%", "75%"], []);
  const guestButtonX = useRef(new Animated.Value(-300)).current;
  const loginButtonX = useRef(new Animated.Value(300)).current;

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
    setIsBottomSheetUp(index > 0);
    setBottomSheetHeight(index);
  }, []);

  const handleSheetAnimate = useCallback((fromIndex, toIndex) => {
    setIsBottomSheetUp(toIndex > 0);
  }, []);

  useEffect(() => {
    Animated.stagger(100, [
      Animated.timing(guestButtonX, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(loginButtonX, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        bottomSheetModalRef.current?.snapToIndex(2); // Snap to the highest point
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(true);
        bottomSheetModalRef.current?.snapToIndex(1); // Snap to the middle point
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
  };

  return (
    <BottomSheetModalProvider>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <ImageBackground
          source={backrgoundImage}
          style={styles.backgroundImage}
        >
          <View style={styles.container}>
            {!isBottomSheetUp && (
              <View>
                <Image
                  source={require("../assets/logo.png")}
                  style={{
                    width: 200,
                    height: 150,
                    alignSelf: "center",
                    marginTop: "55%",
                    resizeMode: "cover",
                  }}
                />
                <View style={{ marginTop: "40%" }}></View>
                <Animated.View
                  style={{ transform: [{ translateX: guestButtonX }] }}
                >
                  <TouchableOpacity
                    onPress={handlePresentModalPress}
                    style={styles.guestButton}
                  >
                    <Text
                      style={[
                        styles.guestButtonText,
                        {
                          textShadowColor: "rgba(0, 0, 0, 0.5)",
                          textShadowOffset: { width: 2, height: 2 },
                          textShadowRadius: 4,
                        },
                      ]}
                    >
                      EXPLORE AS A GUEST
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View
                  style={{ transform: [{ translateX: loginButtonX }] }}
                >
                  <TouchableOpacity
                    onPress={handlePresentModalPress}
                    style={[
                      styles.guestButton,
                      { backgroundColor: "rgba(255,255,255,0.8)" },
                    ]}
                  >
                    <Text style={[styles.guestButtonText, { color: "black" }]}>
                      LOGIN AND CONTINUE
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            )}
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
              onAnimate={handleSheetAnimate}
              handleIndicatorStyle={{ backgroundColor: "#fff" }}
              backgroundStyle={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
              onLayout={handleLayout}
            >
              <LoginForm
                isKeyboardopened={isKeyboardVisible}
                bottomSheetHeight={bottomSheetHeight}
              />
            </BottomSheetModal>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </BottomSheetModalProvider>
  );
};

export default NewLoginScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
    width: "100%",
  },
  guestButton: {
    borderWidth: 1,
    borderColor: "white",
    width: "60%",
    marginLeft: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    alignSelf: "center",
  },
  guestButtonText: {
    color: "white",
    padding: 10,
    fontSize: 16,
  },
});
