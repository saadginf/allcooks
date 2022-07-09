import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import colors from "../config/colors";
import AppText from "./AppText";

const CMealItem = ({
  id,
  title,
  rest,
  profit,
  lesfTime,
  progress,
  img,
  renderRightActions,
  useByDate,
  timeForConsumption,
}) => {
  let d1 = new Date(useByDate);
  let d2 = new Date();
  let hours = Math.abs(d1 - d2) / 36e5;
  let mealRemainingTime = Math.floor((hours / timeForConsumption) * 100);
  console.log(hours);
  console.log(mealRemainingTime);
  console.log(timeForConsumption);
  const img1 = "data:image/png;base64," + img;

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.cMealItemContainer}>
          <Image source={{ uri: img1 }} style={styles.image} />
          <View style={styles.cMealDetails}>
            <View style={styles.cMealDetailsOne}>
              <AppText style={styles.bigText}>{title}</AppText>
              <AppText style={styles.smallText}>
                {hours < timeForConsumption
                  ? "Reste " + Math.floor(hours) + " h"
                  : "Expired"}
              </AppText>
              <View style={styles.statusbarContainer}>
                <View
                  style={[
                    styles.statusbar,
                    {
                      width:
                        hours < timeForConsumption
                          ? 100 - mealRemainingTime + "%"
                          : 100,
                      backgroundColor:
                        hours < timeForConsumption
                          ? 100 - mealRemainingTime < 33
                            ? "green"
                            : 100 - mealRemainingTime < 50
                            ? "orange"
                            : "red"
                          : "gray",
                    },
                  ]}
                ></View>
              </View>
            </View>
            <View style={styles.cMealDetailsTwo}>
              <AppText style={styles.bigText}>{rest}</AppText>
              <AppText style={styles.bigText}>{profit}</AppText>
            </View>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default CMealItem;

const styles = StyleSheet.create({
  bigText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  smallText: { color: colors.gray },
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
    flexDirection: "row",
    marginHorizontal: 5,

    marginRight: 35,
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusbar: {
    width: "50%",
    backgroundColor: "green",
    height: "100%",
    borderRadius: 10,
  },
  statusbarContainer: {
    width: 100,
    borderWidth: 1,
    borderRadius: 10,
    color: "green",
    height: 10,
    justifyContent: "center",
  },
  cMealDetailsTwo: {
    alignItems: "center",
  },
});
