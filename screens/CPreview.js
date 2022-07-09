import React, { useState, useContext, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/AppText";
import colors from "../config/colors";
import AuthContext from "../auth/context";
import api from "../api/Customer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "../components/AppButton";
import * as Location from "expo-location";
import { format, addHours } from "date-fns";

const CPreview = ({
  params,
  navigation,
  onPreview,
  OnNewPress,
  onHomePress,
}) => {
  const authContext = useContext(AuthContext);
  const [visible, setvisible] = useState(false);
  const [user, setuser] = useState();
  const [location, setlocation] = useState();
  const [error, seterror] = useState();
  const [success, setsuccess] = useState(false);
  const onFinishPress = async () => {
    setvisible(true);
    const result = await api.addMEal(
      {
        ...params,
        geolocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          distance: null,
        },
        useByDate: format(
          addHours(new Date(), params.meal.timeForConsumption),
          "yyyy-MM-dd'T'HH:mm"
        ),
      },
      params.image
    );
    console.log({
      ...params,
      geolocation: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        distance: null,
      },
      useByDate: format(
        addHours(new Date(), params.meal.timeForConsumption),
        "yyyy-MM-dd'T'HH:mm"
      ),
    });

    if (!result.ok) {
      console.log("error Adding Meal");
      setvisible(false);
      return;
    }
    setsuccess(true);
    setvisible(false);
  };
  const getUserInfo = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      seterror("Permission to access location was denied");
      return;
    }
    setvisible(true);
    let result = await api.getUser(authContext.user.user_name);
    if (!result.ok) {
      console.log("erreur fetching user info");
      setvisible(false);
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setlocation(location);

    setuser(result.data);
    setvisible(false);
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <>
      <ActivityIndicator visible={visible} />

      <View style={styles.previwHeader}>
        <ImageBackground
          source={{ uri: params.image }}
          resizeMode="cover"
          style={styles.image}
        >
          <TouchableOpacity
            style={{
              backgroundColor: colors.gray,
              width: 35,
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.7,
              borderRadius: 10,
            }}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              color={colors.primary}
              size={30}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      {user ? (
        <View style={styles.headerPlat}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: "data:image/png;base64," + user.profileImg }}
              style={[styles.userImage]}
              resizeMode="cover"
            />
          </View>
          <View style={styles.userInfoandTime}>
            <View>
              <AppText style={styles.fontBold}>
                {authContext.user.user_name}
              </AppText>
              <View style={styles.userInfo}>
                <MaterialCommunityIcons
                  name="star"
                  size={20}
                  color={colors.orange}
                />
                <AppText style={styles.fontgray}>
                  {"(" + user.totalRating.avgScore + ")"}
                </AppText>
              </View>
            </View>
            <View>
              <MaterialCommunityIcons
                name="heart-outline"
                size={40}
                color={colors.primary}
              />
            </View>
          </View>
        </View>
      ) : null}
      <View style={styles.infoMealContainer}>
        <AppText style={styles.mealTitle}>{params.meal.title}</AppText>
        <AppText style={styles.mealDesc}>{params.meal.description}</AppText>
        <View style={styles.priceQuantity}>
          <View>
            <AppText style={{ fontWeight: "bold" }}>Price</AppText>
            <AppText
              style={{
                fontWeight: "bold",
                color: colors.primary,
                fontSize: 30,
              }}
            >
              {params.price + " $ "}
            </AppText>
          </View>
          <View>
            <AppText style={{ fontWeight: "bold" }}>Quantity</AppText>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <AppText
                style={{
                  fontWeight: "bold",
                  color: colors.primary,
                  fontSize: 30,
                }}
              >
                {params.quantity}
              </AppText>
              <AppText style={styles.fontgray}>
                {"(" + params.unity + ")"}
              </AppText>
            </View>
          </View>
        </View>
      </View>
      {success && (
        <AppText
          style={{ color: "green", fontWeight: "bold", paddingHorizontal: 20 }}
        >
          Meal Added Succefuly !
        </AppText>
      )}
      <View style={styles.BtnContainer}>
        {!success && (
          <AppButton
            disabled={error}
            title={"Previous"}
            onPress={onPreview}
            width="40%"
          />
        )}
        {!success && (
          <AppButton
            disabled={false}
            title={"Finish"}
            onPress={onFinishPress}
            width="40%"
          />
        )}
        {success && (
          <AppButton
            disabled={false}
            title={"New Meal"}
            onPress={OnNewPress}
            width="40%"
          />
        )}
        {success && (
          <AppButton
            disabled={false}
            title={"Go Home"}
            onPress={onHomePress}
            width="40%"
          />
        )}
      </View>
    </>
  );
};

export default CPreview;

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: "row",
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
  userInfoandTime: {
    flex: 1,
    marginLeft: 5,

    flexDirection: "row",
    justifyContent: "space-between",
  },
  userImage: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    height: 70,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    overflow: "hidden",
  },
  headerPlat: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  priceQuantity: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  mealDesc: {
    fontSize: 16,
  },
  mealTitle: {
    fontSize: 30,
    color: colors.primary,
    fontWeight: "bold",
  },
  infoMealContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
  image: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  previwHeader: {
    height: 300,
    width: "100%",

    overflow: "hidden",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  BtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
  },
});
