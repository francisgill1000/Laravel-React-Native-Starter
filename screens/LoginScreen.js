// screens/LoginScreen.js

import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("demo@gcompany.com");
  const [password, setPassword] = useState("Abc@123");
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);

  const handleLogin = async () => {

    try {
      const response = await axios.post(
        "https://backend.myhotel2cloud.com/api/login",
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        // Handle successful login (e.g., navigate to another screen, store token)
        await AsyncStorage.setItem('token', response.data.token);

        navigation.navigate("Home"); // Example navigation
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginScreen;
