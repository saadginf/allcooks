//React / React-native
import React, { useContext } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
//Config
import LocaleContext from "../locales/context";
import colors from "../config/colors";
//components
import AppText from "../components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Principale = ({ navigation, route }) => {
  //Translation Function
  const { t } = useContext(LocaleContext);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.ImageWrapper}
        source={require("../assets/CookPic.png")}
      >
        <View style={styles.ImageLogo}>
          <Image source={require("../assets/LogoPic.png")} />
        </View>
      </ImageBackground>
      <TouchableOpacity
        style={styles.arrowleft}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons
          color={colors.primary}
          name="arrow-left"
          size={50}
        />
      </TouchableOpacity>
      <View style={styles.BtnWrapper}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("login", { role: route.params.role })
          }
          style={styles.LoginBtn}
        >
          <AppText style={styles.PrimText}>{t("login")}</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("registration", { role: route.params.role })
          }
          style={styles.RegisterBtn}
        >
          <AppText style={styles.whiteText}>{t("register")}</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Principale;

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
  arrowleft: {
    borderWidth: 6,
    backgroundColor: colors.danger,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 90,
    borderColor: colors.primary,
    left: 10,
    width: 80,
    height: 80,
    borderRadius: 40,
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
