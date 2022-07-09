import React from "react";
import { StyleSheet, View, ActivityIndicator as Ac, Text } from "react-native";
import colors from "../config/colors";
import LottieView from "lottie-react-native";

const ActivityIndicator = ({ visible = false }) => {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      {/* <Ac size="large" color={colors.black} /> */}
      <LottieView autoPlay loop source={require("../assets/animation3.json")} />
    </View>
  );
};
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: colors.white,
    zIndex: 9000,
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ActivityIndicator;
