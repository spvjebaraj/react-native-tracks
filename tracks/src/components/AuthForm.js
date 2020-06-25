import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import Spacer from "../components/Spacer";

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Spacer>
        <Text h3 style={{ marginBottom: 20 }}>
          {headerText}
        </Text>
      </Spacer>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        label="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        label="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={submitButtonText}
          onPress={() => onSubmit({ email, password })}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginTop: 15,
    marginLeft: 15,
  },
});

export default AuthForm;
