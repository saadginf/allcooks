import React, { useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../config/colors";

export default function MyCheckbox({ onChange, name }) {
  const [isCheked, setIsChecked] = useState(false);
  function onCheckmarkPress() {
    setIsChecked(!isCheked);
    onChange({ status: !isCheked, value: name });
  }

  return (
    <View style={styles.checkboxContainer}>
      <Pressable
        style={[styles.checkboxBase, isCheked && styles.checkboxChecked]}
        onPress={onCheckmarkPress}
      >
        {isCheked && <Ionicons name="checkmark" size={19} color="white" />}
      </Pressable>
      <Text style={styles.checkboxLabel}>{name}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: "transparent",
  },

  checkboxChecked: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  appContainer: {
    flex: 1,
    alignItems: "center",
  },

  appTitle: {
    marginVertical: 16,
    fontWeight: "bold",
    fontSize: 24,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",

    width: "45%",
    marginTop: 6,
  },

  checkboxLabel: {
    marginLeft: 8,
    fontWeight: "500",
    fontSize: 15,
  },
});
