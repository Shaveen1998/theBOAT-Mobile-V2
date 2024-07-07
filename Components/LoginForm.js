import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../services/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./LoadinComponent";

const LoginForm = ({ isKeyboardopened, bottomSheetHeight }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const storeUserDetails = async (user) => {
    try {
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem("userDetails", jsonValue);
      console.log("User details stored in async storage");
    } catch (e) {
      console.log("Failed to save user details to local storage", e);
    }
  };

  const clearUserDetails = async () => {
    try {
      await AsyncStorage.removeItem("userDetails");
      console.log("User details cleared from async storage");
    } catch (e) {
      console.log("Failed to clear user details from local storage", e);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed in:", user);
      await storeUserDetails(user);
      return user;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const user = await login(email, password);
      if (user) {
        if (!user.emailVerified) {
          navigation.navigate("NEW_TRACKTRIP_SCREEN");
        } else {
          Alert.alert("Email not verified", "Please verify your email.");
        }
      }
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        alert("User doesn't exist. Please check the email address.");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
      } else if (error.code === "auth/network-request-failed") {
        alert(
          "No internet. Please check your internet connection and try again"
        );
      } else if (error.code === "auth/too-many-requests") {
        alert("Too many unsuccessful login attempts. Please try again later.");
      } else {
        alert("Sign-in error: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
    ding;
  }

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.bottomsheetTitle}>Login</Text>
      <View style={styles.middlepart}>
        <View style={[email ? styles.filledInputView : styles.inputView]}>
          <TextInput
            placeholder="Enter your email address here"
            placeholderTextColor="#9c9c9c"
            style={[email ? styles.filledTextInput : styles.inputText]}
            onChangeText={handleEmailChange}
            value={email}
            spellCheck={false}
            autoCorrect={false}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="off"
          />
        </View>
        <View style={[password ? styles.filledInputView : styles.inputView]}>
          <TextInput
            placeholder="Enter your password here"
            placeholderTextColor="#9c9c9c"
            style={[password ? styles.filledTextInput : styles.inputText]}
            onChangeText={handlePasswordChange}
            value={password}
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize="none"
            autoComplete="off"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.registerText}>
            Don't have an account? {"\n"}Click here to register through our
            website
          </Text>
        </TouchableOpacity>
      </View>
      {!isKeyboardopened && <View style={styles.blankView}></View>}
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  inputView: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 20,
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  filledInputView: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 20,
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#1f2737",
  },
  inputText: {
    height: 50,
    color: "white",
  },
  loginBtn: {
    width: "90%",
    backgroundColor: "#1f2737",
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  loginText: {
    color: "white",
    fontSize: 16,
  },
  filledTextInput: {
    height: 50,
    color: "black",
  },
  registerText: {
    fontSize: 14,
    color: "rgba(0,0,0,1)",
    textAlign: "center",
    marginHorizontal: "5%",
  },
  bottomsheetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  middlepart: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-evenly",
    marginVertical: "3%",
  },
  blankView: {
    flex: 0.7,
    backgroundColor: "black",
  },
});
