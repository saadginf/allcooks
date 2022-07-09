import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AppText from "./AppText";
import colors from "../config/colors";

export default function Header({ navigation, OnBackPress, Title }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={OnBackPress} style={styles.OnBackPress}>
        <AntDesign name="back" color="black" size={30} />
      </TouchableOpacity>
      <AppText style={styles.HeaderTitle}>{Title}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "20%",
    width: "100%",
    paddingHorizontal: "5%",
    paddingTop: "5%",
    justifyContent: "flex-end",
  },
  OnBackPress: {
    bottom: "4%",
  },
  HeaderTitle: {
    fontSize: 37,
    fontWeight: "bold",
    color: colors.primary,
  },
});
