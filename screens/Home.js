import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
} from "react-native";

import MultiSlider from "@ptomasroos/react-native-multi-slider";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/AppText";
import PlatsItem from "../components/PlatsItem";
import Screen from "../components/Screen";
import colors from "../config/colors";
import customerApi from "../api/Customer";
import CustomLabel from "../components/CustomLabel";
import MyCheckbox from "../components/MyCheckBox";
import { ScrollView } from "react-native-gesture-handler";
import AppButton from "../components/AppButton";
const Home = () => {
  const [visible, setvisible] = useState(false);
  const [data, setdata] = useState(null);
  const [error, seterror] = useState();
  const [multiSliderValueDistance, setMultiSliderValueDistance] = useState([
    10,
    50,
  ]);

  const [multiSliderValue, setMultiSliderValue] = useState([10, 25]);
  const [sliderOnevalue, setsliderOnevalue] = useState([1]);
  const [visibleFilter, setvisibleFilter] = useState(false);
  const [visibleHEader, setvisibleHEader] = useState(true);
  const getInstantMeal = async () => {
    setvisible(true);
    const result = await customerApi.getInstantMeal();
    const categoriesResult = await customerApi.getCategories();

    if (!result.ok) {
      seterror("Error Fetching Data");
      setvisible(false);
      return;
    }
    if (!categoriesResult.ok) {
      seterror("Error Fetching Data");
      setvisible(false);
      return;
    }
    setdata({ meals: result.data.content, categories: categoriesResult.data });
    setvisible(false);
    console.log(categoriesResult);
  };
  useEffect(() => {
    getInstantMeal();
  }, []);
  const multiSliderValuesChange = (values) => setMultiSliderValue(values);
  const multiSliderValuesChangeDist = (values) =>
    setMultiSliderValueDistance(values);

  const sliderOneValuesChange = (values) => {
    setsliderOnevalue(values);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleFilter}
        onRequestClose={() => {
          setvisibleFilter(!visibleFilter);
        }}
      >
        <Screen style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setvisibleFilter(!visibleFilter)}
            style={{ alignItems: "flex-end" }}
          >
            <MaterialCommunityIcons
              name="chevron-down"
              size={50}
              color={colors.primary}
            />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <AppText style={styles.filterTitle}>Price</AppText>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <MultiSlider
                values={[multiSliderValue[0], multiSliderValue[1]]}
                sliderLength={250}
                onValuesChange={multiSliderValuesChange}
                min={1}
                max={50}
                step={1}
                allowOverlap
                showStep
                snapped
                enableLabel
                customLabel={CustomLabel}
                selectedStyle={{
                  backgroundColor: colors.primary,
                }}
              />
            </View>
            <AppText style={styles.filterTitle}>Distance</AppText>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <MultiSlider
                values={[
                  multiSliderValueDistance[0],
                  multiSliderValueDistance[1],
                ]}
                sliderLength={250}
                onValuesChange={multiSliderValuesChangeDist}
                min={1}
                max={100}
                step={1}
                allowOverlap
                showStep
                snapped
                enableLabel
                customLabel={CustomLabel}
                selectedStyle={{
                  backgroundColor: colors.primary,
                }}
              />
            </View>
            <AppText style={styles.filterTitle}>Quantity</AppText>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <MultiSlider
                enableLabel
                min={1}
                max={100}
                step={1}
                values={sliderOnevalue}
                sliderLength={250}
                onValuesChange={sliderOneValuesChange}
                customLabel={CustomLabel}
                selectedStyle={{
                  backgroundColor: colors.primary,
                }}
              />
            </View>
            <AppText style={styles.filterTitle}>Categories</AppText>
            <ScrollView
              contentContainerStyle={{
                flexDirection: "row",
                justifyContent: "space-around",
                flexWrap: "wrap",
                marginTop: 5,

                width: "100%",
              }}
            >
              {data &&
                data.categories.map((a) => (
                  <MyCheckbox
                    key={a.name}
                    name={a.name}
                    onChange={(value) => console.log(value)}
                  />
                ))}
            </ScrollView>
            <View style={styles.ButtonModalsContainer}>
              {/* <AppButton title="Reset" width="40%" /> */}
              <AppButton
                title="Filter"
                width="40%"
                onPress={() => setvisibleFilter(false)}
              />
            </View>
          </View>
        </Screen>
      </Modal>
      <Screen>
        <ActivityIndicator visible={visible} />
        <View
          style={visibleHEader ? styles.homeHeader : styles.homeHeaderCollpsed}
        >
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
              <TouchableOpacity onPress={() => console.log("Heart Pressed")}>
                <MaterialCommunityIcons
                  name="cards-heart"
                  size={30}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log("cart Pressed")}>
                <MaterialCommunityIcons
                  name="cart"
                  size={30}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
          {visibleHEader && (
            <View style={styles.textHeader}>
              <AppText style={styles.textHeaderTitle}>Hello Jhon,</AppText>
              <AppText style={styles.textHeaderSubTitle}>
                Find Food Around You!
              </AppText>
            </View>
          )}
          <View style={styles.searchBarContainer}>
            <View style={styles.searchBar}>
              <TouchableOpacity onPress={() => console.log("search Pressed")}>
                <Ionicons
                  name="ios-search-sharp"
                  size={30}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <TextInput style={styles.inputSearch} placeholder="Search" />
              <TouchableOpacity onPress={() => setvisibleFilter(true)}>
                <FontAwesome name="filter" size={30} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {data && (
          <FlatList
            onScrollBeginDrag={() => {
              if (data.meals.lenght > 4) {
                setvisibleHEader(false);
              }
            }}
            numColumns={2}
            columnWrapperStyle={{
              flex: 1,
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
            data={data.meals}
            keyExtractor={(item, index) => item.reference}
            renderItem={({ item }) => (
              <PlatsItem
                user={item ? item.meal.cooker.username : "saad"}
                userRating={
                  item ? item.meal.cooker.totalRating.avgScore : "5.0"
                }
                time="2 min ago"
                title={item ? item.meal.title : "Pizza"}
                distance={item ? item.geolocation.distance : "1.2 km"}
                price={item ? item.price : "5"}
                width="45%"
                heightImage={"45%"}
                imageMeal={item.meal.photos[0].image.data}
                imageUser={item.meal.cooker.profileImg}
                useByDate={item.useByDate}
                timeForConsumption={item.meal.timeForConsumption}
              />
            )}
          />
        )}
      </Screen>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  ButtonModalsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalContainer: {
    backgroundColor: "white",
    flex: 2,
    paddingHorizontal: 20,
    borderColor: colors.primary,
  },
  filterTitle: {
    color: colors.primary,
    fontSize: 19,
    fontWeight: "bold",
  },
  categorieContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",

    flexWrap: "wrap",
    marginTop: 5,
  },
  filterContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: colors.primary,
    zIndex: 9000,
    borderBottomEndRadius: 60,
    borderBottomStartRadius: 60,
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  conatainer: {
    flex: 1,
  },
  Scrollconatainer: {
    alignItems: "center",
  },
  homeHeader: {
    height: 150,
    overflow: "hidden",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  homeHeaderCollpsed: {
    paddingBottom: 10,

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
    justifyContent: "space-between",
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
  searchBarContainer: {
    marginTop: 7,
    paddingHorizontal: 20,
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 0,
    borderWidth: 1,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F1EEE9",
    borderColor: colors.primary,
  },
  inputSearch: {
    flex: 1,
    fontSize: 19,
    marginLeft: 10,
    color: colors.primary,
  },
});
