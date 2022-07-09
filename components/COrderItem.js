import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";

const CMealItem = ({
  id = 1,
  title = "PIZAA",
  quantity = 3,
  price = 40,

  img,
}) => {
  return (
    <View style={styles.cMealItemContainer}>
      <Image
        source={require("../assets/tarte-aux-pommes.jpeg")}
        style={styles.image}
      />
      <View style={styles.cMealDetails}>
        <View style={styles.cMealDetailsOne}>
          <AppText style={styles.bigText}>{title}</AppText>
          <AppText style={styles.smallText}> {"12 km "}</AppText>
        </View>
        <View style={styles.cMealDetailsTwo}>
          <AppText style={styles.bigText}>{quantity + " parts"}</AppText>
          <AppText style={styles.smallText}>
            {"total: " + quantity * price + " $"}
          </AppText>
        </View>
      </View>
      <View style={styles.deleteEditContainer}>
        <TouchableOpacity onPress={() => console.log("Pressed")}>
          <View style={styles.containeredit}>
            <MaterialCommunityIcons
              name="check"
              size={35}
              color={colors.white}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Pressed")}>
          <View style={styles.container}>
            <MaterialCommunityIcons
              name="close"
              size={35}
              color={colors.white}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CMealItem;

const styles = StyleSheet.create({
  bigText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  smallText: { color: colors.primary },
  cMealItemContainer: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: 100,
  },
  cMealDetails: {
    marginHorizontal: 5,

    marginRight: 35,
    flex: 1,
    height: "100%",

    justifyContent: "space-between",
  },
  statusbar: {
    width: "50%",
    backgroundColor: "green",
    height: "100%",
    borderRadius: 10,
  },

  cMealDetailsTwo: {},
  container: {
    backgroundColor: colors.danger,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  containeredit: {
    backgroundColor: "green",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
