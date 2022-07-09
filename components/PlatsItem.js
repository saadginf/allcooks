import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Dimensions, View } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
const windowWidth = Dimensions.get("window").width;
const PlatsItem = ({
  user,
  userRating,
  time,
  title,
  distance,
  width = windowWidth - 50,
  heightImage = (windowWidth - 50) / 2,
  imageUser,
  imageMeal,
  useByDate,
  timeForConsumption,
}) => {
  let d1 = new Date(useByDate);
  let d2 = new Date();
  let hours = Math.abs(d1 - d2) / 36e5;
  let mealRemainingTime = Math.floor((hours / timeForConsumption) * 100);

  const img1 = "data:image/png;base64," + imageUser;
  const img2 = "data:image/png;base64," + imageMeal;

  return (
    <View style={[styles.container, { width: width }]}>
      <View style={styles.headerPlat}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: img1 }} style={[styles.userImage]} />
        </View>
        <View style={styles.userInfoandTime}>
          <View style={styles.userInfo}>
            <AppText style={styles.fontBold}>{user}</AppText>
            <MaterialCommunityIcons
              name="star"
              size={20}
              color={colors.orange}
            />
            <AppText style={styles.fontgray}>{"(" + userRating + ")"}</AppText>
          </View>
          <AppText style={styles.fontgray}>{time}</AppText>
        </View>
      </View>

      <Image
        source={{ uri: img2 }}
        style={[styles.imagePlat, { height: heightImage }]}
      />
      <View style={styles.titleandPrice}>
        <View>
          <AppText style={styles.fontBold}>{title}</AppText>
          <AppText style={styles.fontgray}>{distance + " km"}</AppText>
          <AppText>
            {hours < timeForConsumption
              ? "Reste " + Math.floor(timeForConsumption - hours) + " h"
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
                      ? mealRemainingTime < 33
                        ? "green"
                        : mealRemainingTime < 50
                        ? "orange"
                        : "red"
                      : "gray",
                },
              ]}
            ></View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlatsItem;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.gray,
    marginTop: 10,

    height: 260,
  },
  userImage: {
    height: 35,
    width: 35,
  },
  imageContainer: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  headerPlat: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",

    alignItems: "center",
  },
  userInfoandTime: {
    flex: 1,
    marginLeft: 5,
  },
  fontBold: {
    fontSize: 16,
    fontWeight: "bold",
  },
  fontextraBold: {
    fontSize: 20,
    fontWeight: "bold",
  },
  fontgray: {
    color: colors.gray,
    fontSize: 13,
    fontWeight: "800",
  },
  imagePlat: {
    width: "100%",

    marginTop: 5,
    borderRadius: 20,
  },
  titleandPrice: {
    marginTop: 3,
    marginLeft: 10,
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
});
