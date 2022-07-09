import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, FlatList } from "react-native";
import AuthContext from "../auth/context";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import CmealItem from "../components/CMealItem";
import colors from "../config/colors";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import api from "../api/Customer";
import ActivityIndicator from "../components/ActivityIndicator";

const CHome = ({ navigation }) => {
  const [meals, setmeals] = useState();
  const [visible, setvisible] = useState(false);
  const [spinner, setspinner] = useState(false); // const authContext = useContext(AuthContext);
  const getMeals = async () => {
    setvisible(true);
    const result = await api.getMealsBycooker();
    console.log(result);
    if (!result.ok) {
      console.log("ERROR FETCHING DATA");
      setvisible(false);
      return;
    }
    setmeals(result.data.content);
    console.log(result);
    setvisible(false);
  };
  const deleteItem = async (ref) => {
    setvisible(true);
    const result = await api.deleteMealByRef(ref);
    if (!result.ok) {
      console.log("Enable To Delete");
      setvisible(false);
      return;
    }
    getMeals();
  };
  useEffect(() => {
    getMeals();
  }, []);

  return (
    <Screen>
      <ActivityIndicator visible={visible} />
      <View style={styles.homeHeader}>
        <View style={styles.locationandcraft}>
          <TouchableOpacity
            style={styles.location}
            onPress={() => console.log("Location Pressed")}
          >
            <View style={styles.iconLoc}>
              <MaterialCommunityIcons
                name="google-maps"
                size={30}
                color={colors.primary}
              />
              <AppText style={styles.location}>Paris, France</AppText>
              <MaterialCommunityIcons
                name="chevron-down"
                size={25}
                color={colors.primary}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.craft}>
            <TouchableOpacity onPress={() => navigation.navigate("CORDERS")}>
              <MaterialCommunityIcons
                name="bell-ring"
                size={30}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.textHeader}>
          <AppText style={styles.textHeaderTitle}>Hello Jhon,</AppText>
          <AppText style={styles.textHeaderSubTitle}>
            Food is a passion. Food is love!
          </AppText>
        </View>
      </View>
      <View style={styles.cHomeContainer}>
        <FlatList
          onRefresh={getMeals}
          refreshing={spinner}
          style={{ flex: 1 }}
          data={meals}
          keyExtractor={(item) => item.reference}
          renderItem={({ item }) => (
            <CmealItem
              renderRightActions={() => (
                <ListItemDeleteAction
                  onPress={() => deleteItem(item.reference)}
                  onEdit={() =>
                    navigation.navigate("add", {
                      screen: "Edit",
                      params: { meal: item },
                    })
                  }
                />
              )}
              title={item.meal.title}
              rest={item.orders.length + "/" + item.quantity}
              progress={item.progress}
              lesfTime={item.lesfTime}
              profit={item.orders.length * item.price + " $"}
              img={item.meal.photos[0].image.data}
              ItemSeparatorComponent={ListItemSeparator}
              useByDate={item.useByDate}
              timeForConsumption={item.meal.timeForConsumption}
            />
          )}
        />
      </View>
    </Screen>
  );
};

export default CHome;

const styles = StyleSheet.create({
  homeHeader: {
    height: 110,
    overflow: "hidden",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  locationandcraft: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  craft: {
    flexDirection: "row",
    justifyContent: "center",
    width: 70,
  },
  iconLoc: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 18,
  },
  textHeader: {
    display: "flex",
    paddingHorizontal: 20,
  },
  textHeaderTitle: {
    fontWeight: "bold",
    fontSize: 33,
    color: colors.primary,
  },
  textHeaderSubTitle: {
    color: colors.orange,
    fontWeight: "bold",
    fontSize: 15,
    marginTop: -5,
  },
  cHomeContainer: {
    flex: 1,
  },
});
