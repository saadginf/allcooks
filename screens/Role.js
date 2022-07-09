//React - React-Native
import React, { useContext, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
//Config
import colors from "../config/colors";
import LocaleContext from "../locales/context";
//Components
import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/AppText";
const Role = ({ navigation }) => {
  //Translation function
  const { t } = useContext(LocaleContext);
  const [visible, setvisible] = useState(false);
  return (
    <>
      <ActivityIndicator visible={visible} />
      <View style={styles.container}>
        <ImageBackground
          style={styles.ImageWrapper}
          source={require("../assets/CookPic.png")}
        >
          <View style={styles.ImageLogo}>
            <Image source={require("../assets/LogoPic.png")} />
          </View>
        </ImageBackground>
        <View style={styles.BtnWrapper}>
          <TouchableOpacity
            onPress={() => navigation.navigate("welcome", { role: "COOKER" })}
            style={styles.LoginBtn}
          >
            <AppText style={styles.PrimText}>{t("cooker")}</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("welcome", { role: "CUSTOMER" })}
            style={styles.RegisterBtn}
          >
            <AppText style={styles.whiteText}>{t("customer")}</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Role;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  ImageWrapper: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },

  BtnWrapper: {
    height: "12%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingHorizontal: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  LoginBtn: {
    height: "50%",
    width: "45%",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#5E0D13",
  },
  RegisterBtn: {
    height: "50%",
    width: "45%",
    borderRadius: 10,
    backgroundColor: colors.danger,
    justifyContent: "center",
    alignItems: "center",
  },
  ImageLogo: {
    width: "100%",
    height: "60%",
    alignItems: "center",
  },
  whiteText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },
  PrimText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
});
