import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import { MaterialIcons } from "@expo/vector-icons";
const ErrorMessage = ({ message }) => {
  return (
    <View style={styles.errorContainer}>
      <MaterialIcons name="error" size={24} color={colors.danger} />
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  errorContainer: {
    padding: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    color: colors.danger,
    marginLeft: 5,
  },
});
